<template>
  <div class="center-view">
    <div class="fix-top">
      <!-- 顶部 -->
      <van-nav-bar
        class="head"
        title="登录"
        left-text=""
        right-text="注册"
        left-arrow
        @click-left="btnBack"
        @click-right="onRegister"
      />
    </div>
    <!-- login 区域 -->
    <div class="loginBox">
      <van-form @submit="onSubmit" validate-first @failed="onFailed">
        <van-field
          v-model="mobile"
          name="mobile"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ pattern, message: '请输入正确的手机号' }]"
        />
        <van-field
          v-model="password"
          type="validator"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ validator, message: '请输入正确的密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
    <!-- wap-app 区域 -->
    <div class="wap-app">
      <h3 class="third-txt">第三方账号快速登录</h3>
      <div class="third-app clear">
        <a href="" class="qq" target="_parent">
          <img
            src="https://jp.juancdn.com/jpwebapp_v1/images_v1/user/tencent.png?29cf7667-1&sv=1d2c4e4e"
            alt=""
          />
        </a>
        <a href="" class="taobao" target="_parent">
          <img
            src="https://jp.juancdn.com/jpwebapp_v1/images_v1/user/taobao.png?b6b2268f-1&sv=1d2c4e4e"
            alt=""
          />
        </a>
        <a href="" class="weibo" target="_parent">
          <img
            src="https://jp.juancdn.com/jpwebapp_v1/images_v1/user/sina.png?e6100489-1&sv=1d2c4e4e"
            alt=""
          />
        </a>
      </div>
      <ul class="protection">
        <li class="fl">
          <img
            src="https://jp.juancdn.com/jpwebapp_v1/images_v1/user/unexpress.png?6a15f6a5-1&sv=1d2c4e4e"
            alt=""
          />
          全场包邮
        </li>
        <li>
          <img
            src="https://jp.juancdn.com/jpwebapp_v1/images_v1/user/search.png?597c2e82-1&sv=1d2c4e4e"
            alt=""
          />
          100%人工质检
        </li>
        <li>
          <img
            src="https://jp.juancdn.com/jpwebapp_v1/images_v1/user/seven.png?902d32d9-1&sv=1d2c4e4e"
            alt=""
          />
          7天放心退
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 导入
import Vue from "vue";
import { NavBar, Toast, Form, Field, Button } from "vant";

Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
import {mapMutations} from "vuex"
export default {
  data() {
    return {
      mobile: "",
      password: "",
      pattern: /^1[3-9]\d{9}$/,
    };
  },
  methods: {
    // 失败
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /\d{6}/.test(val);
    },
    ...mapMutations("global",["setFooter"]),
    // 返回上一页面
    btnBack() {
      this.$router.go(-1);
    },
    // 注册
    onRegister() {
      this.$router.push("register");
    },
    // 提交
    onSubmit(values) {
      // 发送请求
      this.$http
        .post("http://192.168.43.39:2000/backend/login", values)
        .then((ret) => {
          if (ret.error_code == 0) {
              Toast.success("登录成功！");
              // 跳转
              // 判断是否有回调地址
              if (this.$route.query.callback) {
                  this.$router.push(this.$route.query.callback);
              } else {
                  this.$router.push("/mshop/center");
              }
          } else {
              Toast.fail("用户名或者密码错误！");
          }
        });
    },
  },
  mounted() {
  this.setFooter(false)
},
beforeDestroy() {
  this.setFooter(true)
},
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.van-form {
  margin-bottom: 52px;
}
.fix-top,
.head {
  border-bottom: 1px solid #dedede;
  width: 100%;
  background: linear-gradient(150deg, #ff5a61 50%, #fd631c);
  height: 55px;
  font-size: 18px;
  line-height: 88px;
}
/deep/.van-nav-bar__content {
  line-height: 55px;
  height: 55px;
  // color: #fff;
}
/deep/.van-nav-bar__content .van-nav-bar__title {
  color: #fff;
  font-size: 18px;
  line-height: 55px;
  height: 55px;
}

/deep/.van-nav-bar__text,
/deep/.van-nav-bar .van-icon {
  color: #fff;
  font-size: 14px;
}
.van-cell {
  font-size: 14px;
  // line-height: 48px;
  padding: 10px 20px;
  margin-top: 10px;
}
.van-cell__title,
.van-cell__value,
.van-field__label {
  width: 80px;
  // height: 80px;
}
.van-button {
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  background: #dbdbdb;
  border: 0;
  margin-top: 22px;
  border-radius: 0;
}
.wap-app .third-app {
  padding-bottom: 23px;
  border-bottom: 1px solid #ebebeb;
  text-align: center;
}
.wap-app .third-txt {
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 30px;
  text-align: center;
  color: #999;
}
.wap-app .third-app {
  padding-bottom: 23px;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  justify-content: center;
  // text-align: center;
}
.wap-app .third-app a {
  width: 48px;
  height: 48px;
  margin-left: 20px;
  margin-right: 20px;
}
.wap-app .third-app a img {
  width: 100%;
  height: 100%;
}
.wap-app .protection {
  padding-top: 23px;
  height: 22px;
  line-height: 22px;
  color: #c2c2c2;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wap-app .protection li {
  display: flex;
  justify-content: center;
  // width: 33%;
  flex: 1;
  text-align: center;
  line-height: 22px;
  height: 22px;
}
.wap-app .protection img {
  height: 22px;
  width: auto;
  margin-right: 5px;
}
</style>
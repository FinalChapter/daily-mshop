<template>
  <div>
    <div class="center-view">
      <!-- 顶部区域 -->
      <div class="userTop">
        <van-nav-bar
          title="个人中心"
          left-text=""
          left-arrow
          @click-left="goback"
        />
      </div>
      <!-- 进入登录注册区域 -->
      <div class="user-login" v-if="!userInfo.userId">
        <a @click="toRegister">注册</a>
        <i class="line"></i>
        <a @click="toLogin">登录</a>
      </div>
      <!-- 已登录 -->
      <div class="user-box-person" v-if="userInfo.userId">
        <div class="user">
          <div class="head_img">
            <a href="">
              <img
                :src="userInfo.headIcon"
              />
            </a>
          </div>
          <div class="message">
            <p class="tel">
              <a href="//m.juanpi.com/userinfo">{{userInfo.mobile}}</a>
            </p>
            <div class="message_detal">
              <!-- <p class="datum">我的资料、收货地址</p> -->
              <span>
                <a href="//m.juanpi.com/userinfo">我的账户</a>
                <i class="arrow">></i>
                <i class="circle"></i>
              </span>
              <span style="display: none">
                <a id="level" href="https://m.juanpi.com/userlevel/index"
                  >V0会员</a
                >
                <i class="arrow"></i>
                <i class="circle"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单区域 -->
    <div class="user-order">
      <!-- 新增我的订单入口 -->
      <a href="//m.juanpi.com/order" class="user-item-horizontal">
        <span>我的订单</span>
        <span class="iconfont icon-liebiaojiantou fr"></span>
        <span class="label fr">全部订单</span>
      </a>
      <div>
        <van-grid v-model="active">
          <van-grid-item
            icon-prefix="iconfont icon-daifukuan"
            icon="daifukuan"
            text="代付款"
          />
          <van-grid-item
            icon="icon-daichengtuan"
            icon-prefix="iconfont icon-daichengtuan"
            text="待成团"
          >
          </van-grid-item>
          <van-grid-item
            icon="icon-daishouhuo"
            icon-prefix="iconfont icon-daishouhuo"
            text="待收货"
          />
          <van-grid-item
            icon="icon-tuikuan"
            icon-prefix="iconfont icon-tuikuan"
            text="退款/售后"
          />
        </van-grid>
      </div>
    </div>
    <!-- user-item区域 -->
    <div class="userItems">
      <a href="//m.juanpi.com/coupon" class="user-item-horizontal">
        <span>我的优惠券</span>
        <span class="iconfont icon-liebiaojiantou fr"></span>
      </a>

      <a href="//m.juanpi.com/myfavorite" class="user-item-horizontal">
        <span> 我的收藏 </span>
        <span class="iconfont icon-liebiaojiantou fr">
          <i class="sc_circle"></i>
        </span>
      </a>
      <a href="https://tuan.juanpi.com/pintuan/my" class="user-item-horizontal">
        <span>我的拼团</span>
        <span class="iconfont icon-liebiaojiantou fr"></span>
      </a>
      <!--<a href="https://m.juanpi.com/pay/card_confirm?pf=2" class="user-item-horizontal" onclick="_paq.push(['trackEvent','center','click_center_item', 'item','vip'])">
						<span>至尊会员卡</span>
						<span class="iconfont icon-liebiaojiantou fr"></span>
						<span class="label fr">办理即享9折</span>
					</a>-->
      <a
        href="https://mact.juanpi.com/couponlist_leaderfree"
        class="user-item-horizontal"
      >
        <span>我的免单券</span>
        <span class="iconfont icon-liebiaojiantou fr"></span>
        <span class="label fr">0张</span>
      </a>
      <a
        href="https://m.juanpi.com/jieqian?imageProtocol=0"
        class="user-item-horizontal"
      >
        <span>借钱</span>
        <span class="iconfont icon-liebiaojiantou fr"></span>
        <span class="label fr">新用户免费领1000元</span>
      </a>
    </div>
    <div class="userItems">
      <a href="//m.juanpi.com/service/index" class="user-item-horizontal">
        <span>客服中心</span>
        <span class="iconfont icon-liebiaojiantou fr"></span>
      </a>
      <a
        href="//m.juanpi.com/about/juanpi"
        class="user-item-horizontal no-bottom"
      >
        <span>关于卷皮</span>
        <span class="iconfont icon-liebiaojiantou fr"></span>
      </a>
    </div>
    <!-- foot区域 -->
    <div id="foot">
      <a href="//m.juanpi.com">返回首页</a>
      <a href="javascript:void(0);" class="joa_load_app">客户端</a>
      <a href="//www.juanpi.com/" id="pcJuanpi">电脑版</a>
    </div>
    <!-- 公共脚部 -->
    <!-- <div class="footer"></div> -->
  </div>
</template>

<script>
// 导入需要使用的字体样式文件（语法形式区别开JavaScript、vue文件模块）
// import 'vant/lib/icon/local.css';
import "@/assets/font/iconfont.css";
// 导入
import Vue from "vue";
import { NavBar, Toast, Grid, GridItem, Icon } from "vant";

Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Icon);

export default {
  data() {
    return {
      active: 0,
      userInfo: {},
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    toRegister() {
      this.$router.push("register");
    },
    toLogin() {
      this.$router.push("login");
    },
  },
  created() {
    // 获取用户信息
    // 判断是否存在jwt
    let jwt = this.$store.state.global._token;
    if (jwt) {
      // 发请求
      this.$http
        .get("http://192.168.43.39:2000/backend/get_user_info")
        .then((ret) => (this.userInfo = ret.data));
    }
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
body {
  background-color: #f4f4f8;
  color: #666;
  height: 100%;
}
.center-view {
  height: 144px;
  // background: #ff464e;
  background-image: url(https://jp.juancdn.com/jpwebapp_v1/images_v1/user/user_center_bg.png);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 100% auto;
  border-bottom: none;
  color: #fff;
}
.van-nav-bar {
  background: none;
  color: #fff;
}
/deep/.van-nav-bar__title,
/deep/.van-nav-bar .van-icon {
  color: #fff;
}
.user-login {
  position: relative;
  font-size: 0;
  height: 100px;
  line-height: 100px;
  text-align: center;
  // display: none;
}
.user-login a {
  display: inline-block;
  font-size: 20px;
  padding-left: 48px;
  padding-right: 48px;
  color: #fff;
}
.user-login .line {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 20px;
  width: 2px;
  background-color: #fff;
  transform: translate(-50%, -50%);
}
.user-box-person {
  position: relative;
  height: 100px;
  color: #fff;
  overflow: hidden;
  z-index: 9999;
  padding-left: 20px;
  display: flex;
  align-items: center;
}
.user {
  width: 100%;
  margin-top: 0.98133rem;
  margin-bottom: 1.06667rem;
  overflow: hidden;
  display: block;
  color: #fff;
}
.head_img {
  width: 2.304rem;
  height: 2.304rem;
  border-radius: 50%;
  float: left;
  margin:0 0.768rem;
  border: 2px solid #fff;
  overflow: hidden;
}
.head_img img{
  width: 100%;
  height: 100%;
}
.message {
  width: auto;
  float: left;
  margin-left: 0.512rem;
}
.message .tel {
  font-family: PingFangSC-Regular;
  font-size: 0.68267rem;
  color: #fff;
  height: 0.93867rem;
  line-height: 0.93867rem;
}
.message a {
  color: #fff;
}
.message .message_detal {
  width: 100%;
  height: 0.85333rem;
  margin-top: 0.46933rem;
  padding-right: 0.10667rem;
}
.message .message_detal span {
    position: relative;
    display: block;
    float: left;
    margin: 0;
    font-size: .46933rem;
    height: 20px;
    line-height: 20px;
    background: #f3414a;
    border: 1px solid #ff8282;
    border-radius: 2.13333rem;
    padding-left: .21333rem;
    padding-right: .59733rem;
    margin-right: .21333rem;
    color: #fff;
}
.message .message_detal span .arrow {
    width: .21333rem;
    height: 100%;
    top: 0;
    right: .21333rem;
    background: url(/jpwebapp_v1/images_v1/user/arrow.png) no-repeat 50%;
}
.message .message_detal span .circle {
    width: .256rem;
    height: .256rem;
    border-radius: 50%;
    background-color: red;
    box-sizing: border-box;
    top: -.064rem;
    right: -.064rem;
    border: 1px solid #fff;
    display: none;
}
.user-item-horizontal {
  // display: block;
  position: relative;
  height: 48px;
  line-height: 48px;
  padding: 0 0.59733rem 0 0.768rem;
  font-size: 15px;
  background-color: #fff;
  color: #333;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
.van-divider {
  margin: 0;
  color: #ebebeb;
}
.user-item-horizontal:after {
  content: "";
  position: absolute;
  left: 0.59733rem;
  right: 0.59733rem;
  bottom: 0;
  height: 2px;
  background-color: #ebebeb;
  transform: scaleY(0.5);
}
.icon-daichengtuan,
.van-icon {
  width: 28px;
  color: rebeccapurple;
  height: 28px;
  display: block;
}
/deep/.van-grid-item__icon {
  // display: block;
  // margin: 0 auto;
  margin-bottom: 6px;
  font-size: 28px;
  color: #999;
}
.userItems {
  border-top: 10px solid #f4f4f8;
}
.user-item-horizontal .iconfont,
.user-item-horizontal .label {
  color: #999;
  margin-right: 8px;
}
#foot {
  // margin-top: 10px;
  width: 100%;
  height: 32px;
  text-align: center;
  padding: 10px 0;
  // padding-bottom: .53333rem;
  line-height: 32px;
  position: relative;
}
#foot a {
  color: #666;
  font-size: 0.46933rem;
  line-height: 32px;
  margin: 0 auto;
  width: 31%;
  border-right: 1px solid #ebebeb;
  text-align: center;
  display: inline-block;
}
.footer {
  height: 50px;
  background-color: red;
}
</style>
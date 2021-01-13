<template>
    <div class="center-view">
        <div class="fix-top">
            <!-- 顶部 -->
            <van-nav-bar
                class="head"
                title="注册"
                left-text=""
                right-text="登录"
                left-arrow
                @text-color: white
                @click-left="btnBack"
                @click-right="onLogin"
            />
        </div>   
        <!-- login 区域 -->
        <div class="loginBox" >
            <van-form @submit="onSubmit" validate-first @failed="onFailed">
                <van-field
                    v-model="username"
                    name="pattern"
                    label="用户名"
                    placeholder="请输入用户名"
                    :rules="[{ pattern, message: '请输入正确的用户名' }]"
                />
                <van-field
                    v-model="password"
                    type="validator"
                    name="密码"
                    label="密码"
                    placeholder="请输入密码"
                    :rules="[{ validator, message: '请输入正确的密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">注册</van-button>
                </div>
            </van-form>
        </div>
    </div>    
</template>

<script>
// 导入
import Vue from 'vue';
import { NavBar, Toast, Form, Field, Button } from 'vant';
import {mapMutations} from "vuex"
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
export default {
    data(){
        return{
            username: '',
            password: '',
            pattern: /^[a-zA_Z]{3,12}$/,
            // pattern: /\d{6}/,
        }
    },
    methods:{
    ...mapMutations("global",["setFooter"]),
        // 失败
        onFailed(errorInfo) {
            console.log('failed', errorInfo);
        },
        // 校验函数返回 true 表示校验通过，false 表示不通过
        validator(val) {
            return /\d{6}/.test(val);
            // return /1\d{10}/.test(val);
        },
        // 返回上一页面
        btnBack() {
            this.$router.go(-1)
        },
        // 注册
        onLogin(){
            this.$router.push('login')
        },
        // 提交
        onSubmit(values) {
            console.log('submit', values);
        },
    },
      mounted() {
  this.setFooter(false)
},
beforeDestroy() {
  this.setFooter(true)
},
}
</script>

<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .van-form{
        margin-bottom: 52px;
    }
    .fix-top , .head{
        border-bottom: 1px solid #dedede;
        width: 100%;
        background: linear-gradient(150deg,#ff5a61 50%,#fd631c);
        height: 55px;
        font-size: 18px;
        line-height: 88px;
    }
    /deep/.van-nav-bar__content{
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
    .van-field__control{
      background-color: none;
    }
    /deep/.van-nav-bar__text, /deep/.van-nav-bar .van-icon{
        color: #fff;
        font-size:14px;
    }
    .van-cell{
        font-size: 14px;
        // line-height: 48px;
        padding: 10px 20px ;
        margin-top: 10px;
    }
    .van-cell__title, .van-cell__value, .van-field__label {
        width:80px;
        // height: 80px;
    }
    .van-button{
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
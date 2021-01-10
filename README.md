# daily-mshop

### 启动服务
```
npm run serve
```
### 使用懒加载
```
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: "懒加载图片https://2url.cc/1OwrB",
});
html部分使用
<div class="img">
    <img v-lazy="请求图片路径"/>
</div>
```
### 使用swiper
官方文档swiper：https://www.swiper.com.cn/usage/index.html
### 使用vant
官方文档vant: https://vant-contrib.gitee.io/vant/#/zh-CN/




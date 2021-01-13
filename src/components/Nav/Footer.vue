<template>
  <van-tabbar :key="active" v-model="active" active-color="#ee0a24" inactive-color="#333" @change="changeUrl">
  <van-tabbar-item ><van-icon slot="icon" class-prefix="iconfont icon-shouye"/><span>首页</span></van-tabbar-item>
  <van-tabbar-item ><van-icon slot="icon" class-prefix="iconfont icon-leimupinleifenleileibie"/><span>分类</span></van-tabbar-item>
  <van-tabbar-item ><van-icon slot="icon" class-prefix="iconfont icon-gouwuche"/><span>购物车</span></van-tabbar-item>
  <van-tabbar-item ><van-icon slot="icon" class-prefix="iconfont icon-wode"/><span>我的</span></van-tabbar-item>
</van-tabbar>
</template>

<script>
import Vue from 'vue';
import "@/assets/font_search/iconfont.css"
import { Tabbar, TabbarItem ,Icon} from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon)
export default {
   data() {
       return {
           active:0,
           urlList:["/mshop/home","/mshop/category","/mshop/cart","/mshop/center",]
       }
   },
   created() {
    let flag=  this.urlList.indexOf(this.$route.path)
    this.active= flag != -1? flag:0
   },
   methods: {
       changeUrl(index){   
        this.$router.push(this.urlList[index])
       }
   },

}
</script>

<style>

</style>
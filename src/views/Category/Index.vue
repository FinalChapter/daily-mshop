<template>
 <div class="app">
    <van-nav-bar
        class="tit"
        title="全部分类"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
    />
    <van-search
        v-model="value"
        shape="square"
        placeholder="搜索商品"
        @click="gotoSearch"
    />
    <div class="list">
        <van-sidebar v-model="activeKey" >
            <van-sidebar-item
                v-for="(item,index) in list"
                :key="item.cid"
                :title="item.text"
                @click="getDataSecondList(index)"
            />
        </van-sidebar>
        <div class="secondList">
            <!-- 缺少进入二级列表商品页 @click="gotoSecondGoodsList" -->
        <div class="secondListGoods" v-for="item2 in list2" :key="item2.cid" @click="gotoSecondGoodsList(item2.cid,item2.text)">
            <van-image
                width="100%"
                height="4rem"
                fit="contain"
                :src="item2.pic"
                :alt="item2.text"
            />
            <div class="textname">{{item2.text}}</div>
        </div>
        </div>
    </div>
 </div>
</template>

<script>
import Vue from 'vue';
// import axios from "axios";
import uri from "@/config/uri"
import { NavBar, Search, Sidebar, SidebarItem, Image as VanImage } from 'vant';

Vue.use(NavBar);
Vue.use(Search);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(VanImage);
export default {
    data() {
        return {
            value: '',
            activeKey:0,
            list:[],
            list2:[],
            // index:0
        };
    },
    methods:{
        onClickLeft(){
            this.$router.push("Home");

        },
        gotoSearch(){
            // console.log(this.$router);
            this.$router.push("Search");
        },
        getDataOneList(){
            this.$http.get(uri.getList).then(res =>{
                // console.log(res.data);
                this.list = res.data
                this.list2=res.data[0].second_cate
            })
        },
        getDataSecondList(i){
            this.list2 = this.list[i].second_cate
            // console.log(this.activeKey);
        },
        gotoSecondGoodsList(index,title){
            // https://mapi.juanpi.com/xcxgoods/goodslist?cid=1278&front_cid=&page=1&uid=&msort=0&platform=iPhone_xcx&source=&tab_item=&brand_id=&hide_cate=&app_version=&scene_key=
            //index时二级分类的cid
            // console.log(title);
            window.localStorage.setItem('cid',index);
            window.localStorage.setItem('title',title);
            this.$router.push('ThreeList');

        }

    },
    created(){
       this.getDataOneList();
    //    console.log(this.activeKey);
    },
}
</script>

<style lang="scss" scoped>

.tit{
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    text-align: center;
}
.van-sidebar-item--select::before{
    width: 3px;
    height: 60px;
}
.list{
    position: relative;
    margin-bottom: 50px;
}
.secondList{
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 0;
    left: 80px;
}
.secondListGoods{
    position: relative;
    width: 30%;
    height: 7rem;
    margin:0 2px;
}
.textname{
    text-align: center;
    font-size: 14px;
}
.van-search__content{
    background-color: #fff;
    border: 1px solid #bbb;
}

/deep/.van-icon{
    color: #999;
    font-size: 20px;
} 
/deep/.van-icon-search{
    font-size: 26px;
    color: #999;
}
.van-sidebar-item{
    padding: 15px 12px;
    border-bottom: 1px solid #ebebeb;
}



</style>

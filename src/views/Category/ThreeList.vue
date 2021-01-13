<template>
  <div>
    <van-nav-bar :title="name" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="search" size="18" @click="gotoSearch" />
      </template>
    </van-nav-bar>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in listinfo"
          :key="item.goods_id"
          @click="goDetail(item.goods_id)"
        >
          <van-image
            width="100%"
            height="60%"
            fit="contain"
            :src="item.pic_url"
          />
          <div class="goodstitle">{{ item.title }}</div>
          <div>
            <span class="cprice">￥{{ item.cprice }}</span>
            <span class="oprice">￥{{ item.oprice }}</span>
          </div>
          <div class="hr"></div>
          <!-- <div class="bottomTexts">
                        <span>{{item.bottomTexts.leftText}}</span>
                        <span>{{item.bottomTexts.rightText}}</span>
                    </div> -->
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import Vue from "vue";
import {
  NavBar,
  Icon,
  Search,
  Image as VanImage,
  List,
  Cell,
  PullRefresh,
} from "vant";
// import axios from 'axios';
import uri from "@/config/uri";
import {mapMutations} from "vuex"
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Icon);
Vue.use(VanImage);
Vue.use(List);
Vue.use(Cell);
Vue.use(PullRefresh);
export default {
  data() {
    return {
      listinfo: [],
      loading: false,
      finished: false,
      refreshing: false,
      name: "",
      cid: "",
      page: 1,
      bottomTexts: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapMutations("global",["setFooter"]),
    onClickLeft() {
      this.$router.go(-1);
    },
    gotoSearch() {
      this.$router.push("Search");
    },
    onRefresh() {
      // console.log(this.page);
      this.loading = true;
      this.page++;
      this.onLoad();
    },
    onLoad() {
      // setTimeout(() => {
      if (this.refreshing) {
        this.listinfo = [];
        this.refreshing = false;
      }

      this.getData();
      this.loading = false;

      if (this.listinfo.length >= 40) {
        this.finished = true;
      }

      // }, 1000);
    },
    goDetail(goodsId) {
      this.$router.push("/mshop/detail/" + goodsId);
    },
    getData() {
      this.name = localStorage.getItem("title");
      // console.log(this.name);
      this.cid = localStorage.getItem("cid");

      this.$http
        .get(
          uri.getSearchList +
            this.cid +
            `&front_cid=&page=` +
            this.page +
            `&uid=&msort=0&platform=iPhone_xcx&source=&tab_item=&brand_id=&hide_cate=&app_version=&scene_key=`
        )
        .then((ret) => {
          console.log(this.page);
          if (ret.code == 1000) {
            if (this.page) {
              //请求成功(注意新旧数据整合)
              this.listinfo = [...this.listinfo, ...ret.data.goods];
              // this.listinfo.forEach(el =>{
              //     this.bottomTexts = el.bottomTexts
              // })
            } else {
              //没有数据
              this.finished = true;
            }
          } else {
            //请求失败
            Toast.fail("网络繁忙");
          }
          //数据加载完成，去除加载组件的
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.setFooter(false);
  },
  beforeDestroy() {
    this.setFooter(true);
  },
};
</script>
<style lang="scss" scoped>
.van-list {
  display: flex;
  flex-wrap: wrap;
}
.van-cell {
  width: 50%;
  height: 50%;
  margin: 10px 0;
  padding: 0 5px;
  box-sizing: border-box;
}
img {
  width: 100%;
  height: 100%;
}
.goodstitle {
  font-size: 16px;
  color: #333;
}
.cprice {
  color: #ff464e;
}
.oprice {
  text-decoration: line-through;
  color: #bbbbbb;
  font-size: 12px;
}
.hr {
  width: 100%;
  height: 1px;
  margin: 10px 0;
  border-bottom: 1px dashed #ccc;
}
.bottomTexts {
  color: #bbbbbb;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
/deep/.van-cell::after {
  border-bottom: none;
}
</style>

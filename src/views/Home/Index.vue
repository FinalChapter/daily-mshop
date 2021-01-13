<template>
  <div class="home">
    <div class="search">
      <div class="search-item" @click="toSearch">
        <span class="search-icon iconfont icon-sousuo"></span> 搜索
      </div>
      <div @click="toCategory" class="search-to iconfont icon-sousuo2"></div>
    </div>
    <div class="swiper_main">
      <van-swipe autoplay="3000" class="my-swipe" indicator-color="white">
        <van-swipe-item
          v-for="(image, index) in images"
          :key="index"
          width="100%"
        >
          <img :src="image.pic" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="hot">
      <van-grid :border="false" :column-num="hot_length" :key="hot.length">
        <van-grid-item v-for="(item, index) in hot" :key="index">
          <van-image :src="item" width="100%" :key="hot.length" />
        </van-grid-item>
      </van-grid>
    </div>
    <div class="abs">
      <div class="abs-item" v-for="(item, index) in abs" :key="index">
        <div v-for="el in item" :key="el.bd_id">
          <img :src="el.pic" width="100%" />
        </div>
      </div>
    </div>
    <div
      class="to-top iconfont icon-huidaodingbu"
      v-show="isgoTop"
      @click="goTop"
    ></div>
    <div class="goods" ref="list">
      <div :class="{ tab: isTabFix }">
        <van-tabs
          @click="onClick"
          title-active-color="#ff464e"
          line-width="4rem"
        >
          <van-tab title="精选专场" class="my-tab"> </van-tab>
          <van-tab title="精选单品" class="my-tab"> </van-tab>
        </van-tabs>
      </div>
      <div class="goods-list" v-if="isListshow" style="height:100%">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="list">
            <div
              class="goods-item"
              v-for="(item, index) in goodsList"
              :key="index"
            >
              <div class="goods-img">
                <img :src="item.pic_url" />
                <div class="goods-icon">
                  <!-- <img
                    :src="parseImg(item.logo_url)"
                    style="background-color:#fff"
                    alt="图片获取失败"
                  /> -->
                  <van-image
                    fit="contain"
                    :src="item.logo_url"
                  >
                  </van-image>
                </div>
              </div>
              <div class="goods-info">
                <div class="goods-price">
                  {{ item.coupon_tips }}
                </div>
                <div class="goods-des">
                  <div class="goods-title">{{ item.title }}</div>
                  <div class="goods-day">{{ item.time_left }}</div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
      <div class="goods-list" v-if="!isListshow" style="height:100%">
        <van-list
          v-model="loading2"
          :finished="finished2"
          finished-text="没有更多了"
          @load="onLoad2"
        >
          <div class="list">
            <div
              class="goods-item"
              v-for="(item, index) in goodsList2"
              :key="index"
              @click="gotoDetail(item.goods_id)"
            >
              <div class="goods-img">
                <img :src="item.pic_url" />
              </div>
              <div class="goods-info">
                <div class="goods-price">
                  ￥{{ item.cprice }}<span>￥{{ item.oprice }}</span>
                </div>
                <div class="goods-des">
                  <div class="goods-title">{{ item.title }}</div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/font_search/iconfont.css";
import Vue from "vue";
import {
  Search,
  Swipe,
  SwipeItem,
  Lazyload,
  Grid,
  GridItem,
  Image,
  Tab,
  Tabs,
  List,
  Toast,
} from "vant";
import uri from "@/config/uri";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload, {
  lazyComponent: true,
});
Vue.use(List);
Vue.use(Toast);
Vue.use(Image);
export default {
  data() {
    return {
      isgoTop: false,
      images: [],
      hot: [],
      abs: [],
      isListshow: true,
      hot_length: 0,
      goodsList: [],
      goodsList2: [],
      pageNum: 1,
      loading: false,
      finished: false,
      pageNum2: 1,
      loading2: false,
      finished2: false,
      list_top: 0,
      isTabFix: false,

    };
  },
  created() {
    this.$http.get(uri.getBanner).then((ret) => {
      this.images = ret.data.slide_ads.config.slide;
      this.hot_length = ret.data.block[0].multi_block[0].data.length;
      ret.data.block[0].multi_block[0].data.forEach((el) => {
        this.hot.push(el.child[0].pic);
      });
      var temp = [];
      var abs_length = ret.data.block[0].multi_block;
      for (let i = 2; i < abs_length.length; i++) {
        abs_length[i].data.forEach((el) => {
          temp.push(el.child[0]);
        });
        this.abs.push(temp);
        temp = [];
      }
    });
  },

  mounted() {
    var flag = true;
    let list_top;
    window.addEventListener("scroll", () => {
      if (flag) {
        flag = !flag;
        try {
          this.list_top = this.$refs.list.getBoundingClientRect().top;
        } catch (error) {}
      }
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop >= 200) {
        this.isgoTop = true;
      } else {
        this.isgoTop = false;
      }
      if (scrollTop >= this.list_top) {
        this.isTabFix = true;
      } else {
        this.isTabFix = false;
      }
    });
  },
  methods: {
    goTop() {
      document.documentElement.scrollTop = 0;
    },
    getdata() {

      this.$http
        .get(
          uri.getGoods +
            `page=${this.pageNum}&zy_ids=p8_c4_l4&app_name=zhe&catname=tab_hpzc&flag=tab_hpzc`
        )
        .then((ret) => {
          if (ret.code == 1000) {
            if (this.pageNum <= Math.ceil(ret.data.new_goods_count / 20)) {
              // ret.data.goods.forEach(el=>{
              //    console.log(el.logo_url)
              //   //  var imgObj = new Image()
              //    //console.log(imgObj)
              // })
              this.goodsList = [...this.goodsList, ...ret.data.goods];
              this.pageNum++;
            } else {
              this.finished = true;
            }
          } else {
            Toast.fail("网络繁忙");
          }
          this.loading = false;
        });
    },
    getdata2() {
      this.$http
        .get(
          uri.getGoods +
            `page=${this.pageNum2}&zy_ids=p8_c4_l4&app_name=zhe&catname=tab_hpdp&flag=tab_hpdp`
        )
        .then((ret) => {
          if (ret.code == 1000) {
            if (this.pageNum2 <= Math.ceil(ret.data.new_goods_count / 20)) {
              this.goodsList2 = [...this.goodsList2, ...ret.data.goods];
              this.pageNum2++;
            } else {
              this.finished2 = true;
            }
          } else {
            Toast.fail("网络繁忙");
          }
          this.loading2 = false;
        });
    },
    onLoad() {
      this.getdata();
    },
    onLoad2() {
      this.getdata2();
    },
    toSearch() {
      this.$router.push("/mshop/search");
    },
    toCategory() {
      this.$router.push("/mshop/category");
    },
    gotoDetail(item) {
      console.log(item);
      this.$router.push("/mshop/detail/" + item);
    },
    //...mapMutations("global",["setFooter"]),
    onClick(index) {
      document.documentElement.scrollTop = this.list_top;
      if (index == 0) {
        this.isListshow = true;
      }
      if (index == 1) {
        this.isListshow = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

/deep/ .van-image__error{
  position: relative;
}
.search {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: rgb(153, 153, 153);
}
.search > div {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  overflow: hidden;
}
.search-item {
  margin: 0 10px;
  width: 85%;
  border-radius: 8px;
  background-color: #f2f2f2;
}
.search-item span {
  height: 100%;
  margin: 0 5px;
  display: inline-block;
}
// .van-tabs__wrap {
//   /deep/ .van-tabs__line{
//     z-index: 0;
//   }
// }
.search .search-to {
  font-size: 24px;
  color: #666;
  width: 30px;
}
.swiper_main {
  width: 100%;
  font-size: 14px;
}
.my-swipe .van-swipe-item {
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 20px;
  text-align: center;
}
.swiper_main img {
  display: inline-block;
  vertical-align: top;
}
.my-swipe {
  /deep/ .van-swipe__indicator {
    width: 8px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.my-swipe {
  /deep/ .van-swipe__indicator--active {
    width: 16px;
    border-radius: 4px;
  }
}
.tab {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
}
.abs {
  width: 100%;
}
.abs-item {
  display: flex;
}
.abs-item > div {
  flex: 1;
  box-sizing: border-box;
}
.abs-item > div > img {
  vertical-align: top;
}
.abs-item:last-child {
  padding: 10px 0px;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.goods-list .goods-item {
  width: 50%;
  font-size: 12px;
  height: 250px;
  padding: 5px;
  box-sizing: border-box;
}

.goods-item .goods-img {
  height: 200px;
  position: relative;
}
.goods-item img {
  width: 100%;
  height: 100%;
  display: block;
}
.goods-item .goods-icon {
  width: 50px;
  height: 30px;
  position: absolute;
  bottom: -15px;
  right: 10px;
}
.goods-price {
  font-size: 14px;
  height: 20px;
  color: #ff464e;
  line-height: 20px;
}
.goods-des {
  height: 16px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  .goods-day {
    color: #bbb;
  }
}
.goods-title {
  width: 60%;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.goods-price span {
  color: #bbb;
  font-size: 12px;
  margin-left: 10px;
  text-decoration: line-through;
}
.goods {
  margin-bottom: 50px;
}
.to-top {
  position: fixed;
  right: 20px;
  bottom: 60px;
  z-index: 999;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
  color: #000;
}
.van-grid-item {
  /deep/ .van-grid-item__content {
    padding: 0 5px;
  }
}
/deep/ .van-tabs__line {
  z-index: 0;
}
</style>

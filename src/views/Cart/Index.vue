<template>
<div class="cart">
<div class="yanse">
    <div class="yu">
      <div class="header">
        <p>
          购物车 <span @click="bianji" v-if="!is_finish">编辑</span
          ><span @click="bianji" v-if="is_finish">完成</span>
        </p>
      </div>
      <div class="shangpin">
        <div v-for="(item, index) in cartData" :key="item.id" class="sp1">
          <input
            type="checkbox"
            :value="item.id"
            v-model="buy"
            @change="listenCheckAll(item)"
            class="zz"
          />
          <van-card num="5" :price="total.sum">
            <template #thumb>
              <img :src="item.img" width="66" height="80px" />
            </template>
            <template #title>
              <div class="z3">
                {{ item.info }}
              </div>
            </template>
            <template #desc>
              <div class="z2">
                {{ item.color }}
              </div>
            </template>
            <template #price>
              <div class="z1"><span>￥</span>{{ item.price }}</div>
            </template>
            <template #origin-price>
              <div>
                {{ item.originprice }}
              </div>
            </template>
            <template #num>
              <div>
                x<span>{{ item.num }}</span>
              </div>
            </template>
            <template #footer class="zzz" v-if="is_finish">
              <van-button size="mini" @click="jian(item, index)">-</van-button>
              <span class="zzzz">{{ item.num }}</span>
              <van-button size="mini" @click="jia(item)">+</van-button>
            </template>
          </van-card>
        </div>
      </div>
      <div class="kk1" v-show="is_no">
        <van-icon name="cart" color="#bbb" size="120" />
        <div class="kk2">看到喜欢的就带回家吧</div>
      </div>
      <div class="yy" v-if="!is_finish">
        <van-submit-bar
          :price="total.sum * 100"
          button-text="去结算"
          class="x1"
          @submit="onSubmit"
        >
          <input type="checkbox" v-model="checked" @change="checkAll" />全选
          <template #tip>
            你的收货地址不支持同城送,
            <span>修改地址</span>
          </template>
        </van-submit-bar>
      </div>
      <div class="yy" v-if="is_finish">
        <span class="wz">
          <input
            type="checkbox"
            v-model="checked"
            @change="checkAll"
          />全选</span
        >
        <span class="cv" @click="del()">删除</span>
      </div>
    </div>
  </div>
  </div>
  
</template>
<script>
import Vue from "vue";
import { Checkbox, CheckboxGroup, Card, Button, SubmitBar, Icon } from "vant";
Vue.use(Icon);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Card);
Vue.use(Button);

export default {
  data() {
    return {
      cartData: [
        
      ],
      result: [],
      checked: false,
      buy: [],
      is_finish: false,
      is_no: false,
    };
  },
  methods: {
    checkAll() {
      this.buy = [];
      if (this.checked) {
        this.cartData.forEach((el) => {
          this.buy.push(el.id);
          el.is_select = true;
        });
      } else {
        this.cartData.forEach((el) => {
          el.is_select = false;
        });
      }
    },
    listenCheckAll(ele) {
      this.checked = this.cartData.length == this.buy.length;
      console.log(this.buy);

      console.log(this.is_select1);
      ele.is_select = !ele.is_select;
    },
    onSubmit() {},
    del() {
      for (let i = 0; i < this.cartData.length; i++) {
        if (this.cartData[i].is_select == true) {
          console.log(this.cartData);
          this.cartData.splice(i, 1);
          i--;
        }
        this.saveData()
      }
      if (this.cartData.length == 0) {
        this.is_no = true;
        this.checked = false;
      } else {
        this.is_no = false;
      }
      // this.cartData.forEach((ele, index) => {
      //    console.log(1);

      // });
      // 保存数据
      this.getData();
    },
    // onClickEditAddress() {
    //   this.$router.push("/mshop/order");
    // },
    jia(item) {
      item.num++;
      this.saveData();
    },
    jian(item, index) {
      if (item.num == 1) {
        if (confirm("宝贝有限，确定要删除吗？")) {
          this.cartData.splice(index, 1);
        }
      } else {
        item.num--;
      }
      this.saveData();
    },
    bianji() {
      this.is_finish = !this.is_finish;
    },
    saveData() {
      localStorage.setItem("cart", JSON.stringify(this.cartData));
    },
    getData() {
      if (localStorage.getItem("cart")) {
        this.cartData = JSON.parse(localStorage.getItem("cart"));
      } else {
        this.cartData = [];
      }
    },
    getId() {
      if (localStorage.getItem("goods_id")) {
        let goods_idid = localStorage.getItem("goods_id") - 0 + 1;
        localStorage.setItem("goods_id", goods_id);
        return goods_id;
      } else {
        localStorage.setItem("goods_id", 1);
        return 1;
      }
    },
  },
  computed: {
    total() {
      let sum = 0;
      let count = 0;
      this.cartData.forEach((el) => {
        if (this.buy.includes(el.id)) {
          sum += el.num * el.price;
          count += el.num;
        }
      });
      return { sum, count };
    },
  },
  mounted() {
    if (this.cartData.length == 0) {
      this.is_no = true;
    } else {
      this.is_no = false;
    }
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    
    this.saveData();
  },
};
</script>

<style lang="scss" scoped>

.yu {
  margin-bottom: 100px;
}
.header {
  background-color: #fff;
}
.header > p {
  text-align: center;
  font-size: 18px;
  color: #4a4a4a;
  background-color: #fff;
}
.header > p > span {
  float: right;
  margin-right: 14px;
  font-size: 15px;
  color: #4a4a4a;
  background-color: #fff;
}
.shangpin {
  width: 100%;
  background-color: #fff;
}
.shangpin > .sp1 {
  display: flex;
  overflow: hidden;
  background-color: #fff;
  border-top: 10px solid #f4f4f8;
}

.shangpin > .sp1 > .zz {
  margin-top: 45px;
  margin-right: 6px;
}
.van-card {
  flex: 1;
  background-color: #fff;
}
.van-card > .van-card_price {
  color: #ff464e;
  font-size: 12px;
}
.yanse{
  margin-bottom: 50px;
  height: 100%;
}
.van-card__origin-price {
  color: #999999;
  font-size: 12px;
}
.van-card__content {
  color: #999999;
}
.z1 {
  color: #ff464e;
}
.z2 {
  color: #bbb;
}
.z3 {
  color: rgb(10, 1, 1);
  margin-bottom: 10px;
}
.x1 > input {
  font-size: 16px;
}
.zzz {
  overflow: hidden;
}
.zzzz {
  text-align: center;
  line-height: 1;
  margin-left: 3px;
}
.yy {
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 50px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}
.yy > input {
  margin-top: 20px;
  margin-left: 17px;
}
.cv {
  display: block;
  width: 100px;
  height: 50px;
  float: right;
  background-color: rgb(247, 6, 6);
  margin-right: 14px;
  color: #fff;
  text-align: center;
  line-height: 1;
  margin-top: 10px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wz {
  display: flex;
  align-items: center;
}
.kk1 {
  text-align: center;
  margin-top: 20%;
}
</style>

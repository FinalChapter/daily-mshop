<template>
	<div class="yanse">
		<div class="yu">
			<div class="header">
				<p>购物车 <span @click='bianji' v-if="!is_finish">编辑</span><span @click='bianji' v-if="is_finish">完成</span></p>
			</div>
			<div class="shangpin">
				
          <div v-for="item in cartData" :key="item.id" class="sp1">
						<input
                        type="checkbox"
                        :value="item.id"
                        v-model="buy"
                        @change="listenCheckAll"
                        class="zz"
                    />
						<van-card num="5"  :price="total.sum" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
						 origin-price="10.00">
                <template #thumb>
                  <img src="https://goods4.juancdn.com/goods/200928/7/0/5f720340b6f8ea107d2be1e7_800x800.jpg?imageMogr2/quality/88!/format/jpg" width="66" height="80px"/>
                </template>
                <template #title>
                  <div class="z3">
                    {{ item.name }}
                  </div>
                </template>
                <template #desc>
                  <div class="z2">
                        {{ item.grade }}
                    </div>
                </template>
                <template #price>
                  <div class="z1">
                        <span>￥</span>{{ item.price }}
                    </div>
                </template>
                <template #origin-price>
                  <div>
                        {{ item.originprice }}
                    </div>
                </template>
                <template #num >
                    <div>
                      x<span>{{item.num}}</span>
                    </div>
                </template>
                <template #footer class="zzz" v-if="is_finish">
                  <van-button size="mini" @click="jian(item,item.id)">-</van-button>
                    <span class="zzzz">{{item.num}}</span>
                  <van-button size="mini" @click="jia(item)">+</van-button>
                </template>
             </van-card>
					</div>
          
        

			</div>
			<div class="yy" v-if="!is_finish">
      <van-submit-bar :price="total.sum*100" button-text="去结算"  class="x1"  @submit="onSubmit">
        <input
                        type="checkbox"
                        v-model="checked"
                        @change="checkAll"
                    />全选
        <template #tip>
            你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
        </template>
      </van-submit-bar>
				<!-- <van-button type="primary" @click="checkAll">全选</van-button> -->
        <!-- <van-button type="info" @click="toggleAll">反选</van-button> -->
			</div>
      	<div class="yy" v-if="is_finish">
      
        
         <span class="wz"> <input
                        type="checkbox"
                        v-model="checked"
                        @change="checkAll"
                    />全选</span>
                    <span class="cv" @click="del(item.id)">删除</span>
       
        
				<!-- <van-button type="primary" @click="checkAll">全选</van-button> -->
        <!-- <van-button type="info" @click="toggleAll">反选</van-button> -->
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import {
		Checkbox,
		CheckboxGroup,
    Card,
    Button,
    SubmitBar
	} from 'vant';

  Vue.use(SubmitBar);
	Vue.use(Checkbox);
	Vue.use(CheckboxGroup);
	Vue.use(Card);
  Vue.use(Button);
  var cartData = [
                {
                    id: 1,
                    name: "性感",
                    price: 100.00,
                    num: 1,
                    grade:"黑色L",
                    originprice:999,
                },
                {
                    id: 2,
                    name: "萝莉",
                    price: 200.00,
                    num: 1,
                    grade:"粉色L",
                    originprice:999,
                },
                {
                    id: 3,
                    name: "可爱",
                    price: 110.00,
                    num: 1,
                    grade:"橙色L",
                    originprice:999,
                },
                 {
                    id: 4,
                    name: "性感",
                    price: 100,
                    num: 1,
                    grade:"黑色L",
                    originprice:999,
                },
                 {
                    id: 5,
                    name: "性感",
                    price: 100,
                    num: 1,
                    grade:"黑色L",
                    originprice:999,
                },
            ];
	export default {
    
		data() {
      
			return {
        cartData,
        result: [],
        checked:false,
        buy: [],
        is_finish:false,
			};
		},
		methods: {
			checkAll() {
                        this.buy = [];
                        if (this.checked) {
                            this.cartData.forEach((el) => {
                                this.buy.push(el.id);
                            });
                        }
                    },
                    listenCheckAll() {
                        this.checked =
                            this.cartData.length == this.buy.length;
                    },
      onSubmit(){

      },
      del(id) {
                        this.cartData.forEach((element, index) => {
                          console.log(22);
                            if (id == element.id) {
                                this.cartData.splice(index, 1);
                            }
                        });
                    },
      onClickEditAddress(){

      },
      jia(item){
        item.num++
      },
      jian(item,index){
        if (item.num == 1) {
                            if (
                                confirm("这么好的商品你确定不要一个吗？？？？")
                            ) {
                                this.cartData.splice(index, 1);
                            }
                        } else {
                            item.num--;
                        }
      },
      bianji(){
        this.is_finish=!this.is_finish;
      }
    },
    computed:{
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
    }
	}
</script>

<style lang='scss' scoped>
.yu{
  margin-bottom: 100px;
}
.header{
  background-color: #fff;
}
  .header>p{
    text-align: center;
    font-size: 18px;
    color: #4a4a4a;
  background-color: #fff;

  }
  .header>p>span{
    float: right;
    margin-right: 14px;
    font-size: 15px;
    color: #4a4a4a;
  background-color: #fff;

  }
  .shangpin{
    width: 100%;
  background-color: #fff;
    
  }
  .shangpin>.sp1{
    display: flex;
    overflow: hidden;
  background-color: #fff;
  border-top: 10px solid #F4F4F8;

  }

  .shangpin>.sp1>.zz{
    margin-top: 45px;
    margin-right: 6px;
  }
  .van-card{
    flex: 1;
    background-color: #fff;
    
  }
  .van-card>.van-card_price{
    color: #ff464e;
    font-size: 12px;
  }
  .van-card__origin-price{
    color: #999999;
    font-size: 12px;

  }
  .van-card__content{
    color: #999999;
  }
  .z1{
    color: #ff464e;
  }
  .z2{
    color: #bbb;
  }
  .z3{
    color: rgb(10, 1, 1);
    margin-bottom: 10px;
  }
  .x1>input{
    font-size: 16px;
  }
  .zzz{
    overflow: hidden;
  }
  .zzzz{
    text-align: center;
    line-height: 1;
    margin-left: 3px;
  }
.yy{
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}
.yy>input{
  margin-top: 20px;
  margin-left: 17px;
}
.cv{
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
.wz{
  display: flex;
  align-items: center;
}

</style>

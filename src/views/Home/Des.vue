<template>
  <div class="detail">
    <div v-show="isShow" class="details" >
      <span class="del" @click="guige"><van-icon name="cross" color="grey" /></span>
      <img :src='smallimage'  width="120px">
      <p>¥{{price}}</p>
      <p>选择   {{item_color}}    {{item_size}}</p>
      <div class="colorSize">
        <p>颜色</p>
        <div class="yanse">
          <span v-for="(item,index) in color" :key="index" @click="cartchange(item,index)">{{item}}</span>
        </div>
        <p>尺寸</p>
        <div class="size">
          <span v-for="(item,index) in size" :key="index" @click="sizechange(item,index)">{{item}}</span>
        </div>
        <div class="nummber">
          <p>购买数量</p>
          <div>
            <button @click="sub">-</button><input type="text"  v-model="shuliang"><button @click="add">+</button>
          </div>
        </div>
      </div>
      <div class="sure" @click="guige">确认</div>
    </div>
    <span class="more" @click="active"><span></span><span></span><span></span></span>
    <ul class="mm" v-show="actives">
      <li @click="home">首页</li>
      <li>我的收藏</li>
      <li>我的订单</li>
    </ul>
    <div class="sanjiao" v-show="actives"></div>
    <van-swipe @change="onChange" :loop="false">
      <van-swipe-item v-for="(item,index) in image" :key="index">
        
          <img  :src="item" alt="" width="100%"/>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{image.length}}</div>
      </template>
    </van-swipe>
    <div class="price1">
      <div class="price">
        <p>¥<span>{{price}}</span><a>¥{{goods_dis}}</a><b>包邮</b></p>
        <p><span>{{yigou}}</span></p>
      </div>
      <p>{{info}}</p>
    </div>
    <div class="youhui">
      <p><span>满件减</span>满1件减8元，满2件减20元</p>
      <ul class="fuwu">
        <li><span></span>24小时发货</li>
        <li><span></span>7天包退</li>
        <li><span></span>售后补贴</li>
      </ul>
    </div>
    <div class="guige" @click="guige">选择规格:      {{item_color}}    {{item_size}}<span>></span></div>
    <div class="dianpu">
      <p>查看店铺所有商品</p>
    </div>
    <div class="canshu">
      <p>产品参数</p>
      <div v-for="(item,index) in canshu" :key="index">
        
          <img  :src="item" alt="" width="100%"/>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button
        type="danger"
        text="加入购物车"
        @click="onClickButton"
      />
    </van-goods-action>
  </div>
</template>

<script>
import uri from "@/config/uri";
import Vue from "vue";
import {
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Sku,
  Icon,
  Form,
  Toast,
} from "vant";
import {mapMutations} from "vuex"
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Sku);
Vue.use(Icon);
Vue.use(Toast);
export default {
  data() {
    return {
      smallimage:'https://b1.beicdn.com/upload/item/2010/26/78018989810000_800x800.jpg',
      yigou:0,
      current: 0,
      info:'',
      price:0,
      image:[],
      goods_dis:0,//到手价
      zixun:'',
      canshu:[],
      actives:false,
      details_img:[],
      color:[],
      size:[],
      isShow:false,
      item_color:"",
      item_size:'',
      shuliang:1,
    };
  },
  methods: {
    ...mapMutations("global",["setFooter"]),
    home(){
      this.$router.push("/mshop/home")
    },
    add(){
      this.shuliang++
    },
    sub(){
      if(this.shuliang==1){
        return
      }
      this.shuliang--
    },
    cartchange(item,index){
      // console.log(item,index)
      this.smallimage=this.details_img[index]
      this.item_color=item
      
    },
    sizechange(item,index){
      this.item_size=this.size[index]
    },
    guige(){
      this.isShow=!this.isShow     
    },
    active(){
      this.actives=!this.actives

    },
    onChange(index) {
      this.current = index;
    },
    onClickButton() {
      const cart=JSON.parse(window.localStorage.getItem("cart"))||[]
        
      // let list_info={
      //   goods_id:172776990,
      //   num:1,
      //   img:this.image[0],
      //   info:this.info,
      //   price:this.price
      // }
     
          const flag=cart.some((item)=> {
           return item.goods_id==this.$route.params.goodsId
            })
          console.log(flag);
          if(flag==false){
            let list_info={
              goods_id:this.$route.params.goodsId,
              num:this.shuliang,
              img:this.smallimage,
              info:this.info,
              price:this.price,
              is_select:false,
              color:this.item_color,
              size:this.item_size,
              originprice:this.goods_dis

            }
            cart.push(list_info)
          }else{
            const list_info=cart.filter(item=> item.goods_id==this.$route.params.goodsId)[0]
            list_info.num=list_info.num-0+this.shuliang
          }
          window.localStorage.setItem("cart",JSON.stringify(cart))
          Toast.success('加入购物车成功');
    },
    onClickIcon() {
      this.$router.push('/mshop/cart')
    },
  },
  created() {
    
    this.$http.get("https://webservice.juanpi.com/api/getMemberAboutInfo"+"?goods_id="+this.$route.params.goodsId).then(ret=>{
      // console.log(ret)
      this.yigou=ret.skudata.info.join_number
      ret.skudata.sku.forEach(item=>{
        this.details_img.push(item.av_zpic)
        this.color.push(item.av_zvalue)
        
        if(item.av_fvalue) this.size.push(item.av_fvalue)
        // console.log(item.av_fvalue)
      })
      this.color=Array.from(new Set(this.color))
      if(this.size==undefined){
        this.size.push("均码")
      }
      // console.log(this.details_img)
      this.details_img=Array.from(new Set(this.details_img))
      // console.log(this.size)
      this.smallimage=this.details_img[0]
      this.size=Array.from(new Set(this.size))
      // console.log(this.color)
      // console.log(this.size)
      this.item_color=this.color[0]
      this.item_size=this.size[0]
      // console.log(this.details_img)

      
    })
     this.$http
            .get(uri.getDetail + "?goods_id="+this.$route.params.goodsId).then((ret)=>{
              // console.log(ret.data.info.images)
              if(ret.data.info.images.length==0){
                this.image.push('https://ss3.bdstatic.com/yrwDcj7w0QhBkMak8IuT_XF5ehU5bvGh7c50/logopic/6c806cee97392c1fd33ffaf6cc9881fb_fullsize.jpg')
              }else{
                this.image=ret.data.info.images
              }
              
              //  console.log(this.image)
             
              
              this.price=ret.data.info.cprice
              
              this.goods_dis=ret.data.info.oprice
              this.info=ret.data.info.title
              // console.log(ret)
              this.canshu=ret.data.info.goods_content.gd_content
              // console.log(this.canshu)
              // this.zixun=
              // this.yigou=ret.data.info.schedule_info.store_info
            })
            
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
.del{
  position: absolute;
  right: 10px;
  top: 10px;
}
.colorSize>p{
  margin-left:24px ;
}
input,button{
  border: 0;
  outline: none;
}
.nummber{
  display: flex;
  justify-content: space-between;
  align-items:center ;
  padding: 0 16px;
  margin-bottom:10px ;
}
.nummber>div>input{
  width: 20px;
  text-align: center;
}
.yanse,.size{
  // background: #fa2422;
  display: flex;
  flex-wrap: wrap;
  margin-bottom:15px ;

}
.yanse>span,.size>span{
  width: 90px;
  height: 30px;
  margin: 7px 20px;
  border: 1px black solid;
  display: flex;
  justify-content: center;
  align-items: center;
}
.yanse>span:hover,.size>span:hover{
  background:orangered ;
  color: white;
}

.details{
  width: 100%;;
  background: white;
  position: fixed;
  bottom: 0;
  z-index: 11;
}
.details>p{
  text-align: center;
  
}
.details>p:nth-of-type(1){
  margin-top:15px ;
}
.details>p:nth-of-type(2){
  margin-bottom:25px ;
}
.details>img{
  position: absolute;
  top: -50px;
  left: 10px;
}
.sure{
  width: 100%;
  padding: 7px 0;
  background: orangered;
  color: white;
  text-align: center;
  font-size: 22px;
}
.sanjiao{
  width: 0;
    height: 0;

    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px  solid rgba(0,0,0,0.6);
    position: absolute;
    top: 45px;
    right: 20px;
    z-index: 11;
}
.mm{
  width: 135px;
  background: rgba(0,0,0,0.6);
  color: white;
  border-radius: 10px;
  position: absolute;
  right: 0;
  top: 55px;
  z-index: 22;
}
.mm>li{
  padding: 6px 5px;
}
.more{
  position:absolute;
  right:15px;
  top: 15px;
  z-index:33;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.more>span{
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;

}
.more>span:nth-of-type(2){
  margin: 0 4px;
}
.dianpu{
  text-align: center;
  line-height: 40px;
  background: white;
  margin: 8px 0;
  height: 40px;
  
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
p {
  margin: 0;
}
.price1 {
  background: white;
  padding: 10px;
}
.price {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  margin-bottom: 6px;
}
.price > p:nth-of-type(1) {
  color: #fa2422;
  display: flex;
  align-items: center;

}
.price > p:nth-of-type(2){
  color: #BBBBCA;
  font-size:15px;
}

.price > p:nth-of-type(1) > span {
  font-size: 25px;
}
.price > p:nth-of-type(1)>a{
  color: #BBBBCA;
  font-size:15px;
  margin: 4px 6px 0;
  text-decoration: line-through;
  
}
.price > p:nth-of-type(1) > b {
  font-style: normal;
  display: inline-block;
  background: #fa2422;
  color: white;
  font-size: 8px;
  margin-right: 6px;
  margin-left: 4px;
  padding: 0 3px;
}
.detail {
  background: #f4f4f8;
}
img {
  display: block;
}
.detail > p {
  line-height: 1;
  background: white;
  height: 100%;
  position: relative;
}
.youhui {
  background: white;
  margin-top: 8px;
  padding: 5px 10px;
}
.youhui > p > span {
  display: inline-block;
  background: #fa2422;
  color: white;
  font-size: 8px;
  margin-right: 6px;
}
.youhui > p:nth-of-type(1) {
  border-bottom: 2px #f4f4f8 solid;
  padding-bottom: 10px;
}
.fuwu {
  display: flex;
}
.fuwu > li {
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}
.fuwu > li > span {
  display: inline-block;
  background: orange;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-right: 3px;
}
.guige {
  background: white;
  padding: 10px 10px;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.guige > span {
  font-weight: bold;
  color: grey;
}
.canshu {
  background: white;
  margin-top: 8px;
}
.canshu > p {
  padding: 10px;
  text-align: center;
  font-size: 20px;
}
.canshu > img {
  width: 100%;
}
</style>

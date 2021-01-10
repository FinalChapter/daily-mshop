import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './routes/home'
import Center from "./routes/center"
import Cart from "./routes/cart"
import Category from "./routes/category"
import Search from "./routes/search"
import Not_Found from "@/views/Not-Found/Index"
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    //主页重定向
    path: "/",
    redirect:"/mshop/home"
  },
  // 主页路由
   ...Home,
   //个人中心路由
   ...Center,
   //购物车路由
   ...Cart,
   //分类模块路由
   ...Category,
   //搜索路由
   ...Search,
   //404路由
  {
    path:"*",
    component:Not_Found
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

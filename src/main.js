import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from "@/api/http"
Vue.config.productionTip = false
Vue.prototype.$http = http
// 从缓存中去除jwt赋给vuex
let jwt = localStorage.getItem("_token")
if(jwt){
  store.commit("global/setJwt", jwt)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

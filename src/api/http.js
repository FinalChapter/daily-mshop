import axios from "axios";
// 导入 store (因为这个地方不是vue实例, 不能用this)
import store from '@/store/index'
//响应拦截器
axios.interceptors.response.use((ret) =>{
    // 拦截 jwt
    if(ret.data._token){
        // 存储下来 (存在什么地方?) vuex + localStorage
        store.commit("global/setJwt", ret.data._token)
    }
    return ret.data||ret
})
//请求拦截器
axios.interceptors.request.use((cfg) => {
    // 请求拦截, 在每次请求的时候带上jwt,让jwt上车
    cfg.headers["authorization"] = store.state.global._token ;
    // 处理完成后让其继续走
    return cfg;
})

export default axios
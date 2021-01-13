<template>
    <div>
        <form action="/">
            <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            />
        </form>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from "vuex";
// import api from "../../api/axiosConfig.js";
import { Search, Toast } from 'vant';

Vue.use(Search);
Vue.use(Toast);
export default {
    data(){
        return{
            value: '',
            //展示原本数据
            list:[],
            //搜索后的展示数据
            searchData:[],
        }
    },
    components:{},
    computed:{
        ...mapGetters(["getAddressList", "getLoginUser"])
    },
    created(){
        //获取接口数据
    },
    mounted(){},
    methods:{
        onSearch(val){
            // Toast(val)
            if(val){
                this.$router.push('SearchList');
            }else{
                Toast('请输入搜索内容')
            }
        },
        onCancel(){
            this.$router.go(-1);
        },
        getList(){

        },
    },

}
</script>

<style lang="scss" scoped>
/deep/.van-icon{
    color: #999;
    font-size: 20px;
}

</style>
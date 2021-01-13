//代理地址加前缀,不代理不需要
let prefix = "/banner";
let prefix2= "/goods";
let prefix3 = "/cyq";
// 导出
export default {
    // 示例 城市信息获取
    getBanner: prefix+"/appads/banner?app_version=4.7.3&scene_key=xcx_shangxin&platform=msmall&zy_ids=p16_c4_l1&jpUid=&jpSign=&jpPlatform=iPhone_xcx&apisign=39e158d58a5ca87944510d9b8819f941" ,
    getGoods: prefix2+"/getGoods?",
    getDetail:prefix3,
    getList: prefix + '/xcxcategory/main/list',
    getSearchList: prefix + '/xcxgoods/goodslist?cid=',
};
export default {
  namespaced: true,
  state: {
    isFooterShow: true,
    _token: "",
  },
  mutations: {
    setFooter(state, arg) {
      state.isFooterShow = arg;
    },
    // 更新设置jwt
    setJwt(state, arg) {
      state._token = arg;
      // 存到localStorage中一份
      localStorage.setItem("_token", arg);
    },
  },
  actions: {},
  getters: {},
};

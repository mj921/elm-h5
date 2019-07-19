const userinfo = localStorage.getItem("userinfo");
export default {
  namespaced: true,
  state: {
    userinfo: userinfo ? JSON.parse(userinfo) : {}
  },
  mutations: {
    UPDATE_USERINFO(state, userinfo) {
      state.userinfo = { ...userinfo };
      localStorage.setItem("userinfo", JSON.stringify(userinfo));
    }
  },
  actions: {
    login({ commit }, userinfo = {}) {
      localStorage.setItem("token", userinfo.token);
      commit("UPDATE_USERINFO", userinfo);
    }
  }
};

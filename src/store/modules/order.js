const order = localStorage.getItem("order");
export default {
  namespaced: true,
  state: {
    order: order
      ? JSON.parse(order)
      : {
          merchant: {},
          dishs: []
        }
  },
  mutations: {
    UPDATE_MERCHANT(state, merchant) {
      if (state.order.merchant.id && state.order.merchant.id === merchant.id) {
        state.order.dishs = [];
      }
      state.order.merchant = { ...merchant };
      localStorage.setItem("order", JSON.stringify(state.order));
    },
    UPDATE_DISHS(state, dishs) {
      state.order.dishs = [...dishs];
      localStorage.setItem("order", JSON.stringify(state.order));
    }
  }
};

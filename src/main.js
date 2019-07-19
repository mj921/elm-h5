import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import installComponents from "./components";
import "./assets/icons/icon";
import message from "./utils/message";

Vue.config.productionTip = false;
installComponents(Vue);
Vue.prototype.$message = message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/merchant-detail/:id",
      name: "merchant-detail",
      component: () =>
        import(
          /* webpackChunkName: "merchant-detail" */ "./views/MerchantDetail.vue"
        )
    },
    {
      path: "/dish-order",
      name: "dish-order",
      component: () =>
        import(
          /* webpackChunkName: "merchant-detail" */ "./views/DishOrder.vue"
        )
    },
    {
      path: "/my-account",
      name: "my-account",
      component: () =>
        import(/* webpackChunkName: "my-account" */ "./views/MyAccount.vue")
    },
    {
      path: "/address/list",
      name: "address-list",
      component: () =>
        import(
          /* webpackChunkName: "address-list" */ "./views/address/AddressList.vue"
        )
    },
    {
      path: "/address/add",
      name: "address-add",
      component: () =>
        import(
          /* webpackChunkName: "address-add" */ "./views/address/AddAddress.vue"
        )
    },
    {
      path: "/address/position-select",
      name: "position-select",
      component: () =>
        import(
          /* webpackChunkName: "position-select" */ "./views/PositionSelect.vue"
        )
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "register" */ "./views/Register.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/404",
      name: "404",
      props: { type: "404" },
      component: () =>
        import(/* webpackChunkName: "errorPage" */ "./views/ErrorPage.vue")
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});

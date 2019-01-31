import Vue from "vue";
import vueRouter from "vue-router";
import axios from "@/axios";
import app from "@/app.vue";
import index from "@/view/index.vue";
import identification from "@/view/identification.vue";
import getCoupon from "@/view/getCoupon.vue";
import fail from "@/view/fail.vue";
import success from "@/view/success.vue";
import { sendLaq, setLaq } from "=_=/maidian.js";
import store from "./store";
Vue.use(vueRouter);
Vue.prototype.$axios = axios;
Vue.prototype.$store = store;
Vue.prototype.send = sendLaq;
setLaq("10702df0c6f6457af9e6279b9b026e23");
var router = new vueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      component: identification,
      name: "identification",
      path: "/identification"
    },
    {
      component: getCoupon,
      name: "getCoupon",
      path: "/getCoupon"
    },
    {
      component: fail,
      name: "fail",
      path: "/fail"
    },
    {
      component: success,
      name: "success",
      path: "/success"
    },
    {
      component: index,
      name: "index",
      path: "/"
    }
    // {
    //   component:()=>{import(/* webpackChunkName: "index" */ './view/index.vue')},
    //   name:'index',
    //   path:'*',
    // },
  ]
});
router.beforeEach((to, from, next) => {
  if (to.name !== "index") {
    if (!sessionStorage.getItem("userId")) {
      next({ name: "index", query: { channeltype: "share" } });
    } else {
      next();
    }
  } else {
    next();
  }
});
const vm = new Vue({
  router,
  render(h) {
    return h(app);
  }
}).$mount("#app");
export { vm, router };

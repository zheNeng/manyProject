import { Toast } from "mint-ui";
let toast = obj => {
  if (typeof obj == "string") {
    Toast({
      message: obj,
      position: "top",
      duration: 3000
    });
  } else {
    Toast(obj);
  }
};
export { toast };
export default {
  install(Vue) {
    if (!toast) {
      toast = Toast;
      // const loadingPlugin = Vue.extend(Indicator);
      // vm = new loadingPlugin({
      //   el: document.createElement("div")
      // });
      // document.body.appendChild(vm.$el);
    }
    if (!Vue.prototype.$toast) {
      Vue.prototype.$toast = toast;
    }
  }
};

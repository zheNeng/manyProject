let vm;
import { Indicator } from "mint-ui";
export default {
  install(Vue) {
    if (!vm) {
      const loadingPlugin = Vue.extend(Indicator);
      vm = new loadingPlugin({
        el: document.createElement("div")
      });
      document.body.appendChild(vm.$el);
    }
    let loading = {
      /**
       *
       * @param {string} text
       * @param {string} spinnerType
       */
      open: function(text = "加载中...", spinnerType = "fading-circle") {
        vm.open({
          text,
          spinnerType
        });
      },
      /**
       *
       * @param {number} time 定时器
       */
      close: function(time = 0) {
        setTimeout(() => {
          vm.close();
        }, time);
      }
    };
    if (!Vue.$loading) {
      Vue.prototype.$loading = loading;
    }
  }
};

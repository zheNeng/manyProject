import Vue from 'vue'

declare module "vue/types/vue" {
  interface Vue {
    /**
     * loading插件
     */
    $loading: {
      open:loading.open,
      close:loading.close
    };
  }
}
namespace loading{
  interface open {
    (text: string, spinnerType: string): void;
  }
  interface close {
    (time: number): void;
  }
}

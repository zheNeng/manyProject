import { deb } from "=_=/deb.js";
/**
 * Vue指令，节流指令，未加修饰符，可加修饰符
 */
export const tad = {
  name: "tad",
  bind(el, binding, vnode) {
    const that = vnode.context;
    // console.log(binding, vnode);
    const proxyMthod = deb(that[binding.arg], "other", 3000);
    el.addEventListener("click", function T() {
      proxyMthod.call(that, binding.value);
    });
  }
};

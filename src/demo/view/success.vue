<template>
  <div class="success">
    <img src="@/assets/img/success.jpg"
     style="min-height:100vh"
     alt="">
    <div @click="click" class="button"></div>
    <MyFoot  @click="send('click','btn-type','third-cil-btn')"></MyFoot>
  </div>
</template>
<script>
import { toOther } from "=_=/patchWxAl.js";
import { getEnvConfig } from "@/env.config.js";
import MyFoot from "=_=/foot.vue";
export default {
  name: "Success",
  components: { MyFoot },
  data: function() {
    return {};
  },
  created() {},
  methods: {
    click() {
      this.send("click", "action-type", "order-btn");
      toOther(getEnvConfig("order"));
    }
  }
};
</script>
<style  scoped lang='stylus'>
.button{
     position: absolute;
    top: 558px;
    left: 87px;
    height: 100px;
    width: 200px;
}
</style>

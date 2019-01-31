<template>
  <div>
    <img
      src="@/assets/img/detail.jpg"
      alt=""
      style="min-height:100vh"
       onerror="location.reload()"
    >
    <div
      @click="click(0)"
      class="button1"
    ></div>
    <!-- <div v-for="(a,index) in arr " :key="a" @click="click(index)">{{a}}</div> -->
    <MyFoot @click="send('click','btn-type','second-cil-btn')"></MyFoot>
  </div>
</template>
<script>
import MyFoot from "=_=/foot.vue";
import { getCoupon, goResignStudent } from "@/service";
import { toast } from "=_=/patchWxAl.js";
export default {
  name: "getCoupon",
  components: { MyFoot },
  data: function() {
    return {
      arr: ["69", "88"]
    };
  },
  methods: {
    click(index) {
      console.log(index);
      this.send("click", "action-type", `getCoupon-${index}-btn`);
      /* eslint-disable */
      getCoupon(String(index))
        .then(e => {
          console.log("clickgetCoupon", e);
          switch (e.data.status) {
            case "finished":
              this.send("visit", "page-type", `success-${index}`);
              this.$router.push({ name: "success" });
              break;
            case "exceedLimit":
              this.send("visit", "page-type", `fail-${index}`);
              this.$router.push({ name: "fail", query: { type: index } });
              break;
            case "userRuleValidate":
              goResignStudent();
              break;
            default:
              toast(e.data.status);
          }
        })
        .catch(e => {
          this.send("visit", "page-type", `err-msg=${e}`);
          toast(e);
        });
    }
  },
  created() {
    this.send("visit", "page-type", `select`);
  }
};
</script>
<style   lang='stylus' scoped>
.button1 {
  position: absolute;
  width: 100px;
  height: 50px;
  top: 534px;
  right: 136px;
}

.button2 {
  position: absolute;
  width: 100px;
  height: 50px;
  top: 534px;
  right: 136px;
}
</style>

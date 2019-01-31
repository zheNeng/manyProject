<template>
  <div>
      <img src="@/assets/img/alert1.jpg"
      style="min-height:100vh"
      alt="" 
      onerror="location.reload()">
       <div @click="click" class="button"></div>
    <MyFoot
      @click="send('click','btn-type','first-cil-btn')"
    />
  </div>
</template>
<script>
//KcOtdq1zuoi5BWwirW1s5JZzKtn6JcoC
import MyFoot from "=_=/foot.vue";
import { goResignStudent } from "../service";
export default {
  name: "Identification",
  components: { MyFoot },
  data: function() {
    return {};
  },
  created() {},
  computed: {
    getJoinAct() {
      return this.$store.getters.getJoinAct;
    }
  },
  methods: {
    click() {
      this.send("click", "action-type", `consent-btn`);
      if (this.getJoinAct.data.status == "notStudent") {
        this.send("visit", "page-type", `not-student`);
        goResignStudent();
      } else if (this.getJoinAct.data.status == "student") {
        this.send("visit", "page-type", `student`);
        this.$router.push("getCoupon");
      }
    }
  }
};
</script>
<style  lang='stylus' scoped>
.button{
    width: 200px;
    position: absolute;
    height: 100px;
    left: 86px;
    top: 554px;
}
</style>

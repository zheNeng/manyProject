<template>
  <div class="fail">
    <img src="@/assets/img/fail69.jpg"
     style="min-height:100vh"
     alt="" v-if="type==0">
     <MyFoot  @click="send('click','btn-type','third-cil-btn')"></MyFoot>
  </div>
</template>
<script>
import MyFoot from "=_=/foot.vue";
export default {
  name: "Fail",
  components: { MyFoot },
  data: function() {
    return {};
  },
  computed: {
    type() {
      return this.$route.query.type || 0;
    }
  },
  created() {
    console.log(this.type);
  },
  methods: {}
};
</script>
<style  scoped lang='stylus'>
.button{
  position: absolute;
    background: red;
    width: 100px;
    height: 50px;
    top: 498px;
    right: 10px;
}
</style>

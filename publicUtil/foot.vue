<template>
  <div >
    <div style=" text-align: center;
  color: #a9a4a4;
  font-size: 12px;
  margin: 10px;">
  由<span @click="foot" style="margin: 4px;
  color: #4e6371;">
        讯联灵犀
      </span >提供技术支持

    </div>
   
  </div>
</template>
<script>
export default {
  name: "Foot",
  components: {},
  data: function() {
    return {};
  },
  created() {},
  methods: {
    foot() {
      this.$emit("click");
      setTimeout(() => {
        location.href = "https://lingxi.xunliandata.com ";
      }, 50);
    }
  }
};
</script>
<style  scoped lang="stylus">
.foot {
  text-align: center;
  color: #a9a4a4;
  font-size: 12px;
  margin: 10px;
}
.foot span {
  margin: 4px;
  color: #4e6371;
}
</style>

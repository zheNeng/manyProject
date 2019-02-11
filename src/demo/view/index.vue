<template>
  <div />
</template>
<script>
import { joinAct, getAuthCode } from "@/service";
import { toast, toOther, popWindow } from "=_=/patchWxAl.js";
import { getUrlParams, judgeEnvironment } from "=_=/util.js";
import { getEnvConfig } from "@/env.config";
export default {
  name: "Index",
  components: {},
  data: function() {
    return {};
  },
  created() {
    //this.checkUrl();
  },
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave", to, from);
    console.log(location.origin + location.pathname + to.path);
    location.href = location.origin + location.pathname + "#" + to.path;
    next();
  },
  methods: {
    checkUrl() {
      // if(judgeEnvironment()!=='AL'){
      //   this.send('visit','page-type',`err-page`)
      //   return
      // }
      //判断当前页面是从什么页面返回
      var params = getUrlParams(); //URL中携带的参数
      //var length = Object.keys(params);
      if (judgeEnvironment() !== "AL" && judgeEnvironment() !== 1) {
        this.send("visit", "page-type", `err-page`);
        toOther(getEnvConfig("err"));
        return;
      }

      if (sessionStorage.getItem("userId")) {
        popWindow();
      } else {
        if (params.state == "userId") {
          //用户授权
          this.send("visit", "page-type", `alp-auth-back`);
          if (params.code) {
            joinAct(params.code)
              .then(() => {
                this.$router.replace("identification");
              })
              .catch(e => {
                console.log("err", e);
              });
          } else {
            toast("授权失败");
          }
        } else if (params.type == "resignstudent") {
          //学生认证回来的
          this.$router.replace("getCoupon");
        } else if (params.channeltype) {
          // 从资源位进来
          this.send("visit", "page-type", `channeltype=${params.channeltype}`);
          sessionStorage.setItem("channeltype", params.channeltype);
          getAuthCode();
        } else {
          //从主页进来的
          this.send("visit", "page-type", `channeltype=home-page`);
          sessionStorage.setItem("channeltype", "home-page");
          getAuthCode();
          // if (length == 0) {
          //   toast({ content: "未知入口" });
          // } else {
          //   toast({ content: "未知url,记录错误日志" });
          //   sessionStorage.setItem(
          //     `log_${new Date().getTime()}`,
          //     location.href
          //   );
          //   return null;
          // }
        }
      }
    }
  }
};
</script>
<style  scoped>
</style>

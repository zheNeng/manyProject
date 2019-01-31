import axios from "axios";
import qs from "qs";
import { toast, loading } from "=_=/patchWxAl.js";
import { getAuthCode } from "@/service";
var http = axios.create();
import { vm } from "@/main";
http.qs = qs.stringify;
http.defaults.method = "post";
http.interceptors.request.use(
  function(config) {
    loading.show();
    // 在发送请求之前做些什么

    return config;
  },
  function(error) {
    // 对请求错误做些什么

    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  response => {
    loading.close();
    console.log("response", response);
    if (response.data.respcd != "00") {
      toast(`${response.data.errorDetail}_${response.data.respcd}`);
      window._laq.push([
        "send",
        "visit",
        "page-type",
        `err-msg=${response.data.errorDetail}_${response.data.respcd}`
      ]);
      if (response.data.respcd == "C2") {
        vm.$router.replace({ name: "fail", query: { message: "领券超限制" } });
      }
      if (response.data.respcd == "98") {
        getAuthCode();
      }
      return Promise.reject(
        `${response.data.errorDetail}_${response.data.respcd}`
      );
    }
    return response.data;
  },
  function(error) {
    // 对响应错误做点什么
    loading.close();
    console.log("错误处理");
    return Promise.reject(error);
  }
);
export default http;

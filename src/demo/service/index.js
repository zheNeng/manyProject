import axios from "@/axios";
import { getEnvConfig } from "@/env.config";
import { toOther } from "=_=/patchWxAl.js";
import store from "../store";
function joinAct(auth_code) {
  const obj = {
    url: "/marketing/activity",
    data: {
      code: getEnvConfig("actCode"),
      clientId: getEnvConfig("clientId"),
      data: { auth_code },
      option: "joinAct",
      version: "1.0"
    }
  };
  return axios(obj).then(e => {
    if (e.respcd == "00") {
      store.commit("setJoinAct", e);
      return e;
    }
  });
}
function getCoupon(index) {
  const obj = {
    url: "/marketing/activity",
    data: {
      code: getEnvConfig("actCode"),
      clientId: getEnvConfig("clientId"),
      data: { userId: sessionStorage.getItem("userId"), index },
      option: "getCoupon",
      version: "1.0"
    }
  };
  return axios(obj).then(res => {
    console.log("getCoupon", res);
    if (
      ["finished", "exceedLimit", "userRuleValidate"].filter(
        e => res.data.status == e
      ).length == 0
    ) {
      window._laq.push([
        "send",
        "visit",
        "page-type",
        `err-page=不合理的请求(${res.data.status})`
      ]);
      return Promise.reject(res.data.status);
    }
    return res;
  });
}
function getAuthCode() {
  toOther(getEnvConfig("auth"));
}
function goResignStudent() {
  toOther(getEnvConfig("resignStudent"));
}
export { joinAct, getCoupon, getAuthCode, goResignStudent };

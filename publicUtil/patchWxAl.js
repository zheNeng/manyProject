import axios from "axios";
import { inspectDomScript } from "./util";
function judgeEnvironment() {
  //判断环境
  const userAgent = navigator.userAgent.toLowerCase();
  if (
    userAgent.match(/Alipay/i) &&
    userAgent.match(/Alipay/i)[0] === "alipay"
  ) {
    return "AL";
  } else if (
    userAgent.match(/MicroMessenger/i) &&
    userAgent.match(/MicroMessenger/i)[0] === "micromessenger"
  ) {
    return "WX";
  } else {
    return null;
  }
}
const UaEnvironment = judgeEnvironment();
if (UaEnvironment == "WX") {
  inspectDomScript("https://res2.wx.qq.com/open/js/jweixin-1.4.0.js ");
} else if (UaEnvironment == "AL") {
  inspectDomScript(
    "https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js"
  );
}
/**
 * 拍平向后端换取用户信息的code
 * @param {object} obj
 */
export function patchAuth(obj) {
  //拍平向后端换取用户信息的code
  const res = {
    code: obj.auth_code || obj.code
  };
  return Object.assign(obj, res);
}
/**
 * //拍平用户信息
 * @param {object} obj
 */
export function patchUserInfo(obj) {
  //拍平用户信息
  const res = {
    userId:
      obj.userId || obj.user_id || obj.openid || obj.open_id || obj.openId, //userid
    name: obj.name || obj.nick_name || obj.nickname, //名字
    avatar: obj.avatar || obj.headimgurl //头像
  };
  const old = JSON.parse(sessionStorage.getItem("paramsInfo")) || {};
  return Object.assign(old, obj, res);
}
/**
 *
 * @param {number} count
 * @param {Array} sourceType
 */
export function chooseImage(count = 1, sourceType = ["camera", "album"]) {
  if (UaEnvironment == "AL" && process.env.NODE_ENV !== "development") {
    return new Promise(res => {
      window.ap.chooseImage(
        {
          count,
          sourceType
        },
        function callBack(result) {
          res(result.apFilePaths);
        }
      );
    });
  } else if (UaEnvironment == "WX") {
    return new Promise(res => {
      console.log("wx选择图片");
      window.wx.chooseImage({
        count, // 默认1
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType,
        success: function(result) {
          res(result.localIds);
        }
      });
    });
  }
}
/**
 *
 * @param {string} content
 * @param {string} type
 * @param {number} duration
 */
export function toast(content = "提示内容", type = "none", duration = 2000) {
  if (UaEnvironment == "AL" && process.env.NODE_ENV !== "development") {
    window.ap.showToast({
      content,
      type,
      duration
    });
  } else {
    alert(content);
  }
}
/**
 * loading组件
 */
export const loading = {
  show(content = "加载中") {
    if (UaEnvironment == "AL") {
      window.ap.showLoading({
        content
      });
    }
  },
  close() {
    if (UaEnvironment == "AL") {
      window.ap.hideLoading();
    }
  }
};
/**
 * 跳转到外链
 * @param {string} url
 */
export function toOther(url) {
  //去其他页面,定时是为了埋点时间
  setTimeout(() => {
    // if (UaEnvironment == "AL") {
    //   window.ap.redirectTo({
    //     url
    //   });
    // } else {
    //   console.log(url);
    location.href = url;
    // }
  }, 300);
}
export function popWindow() {
  //关闭当前窗口
  if (UaEnvironment == "AL") {
    window.ap.popWindow();
  } else {
    window.close();
  }
}

/**
 * 获取微信SDK签名
 * @param {string} appId
 */
export function getJsSignature(appId) {
  if (UaEnvironment === "WX") {
    const data = {
      appId: appId,
      url: window.location.href.split("#")[0]
    };
    console.log(data);
    const url = "/member/wxmobile/getJsSignatureByAppId.json";
    return axios.post(url, data).then(e => {
      if (String(e.status) === "200" && String(e.data.status)) {
        const obj = {};
        var formateObj = {
          app_id: {
            key: "appId"
          },
          nonce_str: {
            key: "nonceStr"
          }
        };
        for (let i in e.data.data) {
          if (formateObj[i]) {
            obj[formateObj[i].key] = e.data.data[i];
          } else {
            obj[i] = e.data.data[i];
          }
        }
        let count = 0; //config计数
        const setConfig = () => {
          if (count > 5) {
            console.log("签名上限");
            return;
          } else {
            console.log("签名", count);
          }
          if (window.wx) {
            window.wx.config({
              debug: true,
              jsApiList: ["chooseImage"],
              ...obj
            });
          } else {
            setTimeout(() => {
              setConfig();
            }, 1000);
          }
          count++;
        };
        setConfig();

        console.log("授权成功");
      } else {
        console.log("授权失败");
      }
    });
  } else {
    console.log("不需要授权");
  }
}

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
export function patchAuth(obj) {
  //拍平向后端换取用户信息的code
  const res = {
    code: obj.auth_code || obj.code
  };
  return Object.assign(obj, res);
}
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
export function toast(content = "提示内容", type = "none", duration = 2000) {
  if (judgeEnvironment() == "AL" && process.env.NODE_ENV !== "development") {
    window.ap.showToast({
      content,
      type,
      duration
    });
  } else {
    alert(content);
  }
}
export const loading = {
  show(content = "加载中") {
    if (judgeEnvironment() == "AL") {
      window.ap.showLoading({
        content
      });
    }
  },
  close() {
    if (judgeEnvironment() == "AL") {
      window.ap.hideLoading();
    }
  }
};
export function toOther(url) {
  //去其他页面,定时是为了埋点时间
  setTimeout(() => {
    // if (judgeEnvironment() == "AL") {
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
  if (judgeEnvironment() == "AL") {
    window.ap.popWindow();
  } else {
    window.close();
  }
}

/**
 * 返回 WX AL 或者 null
 */
export function judgeEnvironment() {
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
/**
 * 判断是不是默认的对象
 * @param {object} obj
 */
/* eslint-disable */
export function checkDefault(obj) {
  const type = Object.prototype.toString.call(obj);
  switch (type) {
  case "[object Object]":
  case "[object Array]":
    for (let i in obj) {
      //只要其值不是空字符串就好了
      if (obj[i] && typeof obj[i] !== "object") {
        return false;
      } else if (obj[i] && typeof obj[i] == "object") {
        return checkDefault(obj[i]);
      }
    }
    break;
  case "[object String]":
  default:
    if (obj) {
      return false;
    }
  }
  return true;
}
/**
 * 默认是location.search.substr(1),可传入string
 * @param {string} urlParams 
 */
export function getUrlParams(urlParams) {
  const obj = {};
  let str = "";
  if (urlParams) {
    str = urlParams;
  } else {
    str = location.search.substr(1);
  }
  str &&
    str.split("&").forEach(e => {
      const [key, value] = e.split("=");
      obj[key] = value;
    });
  return obj;
}
/**
 * 获得 # 前后的url参数
 */
export function getAllParams() {
  var str = location.hash;
  var index = str.indexOf("?");
  if (index > -1) {
    str = str.substr(index + 1);
  } else {
    str = "";
  }
  const query = getUrlParams(str); //hash后面的值
  const other = getUrlParams(); //hash前面的值
  var res = Object.assign(query, other);
  console.log("12312321321", res);
  return Object.assign(res);
}
export function checkEmoji(string) {
  //检查是否有表情
  let emojiRegex = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/;
  return emojiRegex.test(string);
}

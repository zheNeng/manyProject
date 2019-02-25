const env = process.env.BUILD_ENV || "dev"; //发生产的时候，要切换这个配置,process.env.BUILD_ENV在Build的时候将通过DefinePlugin替换为cross-env的值

const title = "海底捞";
const obj = {
  actCode: {
    //活动标识
    dev: "2019012814500609800001",
    pro: "2019020100000609800001"
  },
  clientId: {
    dev: "100000000000012",
    pro: "100000000000003"
  },
  err: {
    dev: `https://cardtest.ipay.so/activity/err/?title=${encodeURIComponent(
      title
    )}`,
    pro: `https://card.ipay.so/activity/err/?title=${encodeURIComponent(title)}`
  },
  rate69: {
    dev:
      "https://cardtest.ipay.so/marketing/koubei/coupon?clientId=153291877677706&campCode=20190125181215fac85cef",
    pro: ""
  },
  tate88: {
    dev:
      "https://cardtest.ipay.so/marketing/koubei/coupon?clientId=153291877677706&campCode=20190125181502105d01e4",
    pro: ""
  },
  auth: {
    dev: `https://cardtest.ipay.so/marketing/wa/authorize?clientID=100000000000012&scope=auth_userinfo&redirect_uri=${encodeURIComponent(
      location.origin + location.pathname
    )}&state=userId&channel=ALP&type=userauth`,
    pro: `https://card.ipay.so/marketing/wa/authorize?clientID=100000000000003&scope=auth_userinfo&redirect_uri=${encodeURIComponent(
      location.origin + location.pathname
    )}&state=userId&channel=ALP&type=userauth`
  },
  resignStudent: `alipays://platformapi/startapp?appId=20000067&url=https%3A%2F%2Fcertify.alipay.com%2Fstudent%2Fh5%2Findex.htm%3Fsource%3DKouBei_student%26returnURI%3D${encodeURIComponent(
    `${location.origin}${location.pathname}?type=resignstudent`
  )}`,
  order:
    "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2016021901151494&scope=auth_user&redirect_uri=http%3A%2F%2Fcater.haidilao.com%2FCaterWeixin%2Foauth%2Fshare%2Falipay.json%3Furi%3D2%26source_type%3Dalipay"
};
function getEnvConfig(key) {
  if (key) {
    if (typeof obj[key] == "string") {
      return obj[key];
    } else {
      return obj[key][env];
    }
  } else {
    const res = {};
    for (let key in obj) {
      res[key] = obj[key][env];
    }
    return res;
  }
}
export { getEnvConfig };

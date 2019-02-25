const path = require("path");
const fs = require("fs");
const vConsolePlugin = require("vconsole-webpack-plugin");
function resolve(p) {
  const res = path.resolve(__dirname, p);
  return res;
}

function getExternals( //获得放置在cdn上库的Externals配置（文件正则匹配、全局变量别名，发布的资源包地址）
  arr = [
    { key: "Vue", modules: "vue" },
    "axios",
    { key: "vueRouter", modules: "vue-router" },
    "vuex"
  ]
) {
  const obj = {
    reg: "",
    externals: {},
    path: "http://pm4wqd1x0.bkt.clouddn.com/library/js/index.46100335.js"
  };
  function getModules(e, isKey = false) {
    if (typeof e == "object") {
      if (!isKey) {
        return e.modules;
      } else {
        return e.key;
      }
    } else {
      return e;
    }
  }
  var reg = `[\\/]node_modules[\\/](${arr.reduce((a, b, index) => {
    //拼接正则
    if (index == 1) {
      return `(${getModules(a)}$)|(${getModules(b)}$)`;
    } else {
      const str = `${getModules(a)} | (${getModules(b)}$)`;
      return str;
    }
  })})`;
  obj.reg = new RegExp(reg);
  for (let key in arr) {
    obj.externals[getModules(arr[key])] = `library.${getModules(
      arr[key],
      true
    )}`;
  }
  return obj;
}
const externals = getExternals();

function getPath(p = "demo") {
  //获得入口文件，和模板地址
  const res = {
    entry: "",
    template: ""
  };
  res.entry = resolve(`src/${p}/main.js`);
  res.template = resolve(`src/${p}/index.html`);
  return res;
}
const qiniu = require("./publicUtil/qiniuPlugin"); // 七牛云
const markExternals = require("./publicUtil/markExternals"); //标记依赖包的hash值
const qiniuPlugin = new qiniu({
  accessKey: "3DOo0aOowbfuHWXtGlvYyaLLLzNZ6kuzPaQPvFxK",
  secretKey: "bWNFh1rp8zLayGfFkWEZXvXVCDpt7wOl6jNOuNkC",
  bucket: "majia-fun",
  path: `${process.env.ENV_file}/`
});
const publicPath = //输出地址
  process.env.NODE_ENV === "development"
    ? ""
    : `http://pm4wqd1x0.bkt.clouddn.com/${process.env.ENV_file}/`;
require("./publicUtil/changeJsConfig"); //自动加载Jsconfig,增加vscode文件跳转
module.exports = {
  devServer: {
    contentBase: resolve(`../dist/${process.env.ENV_file}`),
    hot: true,
    //https: true,
    proxy: {
      "/marketing": {
        target: "http://10.30.3.100:9000",
        // secure: false,
        changeOrigin: true
        // pathRewrite: {
        //     '^/marketing': ''
        // }
      }
    }
  },
  chainWebpack: config => {
    if (
      process.env.ENV_file === "library" &&
      process.env.NODE_ENV == "production"
    ) {
      config.output.libraryTarget("umd");
      config.output.library("library");
      config.plugin("markExternals").use(new markExternals(externals));
    }
    if (process.env.NODE_ENV == "production") {
      config.plugin("qiniu").use(qiniuPlugin);
    }
    config.plugin("html-index").tap(e => {
      //插槽赋值的变量
      e[0].VRA = externals.path;
      return e;
    });
    config.plugin("vConsole").use(
      new vConsolePlugin({
        filter: [], // 需要过滤的入口文件
        enable: process.env.BUILD_ENV !== "pro" // 发布代码前记得改回 false
      })
    );
    if (process.env.BUILD_ENV) {
      config.plugin("define").tap(arg => {
        arg[0]["process.env.BUILD_ENV"] = `"${process.env.BUILD_ENV}"`;
        console.log("BUILD_ENV=====", arg);
        return arg;
      });
    }
    config.module
      .rule("vue")
      .use("px2rem")
      .loader(resolve("./publicUtil/px2rem_loader.js"));
  },
  configureWebpack: config => {
    if (
      process.env.ENV_file === "library" &&
      process.env.NODE_ENV == "production"
    ) {
      config.optimization.splitChunks = false;
    }
    if (
      process.env.NODE_ENV == "production" &&
      process.env.ENV_file !== "library"
    ) {
      config.externals = externals.externals;
      const terserWebpackPlugin = config.optimization.minimizer[0];
      //terserWebpackPlugin.options.test = /a.js$/;
      terserWebpackPlugin.options.terserOptions.compress.drop_console = true; //关闭生产的console
      // const splitChunksWebpackPlugin = config.optimization.splitChunks;
      // splitChunksWebpackPlugin.cacheGroups["VRA"] = {
      //   //axios vue lib-flexible打到一起
      //   name: "VRA",
      //   test: externals.reg,
      //   //test: /[\\/]node_modules[\\/]((vue$)|axios|vuex)/,
      //   minSize: 10,
      //   minChunks: 1,
      //   maxInitialRequests: 3,
      //   maxAsyncRequests: 5,
      //   priority: 10, //优先级
      //   chunks: "all"
      // };
    }
    config.resolve.alias["@"] = resolve(`./src/${process.env.ENV_file}`);
    config.resolve.alias["=_="] = resolve(`./publicUtil`);
    fs.writeFileSync("testConfig.json", JSON.stringify(config));
  },

  pages: {
    index: {
      ...getPath(process.env.ENV_file),
      chunks: ["VRA", "chunk-vendors", "chunk-common", "index"]
    }
  },
  publicPath: publicPath,
  outputDir: `dist/${process.env.ENV_file}`
};

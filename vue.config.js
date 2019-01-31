const path = require("path");
const fs = require("fs");
function resolve(p) {
  const res = path.resolve(__dirname, p);
  return res;
}
function getPath(p = "demo") {
  const res = {
    entry: "",
    template: ""
  };
  res.entry = resolve(`src/${p}/main.js`);
  res.template = resolve(`src/${p}/index.html`);
  return res;
}
const qiniu = require("./publicUtil/qiniuPlugin");
const qiniuPlugin = new qiniu({
  accessKey: "3DOo0aOowbfuHWXtGlvYyaLLLzNZ6kuzPaQPvFxK",
  secretKey: "bWNFh1rp8zLayGfFkWEZXvXVCDpt7wOl6jNOuNkC",
  bucket: "majia-fun",
  path: `${process.env.ENV_file}/`
});
const publicPath =
  process.env.NODE_ENV === "development"
    ? ""
    : `https://pm4wqd1x0.bkt.clouddn.com/${process.env.ENV_file}/`;
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
    if(process.env.ENV_file==='library'&&process.env.NODE_ENV == "production"){
      config.output.libraryTarget('umd')
      config.output.library('library')
    }
    config.module
      .rule("vue")
      .use("px2rem")
      .loader(resolve("./publicUtil/px2rem_loader.js"));
    if (process.env.NODE_ENV == "production") {
      config.plugin("qqiniu").use(qiniuPlugin);
    }
  },
  configureWebpack: config => {
    config.resolve.alias["@"] = resolve(`./src/${process.env.ENV_file}`);
    config.resolve.alias["=_="] = resolve(`./publicUtil`);
    config.optimization.splitChunks=false
    
    const terserWebpackPlugin = config.optimization.minimizer[0];
    terserWebpackPlugin.options.test = /a.js$/
    if (process.env.NODE_ENV == "production" &&process.env.ENV_file!=='library') {
     
      // ;
      terserWebpackPlugin.options.terserOptions.compress.drop_console = true; //关闭生产的console
      const splitChunksWebpackPlugin = config.optimization.splitChunks;
      splitChunksWebpackPlugin.cacheGroups.VRA = {
        //axios vue lib-flexible打到一起
        name: "VRA",
        test: /[\\/]node_modules[\\/](vue|axios|lib-flexible)/,
        minSize: 10,
        minChunks: 1,
        maxInitialRequests: 3,
        maxAsyncRequests: 5,
        priority: 10, //优先级
        chunks: "all"
      };
    }
    fs.writeFileSync("test-config.json", JSON.stringify(config));
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

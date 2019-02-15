const fs = require("fs");
const path = require("path");

function resolve(p) {
  const res = path.resolve(__dirname, p);
  return res;
}
const congig = {
  compilerOptions: {
    baseUrl: resolve("../"),
    paths: {
      "@/*": [`src/${process.env.ENV_file}/*`],
      "=_=/*": ["publicUtil/*"]
    }
  },
  exclude: ["dist", "node_modules", "bower_components"]
};
fs.writeFileSync(resolve("../jsconfig.json"), JSON.stringify(congig));

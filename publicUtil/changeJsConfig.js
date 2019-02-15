const fs = require("fs");
const path = require("path");

function resolve(p) {
  const res = path.resolve(__dirname, p);
  return res;
}
fs.writeFileSync(
  resolve("../jsconfig.json"),
  JSON.stringify({
    compilerOptions: {
      baseUrl: resolve("../"),
      paths: {
        "@/*": [`src/${process.env.ENV_file}/*`],
        "=_=/*": ["publicUtil/*"]
      }
    },
    exclude: ["dist"]
  })
);

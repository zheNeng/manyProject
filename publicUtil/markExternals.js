const fs = require('fs')
const path = require('path')
function resolve(p) {
  const res = path.resolve(__dirname, p);
  return res;
}
class MarkExternalsPlugin {
  constructor(externals) {
    this.externals = externals
  }
  apply(compiler) {
    const that =this
    function markExternals(compilation, callback) {
      const str = fs.readdirSync(resolve('../dist/library/js')).filter(e => {
        return e.indexOf('map') < 0
      }).join(',')
      fs.appendFileSync(resolve("../markExternals.js"), `
      ${Object.keys(that.externals.externals).join(',')} ${new Date().toString()} ${str}`)
      callback()
    }
    if (compiler.hooks) {
      compiler.hooks.afterEmit.tapAsync("markExternalsPlugin", markExternals);
    }
    // For webpack < 4
    else {
      compiler.plugin("after-emit", markExternals);
    }

  }
}
module.exports = MarkExternalsPlugin;
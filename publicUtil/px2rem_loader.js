const path = require("path");
function resolve(p) {
  const res = path.resolve(__dirname, p);
  return res;
}
/* eslint-disable */
module.exports = function(source) {
  var reg = /(\<style)((.|\n)+?)(style\>)/g;
  var res = source.match(reg);
  if (res&&res[0].match(`lang=('|")sty`)) {
    res = res[0].split(">");
    const path = `@import "~${resolve("./px2rem.stylus")}"`;
    res[0] = `${res[0]}>
    ${path}`;
    res = source.substr(0, source.indexOf("<style")) + res[0] + res[1] + ">";
  }else{
    res=source
  }
  return res;
};

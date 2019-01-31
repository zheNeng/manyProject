(function() {
  window._laq = window._laq || [];
  var la = document.createElement("script");
  la.type = "text/javascript";
  la.async = true;
  la.src = "https://analytics.xunliandata.com/la.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(la, s);
})();
import "lib-flexible";
import "./main.stylus";
import FastClick from "fastclick";
FastClick.attach(document.body);
export function sendLaq(a = "visit", b = "page-type", c = "review-auth-page") {
  console.log("sendLaq", a, b, c);
  window._laq.push(["send", a, b, c]);
}
export function setLaq(e = "10702df0c6f6457af9e6279b9b026e23") {
  window._laq.push(["_setAccount", e]);
}

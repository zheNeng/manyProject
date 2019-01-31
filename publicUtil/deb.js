function isPromise(obj) {
  const res =
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function";
  return res;
}

export function deb(fn, type = "promise", time = 1000) {
  // fn是一个函数,返回promise
  var lock = false;
  if (type === "promise") {
    return (event, params) => {
      if (!lock) {
        lock = true;
        var f = fn(params);
        if (isPromise(f)) {
          f.then(() => {
            console.log("then");
            lock = false;
          });
        } else {
          setTimeout(() => {
            lock = false;
          }, time);
        }
      } else {
        console.log("锁住了");
      }
    };
  } else {
    // 防抖
    return e => {
      if (lock) {
        clearTimeout(lock);
      }
      lock = setTimeout(() => {
        fn(e);
      }, time);
    };
  }
}

// function testP() {
//   return new Promise(res => {
//     console.log("testpPromise");
//     setTimeout(res, 0);
//     res(123);
//   });
// }
// var b = deb(testP);
// for (let i = 0; i < 10; i++) {
//   setTimeout(b, i * 50);//测试代码，为什么这里会锁住，因为for是同步的,then是异步的
// }

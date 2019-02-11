# many-page-vue
  1. rem适配

    * 引入 lib-flexible + stylus-px2rem + px2rem_loader

  2. 新建项目

    * 在src文件夹下新建文件夹,index.html是模板文件,main.js是入口文件

    * 常规Vue文件接口，参照demo文件

  3. 别名

    * 增加 =_= 指向根路径的publicUtil

  4. 七牛云插件
  5. 公共工具库

    * 获得url中的参数，包含#前后的

    * 防止重复触发的函数(必须resolve)

    * 支付宝微信参数拍平

    * 公共埋点函数

    * 判断当前浏览器环境

  6. UI基础组件(等待，待开发)

    * loading

    * toast

    * dialog

    * row/cell

  7.library组件库开发

    * 在src/library目录下,此包会被输出到dist的library文件下

    * 该配置，主要用来上传公共组件库

    * 在其他项目中使用cdn加载公共依赖包，减少chunk体积。

    * webpakc中的externals配置
        
        * 项目需要先跑一遍npm run build-library上传library至七牛云

        * 在npm run build-demo,其中vue vuex axios vuerouter会被打包至公共依赖

        * 目前公共的依赖的命名还没有自动捕捉，不同机器的hash签名，可能会有区别，所以最好手动添加依赖包地址

        * markExternals.js用来记录每次Build-library的hash值


    * template模板自定义一下插槽
    
    

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

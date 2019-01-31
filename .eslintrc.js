module.exports = {
  root: true,
  env: {
    node: true,
    browser:true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": 0,
    "no-debugger": 0,
    "indent": ["error", 2],
    "no-multiple-empty-lines": [1, {
      "max": 1
    }], //空行最多不能超过2行
    // "space-before-function-paren": 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "eqeqeq": [2, 'always'], // 要求使用 === 和 !==
    "vue/max-attributes-per-line": ["error", { // 多个特性的元素应该分多行撰写
      "singleline": 10,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "prettier/prettier": "off"
  }
};

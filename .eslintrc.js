module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "prettier/prettier": [
      "off",
      {
        endOfLine: "auto"
      }
    ],
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    "vue/no-unused-components": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};

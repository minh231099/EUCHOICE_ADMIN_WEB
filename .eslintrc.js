module.exports = {
  parser: "@babel/eslint-parser",
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
    ecmaVersion: 2018,
    sourceType: "module",
    babelOptions: {
      parserOpts: {
        plugins: ["jsx"]
      }
    }
  },
  extends: ["plugin:react/recommended", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "no-unused-vars": "error",
    "class-methods-use-this": 0,
    "no-nested-ternary": 0,
    "prefer-destructuring": 0,
    "react/destructuring-assignment": 0,
    "react/sort-comp": 0,
    "react/prop-types": 0,
    "react/require-default-props": "error",
    "react/no-unused-prop-types": "error",
    "react/no-unused-state": "error",
    "react/jsx-curly-brace-presence": 0,
    "react/jsx-filename-extension": 0,
    "react/forbid-prop-types": 0,
    "react/no-access-state-in-setstate": 0,
    "react/prefer-stateless-function": 0,
    "react/no-array-index-key": "error",
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "import/prefer-default-export": 0,
    camelcase: 0,
    "no-restricted-properties": 0,
    "no-param-reassign": "error",
    "no-script-url": 0,
    "no-plusplus": 0,
    "no-useless-escape": 0,
    "no-shadow": 0,
    "no-undef": 2,
    "max-len": ["warn", 240],
    indent: "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    'prettier/prettier': 0,
    // "prettier/prettier": [
    //   "error",
    //   {
    //     endOfLine: "auto",
    //   },
    // ],
  },
};

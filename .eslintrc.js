module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: [
    'vue'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'generator-star-spacing': 'off',
    "no-mixed-spaces-and-tabs": [
      2,
      false
    ],
    "no-multi-spaces": 1,
    quotes: 0,
    "space-before-function-paren": 0,
    indent: 0,
    "prefer-const": 0,
    "comma-spacing": 0,
    "eol-last": 0,
    "no-trailing-spaces": 0,
    "no-tabs": 0,
    "object-curly-spacing": 0,
    semi: 0,
    "no-unreachable": 0,
    "no-unneeded-ternary": 0,
    "no-undef": 0,
    "promise/param-names": 0,
    "no-new": "off"
  }
}

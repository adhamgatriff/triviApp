module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint", 
  "globals": { "fetch": false,"WebSocket": false },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "global-require": "off",
    "linebreak-style": ["off", "unix"],
    "no-bitwise": ["error", { "allow": ["~"] }],
    "react/prop-types": "off",
    "react/jsx-no-bind": "off",
    "no-use-before-define": "off",
    "function-paren-newline": "off",
    "react/no-array-index-key": "off",
    "max-len": ["error", { "code": 200 }],
    "react/no-unused-prop-types": "off",
  },
  "env": {
    "jest": true
  }
};
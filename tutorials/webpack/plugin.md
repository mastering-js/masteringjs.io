Webpack's `DefinePlugin()` function lets you replace a given token in the compiled code with another token.
A common use case is using it to define environment variables when you cannot use an `.env` file directly.

```javascript
'use strict';

const webpack = require('webpack');
require('dotenv').config();

const compiler = webpack({
  entry: {
    app: `${__dirname}/src/main.js`
  },
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      __KEY: `'${process.env.KEY}'`
    })
  ]
});
```

Before compile: 

```javascript
const key = __KEY;
export default (text = "Hello, Webpack!") => {
    const element = document.createElement("h1");
  
    element.innerHTML = text + key;
  
    return element;
};
```

After compile: 

```javascript
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/component.js
const key = '123456788901234134fagafga134134adf';
/* harmony default export */ const component = ((text = "Hello, Webpack!") => {
    const element = document.createElement("h1");
  
    element.innerHTML = text + key;
  
    return element;
  });
;

/******/ })()
;
```



## Switching Environments

Another useful trick is using `DefinePlugin()` to switch between development and production server URLs.
Simply flip the boolean whenever you want to switch.

```javascript
new Webpack.DefinePlugin({
  URL: webpack.DefinePlugin.runtimeValue(function(module, key, version) {
    if(process.env.NODE_ENV === 'development') {
      return 'localhost:3000';
    }
    if(process.env.NODE_ENV === 'production') {
      return 'https://www.masteringjs.io';
    }
  }, true);
});
```


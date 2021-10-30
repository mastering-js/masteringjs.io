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
      __KEY: `'${process.env.KEY}'` // Note that the raw string is wrapped in quotes
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
For example, suppose you wanted to switch what server your frontend makes requests to depending on NODE_ENV.
Here's how you can do that using `DefinePlugin()`:

```javascript
new Webpack.DefinePlugin({
  URL: process.env.NODE_ENV === 'development' ? `'http://localhost:3000'` : `'https://api.myapp.com'`;
});
```


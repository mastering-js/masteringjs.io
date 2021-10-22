Webpack's `DefinePlugin()` function lets you replace a given token in the compiled code with another token.
A common use case is using it to define environment variables when you cannot use an `.env` file directly.

```javascript
'use strict';

const webpack = require('webpack');

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

```javascript
// test.js

const key = __KEY;
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


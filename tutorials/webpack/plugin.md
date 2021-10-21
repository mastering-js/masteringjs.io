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
  DEVELOPMENT: JSON.stringify(true);
  DEVELOPMENT_URL: JSON.stringify('localhost:3000');
  PRODUCTION_URL: JSON.stringigy('https://masteringjs.io');
});
```

```javascript
if (DEVELOPMENT) {
  const url = DEVELOPMENT_URL
} else {
  const url = PRODUCTION_URL
}
```

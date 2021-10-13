Webpack's `DefinePlugin()` function lets you replace a given token in the compiled code with another token.
A common use case is using it to define environment variables when you cannot use an `.env` file directly.

```javascript
'use strict';

require('dotenv').config();

const fs = require('fs');
const webpack = require('webpack');

const compiler = webpack({
  mode: 'development',
  entry: {
    app: `${__dirname}/src/main.js`
  },
  target: 'web',
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js'
  },
  optimization: {
    minimize: false
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

const key = __Key;
```

## Switching Environments

Another useful trick is using `DefinePlugin()` to switch between development and production server URLs.

```javascript
new Webpack.DefinePlugin({
  URL: webpack.DefinePlugin.runtimeValue('localhost:3000', {
    missingDependencies: ['production.js']
  }),
  URL: webpack.DefinePlugin.runtimeValue('https://www.website.com', {
    missingDependencies: ['test.js']
  })
});
```

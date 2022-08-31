By combining Vue and Webpack, you can use HTML files for your Vue templates.
In the `modules.rules[]` property, you must insert the following object into the array:

```javascript
modules: {
  rules: [
    {
      test: /\.html$/i,
      type: 'asset/source'
    }
  ]
}
```

For example, below is a Webpack config we use for one of our projects.

```javascript
'use strict';

const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: `${__dirname}/src/index.js`
  },
  target: 'web',
  optimization: {
    minimize: false
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js'
  },
  plugins: [
    // ...
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        type: 'asset/source'
      },
      {
        test: /\.css$/i,
        type: 'asset/source'
      }
    ]
  }
};
```

On Webpack 5, setting the type to `asset/source` means that, if you `import` or `require()` a `.html` file, you get back the contents of the file as a string.
This works great for Vue's `template` property.
On older versions of Webpack, you would use `raw-loader` instead.

```javascript
const template = require('./template.html');

const app = Vue.createApp();

app.component('my-component', {
  template: template
});
```

## Node

You can also import HTML files as strings in Node.js for [server side rendering](https://masteringjs.io/tutorials/vue/ssr).
Here's how you can make Node's `require()` function return HTML files as strings.

```javascript
const fs = require('fs');

require.extensions['.html'] = function(module, filename) {
  module.exports = fs.readFileSync(require.resolve(filename), 'utf8');
};

const template = require('./template.html');
typeof template; // 'string'
```


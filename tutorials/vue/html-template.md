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

On Webpack 5, setting the type to `asset/source` exports the source code of the asset, i.e. the html.
On older versions of webpack, you would use `raw-loader`.

## Node

This technique is not restricted to only Vue and Webpack.
In Node, you can achieve the same thing by combining `require.resolve` and `readFileSync`.

```javascript
const fs = require('fs');

fs.readFileSync(require.resolve('./test.txt'), 'ascii'); // the contents of test.txt
```


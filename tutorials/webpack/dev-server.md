[webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) is Webpack's officially supported CLI-based tool for starting a static server for your assets. While you [don't need any CLI tools to use Webpack](/tutorials/webpack/node), webpack-dev-server gives you a single command that starts a static server with built-in live reload.

Setup
-----

To run webpack-dev-server, you need to install [webpack](https://www.npmjs.com/package/webpack) **and** [webpack-cli](https://www.npmjs.com/package/webpack-cli) in addition to webpack-dev-server.

```
npm install webpack@4.x webpack-cli@3.x webpack-dev-server@3.x
```

Suppose you have an `index.js` file that uses [Axios](https://www.npmjs.com/package/axios) to make an HTTP request and display the result in an `<h1>`.

```javascript
const axios = require('axios');

axios.get('http://httpbin.org/get?answer=42').
  then(res => {
    console.log(res.data.args.answer); // 42
    document.getElementById('content').innerHTML = `<h1>${res.data.args.answer}</h1>`;
  });
```

The `index.html` file will load a minified version of `index.js`, `index.min.js`, that Webpack will build. Below is the `index.html` file.

```html
<html>
  <head>
    <script type="text/javascript" src="/index.min.js"></script>
  </head>
  <body>
    <div id="content"></div>
  </body>
</html>
```

For this example, you'll need one more file: the `webpack.config.js` that tells Webpack how to compile your project. The below `webpack.config.js` is sufficient to compile `index.js` into an `index.min.js` bundle that contains Axios.

```javascript
module.exports = {
  mode: 'development',
  entry: './index.js',
  optimization: {
    minimize: false
  },
  target: 'web',
  output: {
    path: __dirname, 
    filename: 'index.min.js'
  }
};
```

Running the Dev Server
----------------------

To run webpack-dev-server, run the following command.

```
./node_modules/.bin/webpack-dev-server
```

Once you run webpack-dev-server, you should see the below output.

<img class="inline-image" src="https://i.imgur.com/NLYDUnU.png">

Live reload means that changes you make in your JavaScript file propagate to the browser without you needing to refresh the page. For example, if you change 'answer' from 42 to 43 in `index.js`, Webpack automatically recompiles `index.js` and the browser automatically reloads without you having to do anything.

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/9049c4d0644f44809cc1d47e25361119" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
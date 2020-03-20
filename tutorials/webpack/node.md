Most developers use Webpack via the [Webpack CLI](https://www.npmjs.com/package/webpack-cli), but Webpack also has an [excellent Node.js API](https://webpack.js.org/api/node/). That means you can run Webpack from your Node.js scripts, like an [Express](http://expressjs.com/) server, without a task runner.

For example, suppose you have the below [`webpack.config.js` file](/tutorials/webpack/config). It takes a file `app.js`, and compiles it into `./bin/app.min.js`.

```javascript
module.exports = {
  mode: 'development',
  entry: {
    app: `${__dirname}/app.js`
  },
  target: 'web',
  output: {
    path: `${__dirname}/bin`,
    filename: '[name].min.js'
  }
};
```

Normally, you would run `webpack` from the command line. But you can also `require('webpack')` and run this config script from Node.js:

```javascript
[require:Webpack.*Node API]
```

You can also [run `webpack --watch` from Node.js](/tutorials/webpack/programmatic-watch).

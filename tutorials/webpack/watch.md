Usually when you run Webpack in development, you want to run it in [watch mode](https://webpack.js.org/configuration/watch/). This configures Webpack to watch files in your project for changes, and recompile whenever a file changes. In other words, you don't have to manually re-run Webpack every time.

For example, suppose you have the below `webpack.config.js` file. It takes a file `app.js`, and compiles it into `./bin/app.min.js`.

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

Let's say `app.js` contains a simple `console.log()`:

```javascript
console.log('Hello, world');
```

Now, run `./node_modules/.bin/webpack --watch` and you should see the below output. Make sure you have both Webpack and [webpack CLI](https://www.npmjs.com/package/webpack-cli) installed.

<img src="https://i.imgur.com/h787x91.png">

Say you modify `app.js` to have a slightly different `console.log()` message:

```javascript
console.log('Hello, world!');
```

Webpack will detect the change and recompile:

<img src="https://i.imgur.com/l44K8uF.png">

Other Ways to Enable Watch Mode
-------------------------------

You can also enable watch mode from your Webpack config file:

```javascript
module.exports = {
  mode: 'development',
  watch: true, // Enable watch mode
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

However, this approach is typically a bad choice because you don't want to run Webpack in watch mode if you're compiling in a CI/CD tool or a git commit hook. You should enable watch mode using `--watch` unless you're certain you never want to run Webpack without `watch`.
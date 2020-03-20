If you have a Node.js server that serves content using [express-static](http://npmjs.com/package/express-static) and you compile your content with [Webpack](https://www.npmjs.com/package/webpack), you don't have to run both `npm run dev` and `webpack --watch`. Your `npm run dev` script can run `webpack --watch` for you, no CLI required, using [Webpack's Node API](https://webpack.js.org/api/node/#compiler-instance).

Here's an example of importing Webpack in a Node.js script and watching a file for changes. You can pass a [webpack config](/tutorials/webpack/config) to the `webpack()` function as shown below.

```javascript
[require:Webpack.*watch.*basic example]
```

Because of Node.js' event loop, you don't explicitly have to create new threads. Your Node process can be both an HTTP server and a Webpack compiler. Here's an example of a Node.js script:

```javascript
[require:Webpack.*watch.*Express]
```

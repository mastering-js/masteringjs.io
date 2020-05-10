[Webpack's CSS Loader](https://webpack.js.org/loaders/css-loader/)
handles bundling CSS assets. Using the [css-loader npm module](https://www.npmjs.com/package/css-loader), you can import CSS as a plain string in your JavaScript.

For example, given the below `app.js` file:

```javascript
const css = require('./style.css').toString();
console.log(css);
```

And the below `style.css` file:

```
h1 { color: green; }
```

The below Webpack config will compile `app.js` into a bundle that prints
`h1 { color: green; }` when it is run, either in Node.js or in the browser.

```javascript
module.exports = {
  entry: `${__dirname}/example/app.js`,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.css', '.js']
  },
  output: {
    filename: 'main.js',
    path: `${__dirname}/example/dist`
  }
};
```

Why CSS Loader Matters
-------------------

Being able to load CSS as a string is neat, but typically not useful
on its own. That's why CSS Loader is usually used in conjunction with
other loaders, like [style-loader](https://www.npmjs.com/package/style-loader).
By default, style-loader inserts one `<style>` tag into the page's `<head>` for every
imported CSS file. So given the below `app.js` file:

```javascript
require('./style.css');

document.querySelector('body').innerHTML = '<h1>Hello, World</h1>';
```

And the below `webpack.config.js`:

```javascript
[require:Webpack CSS Loader works correctly$]
```

You get a green "Hello, World" with no `<style>` tags.

Using CSS loader to import styles is overkill for most apps, and
you normally shouldn't use it. CSS loader is often used to get
scoped styles, but [Vue already supports scoped CSS](https://vue-loader.vuejs.org/guide/scoped-css.html). So CSS loader can be useful
if you need scoped styles but can't use [Vue's single file components](/tutorials/vue/templates#single-file-components).

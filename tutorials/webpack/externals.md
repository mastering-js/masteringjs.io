[Webpack externals](https://webpack.js.org/configuration/externals/) tell
Webpack to exclude a certain import from the bundle. Often externals
are used to exclude imports that will be loaded via CDN.

For example, suppose you are implementing [server-side rendering with Vue and Express](/tutorials/vue/ssr), but your client-side code imports Vue
via a CDN. Suppose you have the below `component.js` file:

```javascript
const Vue = require('vue');

module.exports = Vue.component('hello', {
  props: ['name'],
  template: '<h1>Hello, {{name}}</h1>'
});
```

The above `component.js` works perfectly in Node.js with server-side
rendering. But what about using the above component with the below
`index.html` file?

```html
<html>
  <body>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
        
    <div id="content"></div>
    <script src="dist/component.min.js"></script>
    <script>
      new Vue({ template: '<hello name="World" />' }).
        mount(document.querySelector('#content'));
    </script>
  </body>
</html>
```

The below `webpack.config.js` adds 'vue' as an external, meaning Webpack
won't bundle Vue. Instead, when `component.js` calls `require('vue')`,
Webpack will instead return `global.Vue`.

```javascript
module.exports = {
  entry: {
    component: `${__dirname}/component.js`
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].min.js'
  },
  target: 'web',
  externals: {
    // Stubs out `require('vue')` so it returns `global.Vue`
    vue: 'Vue'
  }
};
```

Excluding Node.js Polyfills
---------------------------

Another use case for externals is browser APIs that require a polyfill
in Node.js, like [FormData](/tutorials/fundamentals/formdata). If
you're testing code that requires `FormData` in Node.js, you need
to use a polyfill like the [form-data npm module](https://www.npmjs.com/package/form-data).

```javascript
[require:Axios FormData works in node$]
```

Since `FormData` is a browser API, you don't need to bundle it when
compiling the above code. So you can use the below Webpack config:

```javascript
module.exports = {
  entry: {
    http: `${__dirname}/http.js`
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].min.js'
  },
  target: 'web',
  externals: {
    // Stubs out `require('form-data')` so it returns `global.FormData`
    'form-data': 'FormData'
  }
};
```
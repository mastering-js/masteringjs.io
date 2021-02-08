Vue global components are great for small to medium sized projects but if your project becomes more complex,
problems begin to arise like:

- Every component name must be unique
- No CSS support in the components
- Restricted to HTML and JavaScript, instead of preprocessors like Pug or Babel
- String templates lack syntax highlighting as well as requiring slashes for multiline HTML

However, Vue.js's single-file components solve all these problems! A single-file component has the extension `.vue`,
which is made possible by a module bundler like Webpack or Browserify. A `.vue` file can have many top-level language blocks
as well as your own custom blocks, but the three core blocks are `<template>`, `<script>`, and `<style>`.
When making a component, you do not need all three of these in the `.vue` file so you can omit a language block if
your component does not need it as part of its function. An important note about the structure of `.vue` files is that
`<template>` and `<script>` may only appear once while `<style>` and a custom block you implement may appear multiple times
should the situation arise. You can specify in the `<style>` tag whether you want the css to be local to the component.
If you choose local (scoped) the parent component's style will not leak into that component.
Here is an example of a simple `.vue` file:

```javascript
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>
<style scoped>
.example {
  color: red;
}
</style>

<custom>
Here is an example of a custom langue block.
</custom>
```

Another step to take when setting up your project work with single-file components is to configure the module bundler to understand
what a `.vue` file is and what to do with it. You will need the `@vue/compiler-sfc` package as well as the `vue-loader` package.
Below is an example of setting up the part of module bundler where you would tell it how to handle `.vue` files:

```javascript
const { VueLoaderPlugin } = require('vue-loader');
const devtools = require('./lib');
const mongoose = require('mongoose');
const webpack = require('webpack');
const config = {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
  },
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
};
const compiler = webpack(config);
```

**Note:** You also must set up the module bundler to handle the `<style>` tag in your single-file components.

[JavaScript-based Vue components]/tutorials/vue/components) are great for small to medium sized projects but if your project becomes more complex,
problems begin to arise like:

- Every component name must be unique
- No CSS support in the components
- String [templates](/tutorials/vue/templates) lack syntax highlighting as well as requiring slashes for multiline HTML

However, Vue.js's single-file components solve all these problems! A single-file component has the extension `.vue`,
which means you need a compiler like [Webpack](/webpack) or Browserify. A `.vue` file can have many top-level language blocks
as well as your own custom blocks, but the three core blocks are `<template>`, `<script>`, and `<style>`.
When making a component, the three core blocks are optional. An important note about the structure of `.vue` files is that
`<template>` and `<script>` may only appear once while `<style>` and a custom block you implement may appear multiple times. You can specify in the `<style>` tag whether you want the css to be local to the component.
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
Here is an example of a custom language block.
</custom>
```

Another step to take when setting up your project to work with single-file components is to configure webpack to understand
what a `.vue` file is and what to do with it. You will need the `@vue/compiler-sfc` package as well as the `vue-loader` package.
Below is an example of configuring webpack to handle `.vue` files:

```javascript
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
```

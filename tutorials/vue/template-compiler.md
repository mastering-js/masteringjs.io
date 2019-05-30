The [vue-template-compiler](https://www.npmjs.com/package/vue-template-compiler) module is a powerful tool for compiling Vue templates and [single file components](https://vuejs.org/v2/guide/single-file-components.html) into JavaScript. Most developers don't use vue-template-compiler directly. But bundler tools like [vue-loader for Webpack](https://www.npmjs.com/package/vue-loader) use vue-template-compiler to do the heavy lifting of actually compiling `.vue` files.

The vue-template-compiler has two primary functions: converting templates to [`render()` functions](https://vuejs.org/v2/guide/render-function.html) and [parsing single file componens](https://masteringjs.io/tutorials/vue/templates#single-file-components).

Compile Template to Render Function
-----------------------------------

A Vue template is just a plain string. Vue-template-compiler's `compile()` function converts a template string that you can use as a `render()` function for your components.

```javascript
[require:Vue.*template compiler.*compiling a string]
```

Parsing a `.vue` File
---------------------

Vue-template-compiler has a separate function called [`parseComponent()`](https://www.npmjs.com/package/vue-template-compiler#compilerparsecomponentfile-options) that helps you compile single file components (`.vue` files) into JavaScript.

```javascript
[require:Vue.*templates.*template compiler]
```
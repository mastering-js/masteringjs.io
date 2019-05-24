There are [numerous ways to define templates in Vue](https://sebastiandedeyne.com/dealing-with-templates-in-vue-20/), but many of them don't work so well in production. [The docs even recommend avoiding some of them](https://vuejs.org/v2/guide/components-edge-cases.html#X-Templates). Here's 3 ways to define templates for Vue components that work well with server-side rendering:

String Templates
----------------

You can define a template in vanilla JavaScript as a [string literal or template literal](https://medium.com/js-dojo/7-ways-to-define-a-component-template-in-vuejs-c04e0c72900d). This approach means a component's HTML and JavaScript stay in the same file, which is generally considered a positive. The downside is that you don't get HTML syntax highlighting.

```javascript
[require:Vue.*templates.*inline]
```

You can use this approach but use a function to load the string. This splits HTML and JavaScript into separate files to get better syntax highlighting and separation of concerns.

```javascript
[require:Vue.*templates.*loader]
```

Inline Templates
----------------

Another approach that is similar to string templates is inline templates. Instead of defining an HTML template for every component, you define all your component HTML in one top-level template. This is similar to [slots](http://localhost:5000/tutorials/vue/slots).

```javascript
[require:Vue.*templates.*inline]
```

The advantage of this approach is you can define all your app's HTML in one template, but still break up business logic into separate components.

Single File Components
----------------------

[Single file components](https://vuejs.org/v2/guide/single-file-components.html) give you the best of both worlds between putting your HTML template in a separate file and putting your HTML template as a string literal. Like string literals, everything about a component is in one place. Like separate HTML files, you can get decent syntax highlighting.

The tradeoff is that single file components are typically declared in a separate `.vue` file with its own special syntax. Below is an example of `.vue` syntax. Depending on your IDE, you may need to install an additional package for `.vue` file syntax highlighting.

```
<template>
  <h1>{{message}}</h1>
</template>

<script>
  module.exports = {
    data: () => ({ message: 'Hello World' })
  };
</script>
```

So in order to compile your component, you need a build step. There are numerous tools that can do this for you, like [the Vueify transform for Browserify](https://www.npmjs.com/package/vueify) and [vue-loader for Webpack](https://www.npmjs.com/package/vue-loader). Under the hood, both of these tools use [`vue-template-compiler`](https://www.npmjs.com/package/vue-template-compiler). Here's an example of using vue-template-compiler directly to compile Vue syntax into a component:

```javascript
[require:Vue.*templates.*template compiler]
```
You can load Vue [from a CDN using a `script` tag](https://vuejs.org/v2/guide/installation.html#CDN).
For example, here's how you can load the latest version of Vue 2.x:

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.x"></script>
```

Once you load Vue via CDN, `Vue` will be a global variable that you can use normally.
For example, the below is a standalone HTML page that loads Vue and adds interactivity.

```html
<div id="content"></div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.x"></script>
<script>
  new Vue({
    data: () => ({ message: 'Row' }),
    template: `
    <div>
      <h1>{{message}} your boat</h1>
      <button v-on:click="message += ' row'">Add</button>
    </div>
    `
  }).$mount('#content');
</script>
```

Below is a live example.

<div id="content"></div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.x"></script>
<script>
  new Vue({
    data: () => ({ message: 'Row' }),
    template: `
    <div style="border: 1px solid #ddd; padding: 8px">
      <h1>{{message}} your boat</h1>
      <button v-on:click="message += ' row'">Add</button>
    </div>
    `
  }).$mount('#content');
</script>

If you include Vue in your JavaScript files using `const Vue = require('vue')` or `import Vue from 'vue'`, you can still load Vue from a CDN if you define Vue as a [Webpack external](/tutorials/webpack/externals).

When to Use CDN versus Bundling
------------------------------

There are several advantages to loading Vue via a CDN as opposed to bundling it yourself.
For one, the browser can cache Vue separately from your application, which can lead to better
performance if you update your app frequently but use the same version of Vue. For another,
your build step will be faster.

However, the Vue docs recommend using bundling rather than loading from a CDN for ["building large scale applications with Vue"](https://vuejs.org/v2/guide/installation.html#NPM). Here's a few reasons
why you might choose to bundle Vue with [Webpack](/webpack) rather than loading via CDN. The most
important reason is [single file components](/tutorials/vue/templates#single-file-components): you
need to include Vue in your build step to get SFC support.

However, if you don't need SFC support, you can probably get away with using a CDN. Even if you
need to `npm install vue` for [server side rendering](/tutorials/vue/ssr) or [testing in Node](/tutorials/vue/unit-testing), you can use [Webpack externals](/tutorials/webpack/externals) to
exclude Vue from your final Webpack bundle in favor of loading via CDN.
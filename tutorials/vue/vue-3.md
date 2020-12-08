[Vue 3 was released on September 18, 2020](https://github.com/vuejs/vue-next/releases/tag/v3.0.0). Vue 3
includes numerous improvements, including a more modular core, the [composition API](https://v3.vuejs.org/guide/composition-api-introduction.html), and numerous performance improvements.
However, even with these new improvements, it still feels like the [same old Vue that we know and love](https://www.getrevue.co/profile/masteringjs/issues/5-reasons-why-vue-is-better-than-react-247970),
just with a few new delightful surprises. Here's how you can get started.

Hello, Vue 3
------------

Like Vue 2.x, you can install Vue from [npm](http://thecodebarbarian.com/an-introduction-to-npm.html), or you can [load Vue from a CDN](/tutorials/vue/cdn). To install Vue 3 from npm, run:

```
npm install vue@3.x
```

You can also load Vue with a `<script>` tag from a CDN like [unpkg](https://unpkg.com/).

```
<script src="https://unpkg.com/vue@3.x"></script>
```

The basic JavaScript syntax of Vue hasn't changed much. The little
"row, row, row your boat" example that we used for Vue 2 works
in Vue 3, after a couple minor changes:

```html
<div id="content" style="border: 1px solid #ddd; padding: 1em"></div>

<script src="https://unpkg.com/vue@3.x"></script>
<script>
  Vue.createApp({
    data: () => ({ message: 'Row' }),
    template: `
    <div>
      <h1>{{message}} your boat</h1>
      <button v-on:click="message += ' row'">Add</button>
    </div>
    `
  }).mount('#content');
</script>
```

Below is a live example:

<div id="content" style="border: 1px solid #ddd; padding: 1em"></div>

<script src="https://unpkg.com/vue@3.x"></script>
<script>
  const app = Vue.createApp({
  template: '<counter></counter>'
});

app.component('counter', {
  template: `
    <div>
      <h1>{{article.title}}: {{article.pageViews}} Page Views</h1>
      <button v-on:click="++article.pageViews">Increment Page Views</button>
    </div>
  `,
  setup: function() {
    const article = Vue.reactive({ title: 'Vue 3 Reactivity', pageViews: 100 });
    return { article };
  }
});
app.mount('#content');
</script>

We needed to make 2 changes to make this app work in Vue 3:

1. Instead of exporting a class, Vue 3 exports a [POJO](/tutorials/fundamentals/pojo) for better integration with destructuring [`import` statements](/tutorials/node/import). So instead of calling `new Vue()`, you should use `Vue.createApp()`. Otherwise you'll get a `TypeError: Vue is not a constructor` error.
2. `$mount()` is now just `mount()`. This 1 character change is the result of a much more important change: [Vue 3 has a separate notion of an "app instance"](https://v3.vuejs.org/guide/migration/global-api.html#a-new-global-api-createapp). Unlike in Vue 2, where both your top-level `app` and your components were instances of the same class, Vue 3 has a separate notion of an app. That means there's no need to prefix `mount()` as `$mount()` to avoid conflicting with your `data` properties.

Server Side Rendering
---------------------

The number one reason why we are so bullish on Vue is Vue's versatility. Vue largely "just works"
in Node.js or in the browser; with vanilla HTML, SFC, or JSX; with `render()` functions or templates; with outputting vanilla HTML or mounted on a DOM. 

In Vue 2, you could take an existing Vue instance and [render to an HTML string in Node.js using `vue-server-renderer`](/tutorials/vue/ssr). With Vue 3, the syntax has changed slightly, but the general
idea is similar. Instead of `vue-server-renderer`, you should now use [`@vue/server-renderer`](https://preview.npmjs.com/package/@vue/server-renderer):

```
npm install vue@3.x @vue/server-renderer@3.x
```

The `@vue/server-renderer` package exports a `renderToString()` function that you can use to render
a Vue app:

```javascript
const { createSSRApp } = require('vue');
const { renderToString } = require('@vue/server-renderer');

const app = createSSRApp({
  data: () => ({ to: 'World' }),
  template: '<h1>Hello, {{to}}</h1>'
});

void async function main() {
  const html = await renderToString(app);
  console.log(html); // "<h1>Hello, World</h1>"
}();
```

Note that this example uses Vue 3's new `createSSRApp()` function, **not** `createApp()`. That is
Vue's recommended approach for server-side rendering, but it is not strictly necessary for [static sites](http://thecodebarbarian.com/using-vue-as-a-node-js-static-site-generator.html) because the major difference between `createApp()` and `createSSRApp()` is [support for client-side hydration](https://github.com/vuejs/vue-next/releases/tag/v3.0.0-alpha.5).

For example, the below script works identically to the above script, even though it uses `createApp()` rather than `createSSRApp()`.

```javascript
const { createApp } = require('vue');
const { renderToString } = require('@vue/server-renderer');

const app = createApp({
  data: () => ({ to: 'World' }),
  template: '<h1>Hello, {{to}}</h1>'
});

void async function main() {
  const html = await renderToString(app);
  console.log(html); // "<h1>Hello, World</h1>"
}();
```

Introducing the Composition API
-------------------------------

The Composition API is a fairly complex set of tools that makes it easier to reuse logic with Vue
components. The Composition API starts with the new [`setup()` function](https://v3.vuejs.org/guide/composition-api-setup.html) on components. The `setup()` function is the "entry point" for your
component.

For example, here's how you can create a "Hello, World" component in Vue 3:

```javascript
const app = createApp({
  data: () => ({ to: 'World' }),
  template: '<hello v-bind:to="to"></hello>'
});

app.component('hello', {
  props: ['to'],
  // "<h1>Hello, World</h1>"
  template: '<h1>Hello, {{to}}</h1>'
});
```

The `setup()` function lets you do all sorts of things that would require defining properties on the
Vue instance in Vue 2, like defining reactive properties or registering [lifecycle hooks](/tutorials/vue/lifecycle).

For example, you can add new properties that are accessible from your templates by returning an
object from the `setup()` function:

```javascript
const app = createApp({
  data: () => ({ to: 'World' }),
  template: '<hello v-bind:to="to"></hello>'
});

app.component('hello', {
  props: ['to'],
  // "<h1>Hello, WORLD</h1>"
  template: '<h1>Hello, {{toUpper}}</h1>',
  setup: function(props) {
    return { toUpper: props.to.toUpperCase() };
  }
});
```

The Vue global also has helper functions like `onMounted()` and `onErrorCaptured()` that let you
register lifecycle hooks from the `setup()` function. These functions don't overwrite existing
lifecycle hooks, which means you can easily define multiple hooks for the same component lifecycle event.

```javascript
const app = Vue.createApp({
  data: () => ({ to: 'World' }),
  template: '<hello v-bind:to="to"></hello>'
});

// Prints 'Mounted from component!' followed by 'Mounted from setup!'
app.component('hello', {
  props: ['to'],
  template: '<h1>Hello, {{to}}</h1>',
  mounted: function() {
    console.log('Mounted from component!');
  },
  setup: function(props) {
    Vue.onMounted(() => console.log('Mounted from setup!'));
    return {};
  }
});
```
The `mounted()` hook is the most commonly used [lifecycle hook](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks) in Vue. Vue calls the `mounted()` hook when your component is added to the DOM. It is most often used to [send an HTTP request to fetch data](https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html) that the component will then render.

For example, the below Vue component uses the `mounted()` hook to make an HTTP request to the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).

```javascript
[require:Vue axios basic example$]
```

With Async/Await
----------------

Notice that the above example uses an async function for the
`mounted` hook. Vue does **not** block rendering until the mounted
function is done running, so `mounted()` above runs concurrently
with `axios.get()`.

Unlike many other frameworks, Vue provides a mechanism for
handling errors in async functions. Vue calls a [global error handler](https://vuejs.org/v2/api/#errorHandler) whenever a lifecycle hook throws an error, whether the error was sync or async.

```javascript
Vue.config.errorHandler = function (err) {
  console.log(err.message); // "Oops"
};

new Vue({
  template: `<h1>Hello</h1>`,
  mounted: async function() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    throw new Error('Oops');
  }
}).$mount('#content');
```

Versus `created()`
--------------

Vue has another [lifecycle hook](/tutorials/vue/lifecycle) that is similar to `mounted()`:
the `created()` hook. Vue runs the `created()` hook when the component object is
created, **before** the component is mounted to the DOM.

The Vue docs recommend using the `mounted()` hook over the `created()` hook
for data fetching. This point is [often debated](https://www.digitalocean.com/community/tutorials/vuejs-component-lifecycle#mounting-dom-insertion). But there is
one key reason why Mastering JS recommends using `mounted()` for data fetching: because of
server-side rendering.

Vue calls the `created()` hook during server-side rendering, but **not**
the `mounted()` hook. So that's a point in favor of `created()`, right?

The problem comes from the fact that data fetching is almost always
asynchronous, and [Vue's server-side rendering](/tutorials/vue/ssr)
does **not** wait for async `created()` hooks to finish.

```javascript
[require:Vue lifecycle hooks created async$]

let data = await renderToString(app);
data; // Renders "answer is N/A"
```

On the other hand, it is easy to manually run the `mounted()` hook
when using server-side rendering.

```javascript
await app.$options.mounted[0].call(app);
let data = await renderToString(app);
data; // Renders "answer is 42"
```

Or, if you have a reference to the `mounted()` hook you registered,
you can just call it on the app:

```javascript
await mounted.call(app);
let data = await renderToString(app);
data; // Renders "answer is 42"
```

Or, you can write separate logic for fetching using server-side
rendering, like by calling the database directly rather than
going through HTTP. Using `mounted()` for data fetching gives
you more flexibility when using server-side rendering without
sacrificing any convenience.
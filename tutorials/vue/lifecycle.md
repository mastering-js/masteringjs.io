[Vue lifecycle hooks](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks) give you the opportunity to
run code whenever Vue performs a certain action on your component.
The hooks that Vue exposes for every component are:

- `beforeCreate`
- `created`
- `beforeMount`
- `mounted`
- `beforeUpdate`
- `updated`
- `beforeDestroy`
- `destroyed`

The above list is in order. So Vue always calls `beforeCreate` before
`created`, and in turn Vue calls `created` before `beforeMount`.

To tell Vue to call a function on a given lifecycle hook, you simply
add a method to your Vue instance or [Vue component](/tutorials/vue/components)
with the hook name as the property name:

```javascript
[require:Vue lifecycle hooks example$]
```

Created
-------

The `created` hook runs just _after_ Vue creates an instance of your
Vue instance or component. In particular, `created` runs before `mounted`
and before the first render of the component. Since the component isn't
rendered yet, the [`$el` property](https://012.vuejs.org/api/instance-properties.html#vm-$el) will be undefined.

You can use an async function as a `created` hook, but Vue won't wait
for the async function to finish before rendering the component.

```javascript
[require:Vue lifecycle hooks created async$]
```

Similarly, the `beforeCreate` hook runs just _before_ Vue creates
the instance. One major difference between `beforeCreate` and `create`
is that `beforeCreate` runs **before** the Vue instance's `data`
function runs, so any reactive properties will be undefined in `beforeCreate`:

```javascript
[require:Vue lifecycle hooks beforeCreate$]
```

Mounted
-------

The `mounted` hook is the most commonly used hook. Vue runs `mounted`
_after_ Vue ["mounts" the component to the DOM](https://vuejs.org/v2/api/#mounted). There are two major differences between `mounted` and `created`:

1. When Vue calls `mounted`, the [`$el` property](https://012.vuejs.org/api/instance-properties.html#vm-$el) is defined and set to the [DOM element](https://developer.mozilla.org/en-US/docs/Web/API/Element) the component is attached to. When Vue calls `created`, `$el` is not set.
2. Vue's official [server-side rendering](/tutorials/vue/ssr) package, [vue-server-renderer](http://npmjs.com/package/vue-server-renderer), runs `created` hooks but **not** `mounted` hooks. This makes sense because, in server-side rendering, the Vue instance is never actually attached to a DOM element, vue-server-renderer simply outputs a string containing HTML.

The `mounted` hook is often used to [send an HTTP request to load data for the component to display](https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html). For example, below is an example of using the `mounted` hook to send an [HTTP request to load data](/tutorials/vue/axios) about a `user`:

```javascript
[require:Vue axios basic example$]
```

Whether you use `created` or `mounted` to fetch data over HTTP is open to debate.
The `created` hook runs first, which means you can parallelize fetching and
rendering. But, on the other hand, Vue's server side rendering doesn't wait for async `created` hooks to finish running, so you need to handle it yourself.

On the other hand, `mounted` runs after the component is mounted, which means
you can ensure a loading screen is shown before sending data to the server. Plus
it is easy to manually call a `mounted` hook for server-side rendering, so long
as the `mounted` hook doesn't rely on the DOM element `$el`. For example,
here's how you call the `mounted()` function from the previous example
on the server side:

```javascript
await mounted.call(app);
const data = await renderToString(app);
// The HTML output contains the user data
assert.ok(data.includes('Leanne Graham'));
```

The `beforeMount` hook differs from the `mounted` hook in that the `$el`
property still isn't set. But, on the other hand, Vue also doesn't
run `beforeMount` when doing server-side rendering. 

Updated
-------

Vue runs the [`updated` hook](https://vuejs.org/v2/api/#updated) whenever it needs to re-render part of the
component after the component is mounted. Like `mounted`, Vue doesn't
run `updated` hooks when using server-side rendering.

```javascript
[require:Vue lifecycle hooks update$]
```

The `updated` and `beforeUpdate` hooks are typically useful only for
profiling and debugging. For example, you can plug in a print statement
to see when Vue needs to update, or track how long it took Vue to
update by storing [the current time `Date.now()`](/tutorials/fundamentals/timestamps) in `beforeUpdate` and calculating the difference in `updated`.
You can't [get a description of the necessary updates](https://stackoverflow.com/questions/43764105/how-to-get-changes-in-vue-updated-hook).

Destroyed
---------

Vue calls the `destroyed` and `beforeDestroy` hooks when the Vue instance
is unmounted from the DOM. Vue calls `beforeDestroy` immediately before the
instance is unmounted, and `destroyed` immediately after. For example,
if you create a component for every element in an array `elements` using `v-for`,
Vue will call `destroyed` every time you remove an element from `elements`.

```javascript
[require:Vue lifecycle hooks destroyed$]
```

The `destroyed` hook is usually used for cleaning up global state, like [calling `clearInterval()` if you started an interval in `mounted`](http://thecodebarbarian.com/my-3-favorite-javascript-interview-questions.html#the-standard-junior-frontend-test).


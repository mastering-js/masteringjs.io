[Vue has solid support for server-side rendering in Node.js](https://ssr.vuejs.org/guide/#installation). This means that, given a Vue app,
you can render the app in an Express endpoint using the [`vue-server-renderer` library](https://www.npmjs.com/package/vue-server-renderer).

Below is an example of rendering a Vue app using [Express](https://www.npmjs.com/package/express).

```javascript
[require:Vue.*ssr]
```

Note that the `renderToString()` function returns a promise. Make sure you [handle errors](https://thecodebarbarian.com/introducing-await-js-express-async-support-for-express-apps).

Notice that the above `div` has a `data-server-rendered` attribute. The `data-server-rendered` attribute marks this div for [client-side hydration](https://ssr.vuejs.org/guide/hydration.html). In other words, you can then use the [`$mount()` function](https://vuejs.org/v2/api/#vm-mount) to make your Vue client pick up your static HTML and start reacting to client-side events.
Vue doesn't have a built-in HTTP request library. The official [Vue cookbook recommends using Axios](https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html) to interact with REST APIs.

This tutorial will use the excellent [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to provide sample data. For example, if you
type `https://jsonplaceholder.typicode.com/users/1` in your browser's URL bar, you'll
get the below response:

```
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

Displaying Response Data
------------------------

The [`axios.get()` function](https://www.npmjs.com/package/axios#example) executes
an HTTP GET and returns a promise. So calling `await axios.get('https://jsonplaceholder.typicode.com')` gets you an object whose `data` property contains
the above JSON data.

Remember that Vue hooks can be [async functions](https://thecodebarbarian.com/async-functions-in-javascript.html). So that means you can use [async/await](https://asyncawait.net) to execute the Axios request.

```javascript
[require:Vue.*axios.*basic example$]
```

With Server-Side Rendering
--------------------------

Unfortunately, the above example as written won't work with [Vue server-side rendering](h/tutorials/vue/ssr) because:

1. Vue's `renderToString()` doesn't call `mounted` hooks, because the component is never actually mounted.
2. Vue's `renderToString()` doesn't wait for async hooks to execute, so even if you used `created`, the above example wouldn't work.

However, there is an easy workaround. Just call the `mounted()` function manually
and `await` on it.

```javascript
await mounted.call(app);
const data = await renderToString(app);
data; // <div data-server-rendered="true"><div>Leanne Graham</div> <!----></div>
```
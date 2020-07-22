When you `await` on an [Axios request](https://www.npmjs.com/package/axios), you get back an [Axios response](https://github.com/axios/axios#response-schema). An Axios response is a [POJO](/tutorials/fundamentals/pojo) with several
properties, including `data`, which contains the parsed response body.

```javascript
[require:axios response body basic example$]
```

An Axios response contains several other properties, like `status`, which contains the HTTP response status
code (like `200` or `404`). But most of the time you don't care about the response code if the request
succeeded, so you will often see code that gets the response body directly using [promise chaining](/tutorials/fundamentals/promise-chaining).

```javascript
const data = await axios.get(url).then(res => res.data);
```

You can also get the response body using [destructuring assignments](https://thecodebarbarian.com/an-overview-of-destructuring-assignments-in-node-js.html).

```javascript
// Equivalent to `const data = await axios.get(url).then(res => res.data)`
const { data } = await axios.get(url);
```

Automatic Parsing
-----------------

Axios parses the response based on the HTTP response's `Content-Type` header. When the response's content type
is `application/json`, Axios will automatically try to parse the response into a JavaScript object.

```javascript
[require:axios response body json content type$]
```

Keep in mind that the response headers are sent by the server. So if the server sends back a different content
type, you may need to handle it the response yourself.

For other content types, like `text/html`, the `res.data` property will be a string.

```javascript
[require:axios response body html content type$]
```

Streaming
---------

You can configure the type of the `data` property using Axios' `responseType` object. By default,
`responseType` is set to `'json'`, which means Axios will try to parse the response as JSON.

However, that isn't correct if you're looking to, say, download an image using Axios. You can set `responseType` to `'arraybuffer'` to get the response as an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer):

```javascript
[require:axios response body arraybuffer$]
```

You can also set `responseType` to `'stream'` to get the response as a Node.js stream:

```javascript
[require:axios response body stream$]
```
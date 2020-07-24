The easiest way to make a GET request with [Axios](https://www.npmjs.com/package/axios) is the
[`axios.get()` function](https://github.com/axios/axios#example). The 2nd parameter to `axios.get()` is the [Axios options](https://github.com/axios/axios#request-config): Axios will serialize
`options.params` and add it to the query string for you as shown below.

```javascript
[require:axios.*get request params$]
```

You can set `options.params` to a [POJO](/tutorials/fundamentals/pojo) as shown above, or to an
instance of the JavaScript's built-in [`URLSearchParams` class](/tutorials/fundamentals/query-string).

```javascript
[require:axios query string URLSearchParams$]
```

Customizing Serialization
------------------------

Axios's built-in query string serializer respects the [`toJSON()` function](http://thecodebarbarian.com/what-is-the-tojson-function-in-javascript.html), so it automatically serializes built-in custom JSON
serialization, like [Moment objects](http://thecodebarbarian.com/formatting-javascript-dates-with-moment-js.html)
or [Mongoose documents](https://mongoosejs.com/docs/documents.html).

```javascript
[require:axios query string toJSON$]
```

However, if you need more flexibility in how Axios serializes query strings, Axios supports a `paramsSerializer`
option that lets you overwrite the function Axios to serialize.

```javascript
[require:axios query string paramsSerializer$]
```
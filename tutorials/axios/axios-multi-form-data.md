To send multipart form data with Axios, you need to use the `FormData` class.
Browsers have a built-in `FormData` class, but Node.js doesn't, so you
need to use the [`form-data`](https://www.npmjs.com/package/form-data) npm module.

To create the form, you must append the data to the form that will be sent
to the server using the `append()` method. It takes a key and a value as the
parameters.

```javascript
[require:axios axios-multi-form-data]
```

**Note:** Axios does not automatically set the multipart form boundary in Node,
as a result, you must use `getHeaders()`.

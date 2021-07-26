To send a POST request with headers using axios, enable the headers option and set the headers you wish to send.
For an axios POST request, the url is the first parameter, the data is the second, and the configuration options are
the third. If you omit the 3rd parameter and the 2nd is an object, axios will set the `content-type` header to
`application/json`.

```javascript
const res = await axios.post('https://httpbin.org/post', { hello: 'world' }, {
  headers: {
  'content-type': 'text/json'
  }
});
res.data.headers['Content-Type']; // text/json
```

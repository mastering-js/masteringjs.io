The `encodeURIComponent()` function in JavaScript allows you to encode special characters in your query parameters that would otherwise cause an error.
Characters like `+`, `/`, and `&` have a use within query parameters.
If you needed to send some data that contained those characters, sending them normally would trigger their use case and therefore mess up the data you wanted to send.
`encodeURIComponent()` makes it so that the use case is not triggered by encoding the character.
For example:

```javascript
// The url will be https://httpbin.org/get?field=+value
await fetch(`https://httpbin.org/get?field=+value`).then((res) => res.json()); // will be {field: ' value'}
// The url will be https://httpbin.org/get?field=%2Bvalue
await fetch(`https://httpbin.org/get?field=${encodeURIComponent('+value')}`).then((res) => res.json()); // will be {field: '+value'}
```

You can run these lines in developer tools to see for yourself.
Do not encode the entire url as this will also encode the characters whose use case you want to trigger when making your request.

## Axios

Axios does this automatically for you with [params](/tutorials/axios/get-query-params).

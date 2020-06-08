If you pass a JavaScript object as the 2nd parameter to the [`axios.post()` function](\/tutorials/axios/post), Axios will automatically serialize the object to JSON
for you. Axios will also set the `Content-Type` header to `'application/json'`,
so web frameworks like [Express](/express) can automatically parse it.

```javascript
[require:axios post json automatically serializes$]
```

This means you normally don't have to worry about serializing POST bodies
to JSON: Axios handles it for you.

With Pre-Serialized JSON
----------------------

If you happen to have a serialized JSON string that you want to
send as JSON, be careful. If you pass a string to `axios.post()`, Axios
treats that as a [form-encoded request body](/tutorials/axios/post#form-encoded-request-bodies).

```javascript
[require:axios post json with string$]
```

The solution is easy: make sure you set the `Content-Type` header if
you pass a pre-serialized JSON string to `axios.post()`.

```javascript
[require:axios post json content-type with string$]
```
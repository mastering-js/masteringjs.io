The easiest way to make a POST request with [Axios](https://www.npmjs.com/package/axios)
is the `axios.post()` function. The first parameter is url where the data will be sent
and the second parameter is the data that is being sent to the server. You can make
a POST request as follows:

```javascript
[require:axios axios-post-object]
```

In the example above, `res.data.data` is a string even though the second parameter that was sent was an object.
If the second parameter is an object, axios will `JSON.stringify()` it before it is sent
to the server.

If the second parameter that is sent to the server is a string, the request body will be made into
a series of key value pairs. Use the equal sign between two words to denote the key and value, otherwise
the entire string will be seen as the key with an empty value.

```javascript
[require:axios axios-post-string]
```

**Note:** Notice how the `Content-Type` changed between sending an object and sending a string.
Axios will do that automatically and you can always override the `Content-Type` by setting it as
a third parameter.

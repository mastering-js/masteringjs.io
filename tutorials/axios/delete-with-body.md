To send a request body with an [Axios DELETE request](/tutorials/axios/delete), you should set the [`data` option](/tutorials/axios/options#data).

```javascript
[require:axios delete request body$]
```

Remember that the 2nd parameter to `axios.delete()` is the [Axios options](/tutorials/axios/options), **not** the request body.
You can't pass the request body as the 2nd parameter like you can with [`axios.post()`](/tutorials/axios/post) or [`axios.put()`](/tutorials/axios/put).
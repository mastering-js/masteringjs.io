[Axios' `post()` function](/tutorials/axios/post) supports a `data` parameter that becomes the HTTP request body.
On the other hand, [`axios.get()`](/tutorials/axios/get) does **not** support this parameter. The 2nd parameter to
`axios.get()` is the Axios options.

That's because, while the HTTP spec does not specifically forbid sending a request body with a GET request,
older versions of the HTTP spec say that [HTTP servers _should_ ignore GET request bodies](https://stackoverflow.com/questions/978061/http-get-with-request-body). So most HTTP services don't support GET request bodies.

Use `params` Instead
--------------------

Instead of sending your data using the `data` parameter, you can use the `params` option to tell Axios to put
your parameters in the [query string](/tutorials/fundamentals/query-string):

```javascript
[require:axios get request params$]
```

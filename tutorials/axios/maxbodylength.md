By default, Axios will send arbitrarily large HTTP request bodies.
The `maxBodyLength` option is [different from the `maxContentLength` option](https://github.com/axios/axios/issues/2696): `maxContentLength` limits the maximum [_response_ body](/tutorials/axios/response-body) size, `maxBodyLength` limits the maximum _request_ body size.

In Node.js, you can use the `maxBodyLength` option to limit the size of the HTTP request body.
If the request is too big, Axios will throw a `AxiosError: Request body larger than maxBodyLength limit` error, and not send the request.

```javascript
await axios.post('https://httpbin.org/post', { data: '0'.repeat(102) }, {  maxBodyLength: 100 });
// Throws:
/*
Uncaught [AxiosError: Request body larger than maxBodyLength limit] {
  code: 'ERR_BAD_REQUEST',
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    },
    adapter: [Function: httpAdapter],
    transformRequest: [ [Function: transformRequest] ],
    transformResponse: [ [Function: transformResponse] ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: 100,
    env: { FormData: [Function] },
    validateStatus: [Function: validateStatus],
    headers: {
      Accept: '...',
      'Content-Type': 'application/json',
      'User-Agent': 'axios/0.27.2'
    },
    method: 'post',
    url: 'https://httpbin.org/post',
    data: '{"data":"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"}'
  }
}
*/
```

Note that the `maxBodyLength` option is **not** supported in the browser.
The above [`axios.post()`](/tutorials/axios/post) call will successfully send an HTTP in the browser, Axios won't throw any errors.

## With Redirects

The primary purpose of `maxBodyLength` is to handle the case where [you're streaming HTTP data to a URL that requires a redirect](https://github.com/axios/axios/issues/2696#issuecomment-578989881).
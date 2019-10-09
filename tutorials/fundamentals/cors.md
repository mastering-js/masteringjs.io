[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) is a protocol
that helps browsers determine whether it is safe to make an HTTP request
to a different origin. Browsers restrict cross-origin requests from JavaScript,
so if you use `fetch()` or [Axios](/axios) to make a request to an
[Express server that doesn't use CORS](/tutorials/express/cors), you'll
see the below error message:

```
Access to fetch at 'http://localhost:3000/' from origin 'http://localhost:5000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

What Qualifies as Cross-Origin?
-------------------------------

You can think of your origin as what shows up in the URL bar in your browser. For
example, suppose you have a browser tab open to `http://localhost:5000/tutorials/fundamentals/pojo`.

<img class="inline-image" src="https://i.imgur.com/eag0HC8.png">

The following are considered cross-origin requests:

1. `https://localhost:5000/test` - Different protocol, `http` vs `https`
2. `http://localhost:3000/test` - Different port, `3000` vs `5000`
3. `http://google.com:5000/test` - Different host, `localhost` vs `google.com`

In other words, any request whose protocol, host, and port don't match what's
in the URL bar is considered cross-origin.

Setting Up CORS Support
-----------------------

You need to set up CORS on the server, like using the [`cors` plugin for Express](/tutorials/express/cors). If you're trying to make an HTTP request to a server that
you don't have access to, your only option is to create a proxy.

Most browsers make a [preflight request](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Functional_overview) using the HTTP `OPTIONS` request method (as opposed to `GET` or `POST`) to check for CORS headers. In order to support CORS, your server
needs to handle `OPTIONS` requests and set the `Access-Control-Allow-Origin` header
on the response.

Normally you would just use [the `cors` npm module](https://www.npmjs.com/package/cors),
but this example shows how you can support cross-origin requests by simply setting
response headers, which should be easy in any web framework.

```javascript
[require:Express.*cors.*custom$]
```
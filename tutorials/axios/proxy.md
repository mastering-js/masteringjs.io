[Axios](/axios) supports a `proxy` option that lets you define an [HTTP proxy](https://www.varonis.com/blog/what-is-a-proxy-server/) for your request. A proxied request is an HTTP request that Axios sends to a different server
(the _proxy server_) than the request is actually meant for. The idea is that the proxy server will do something
with the request before sending it to where the request is meant to go.

Below is the basic syntax of how you can proxy a request that is meant for [httpbin.org](http://httpbin.org/) to
a proxy server listening on `localhost:3000`.

```javascript
const axios = require('axios');
const res = await axios.get('http://httpbin.org/get?answer=42', {
  // `proxy` means the request actually goes to the server listening
  // on localhost:3000, but the request says it is meant for
  // 'http://httpbin.org/get?answer=42'
  proxy: {
    host: 'localhost',
    port: 3000
  }
});
console.log(res.data);
```

How A Proxied Request Works on the Server
-----------------------------------------

Let's take a look at the technical details of a proxied request. The [http-proxy npm package](https://www.npmjs.com/package/http-proxy) is a popular HTTP proxy. Here's a script that listens on port 3000 and prints any requests before
sending them out to their intended destination.

```javascript
[require:axios proxy works$]
```

Notice that Express reports `req.url` is an `httpbin.org` URL! That's what we mean when we say Axios sends the
request to a different server than the request is intended for. The URL associated with the request, `req.url`,
is different than the proxy server's URL, and the proxy server is responsible for forwarding the request to `req.url`.

Proxy servers often do some sort of transformation to the request. For example, a proxy server may [set an authorization header](/tutorials/axios/authorization) so your request doesn't have to.

```javascript
const proxy = httpProxy.createProxyServer({});
proxy.on('proxyReq', function(proxyReq) {
  proxyReq.setHeader('Authorization', 'my-secret-key');
});

const app = express();
app.get('*', function(req, res) {
  proxy.web(req, res, { target: `${req.protocol}://${req.hostname}` });
});
const server = await app.listen(3000);
```

Now, if you make the same request with Axios, the proxy server will add the 'Authorization' header for you, and httpbin.org will include it in the response.

```javascript
const axios = require('axios');
const res = await axios.get('http://httpbin.org/get?answer=42', {
  proxy: {
    host: 'localhost',
    port: 3000
  }
});
console.log(res.data.headers['authorization']); // "my-secret-key"
```
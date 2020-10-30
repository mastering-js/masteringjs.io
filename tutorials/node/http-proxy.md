The [http-proxy package on npm](https://www.npmjs.com/package/http-proxy) is the most popular way to create an
HTTP proxy in Node.js. Below is a standalone script that shows how to use http-proxy with Express, and make a
[proxied HTTP request using Axios](/tutorials/axios/proxy).

```javascript
[require:axios proxy works$]
```

The http-proxy package doesn't require you to use Express. You can also use [Node's built-in `HTTPServer` class](/node/http-server):

```javascript
const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
http.createServer(function(req, res) {
  console.log('Request', req.method, req.url);
  proxy.web(req, res, { target: `${req.protocol}://${req.hostname}` });
}).listen(3000);
```

Modifying Requests
------------------

With a proxy server, there's two HTTP requests: the inbound request that the proxy server received, and the outbound
request that the proxy server sends. In the previous examples, the inbound request is the same as the outbound request.
However, many proxy servers modify outbound requests. For example, you may want your proxy server to set an HTTP header.

In order to modify the outbound request, you [need to listen to http-proxy's 'proxyReq' event](https://www.npmjs.com/package/http-proxy#setup-a-stand-alone-proxy-server-with-proxy-request-header-re-writing), which gives you access to the outbound request that http-proxy will send. For example, here's how you can set the 'Authorization' header on all outbound requests:

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
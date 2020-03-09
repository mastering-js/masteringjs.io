The [ws npm module](https://www.npmjs.com/package/ws) is the de facto library for 
[websockets in Node.js](/tutorials/node/websockets). It has [built-in support for Node.js' native `http` servers](https://www.npmjs.com/package/ws#external-https-server). But, unfortunately, very
few developers use Node's built-in HTTP package directly, they usually use [Express](/express).

Integrating the ws package with Express is easy. There is also an [express-ws module on npm](https://www.npmjs.com/package/express-ws), but I've never managed to get that module to work. Here's how you can use the ws package to listen to websockets on an
Express server.

Listening to Websockets with Express
------------------------------------

The ws package supports native Node.js HTTP servers. Conveniently, [Express' `listen()` function](http://expressjs.com/en/4x/api.html#app.listen) returns a native Node.js HTTP server. So you can use the same process described in the [ws docs](https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server):

```javascript
[require:Express websockets basic example$]
```

Testing
-------

How do you actually connect to this server? [ws also has a websocket client implementation](https://www.npmjs.com/package/ws#sending-and-receiving-text-data) as well as the server implementation.

```javascript
const ws = require('ws');

const client = new ws('ws://localhost:3000');

client.on('open', () => {
  // Causes the server to print "Hello"
  client.send('Hello');
});
```
[Websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) are a tool for bidirectional communication between a browser client and a server. What makes websockets special is that they enable the server to push data to the client.

Here's how you can start a websocket server in Node.js.

Using ws
--------

The [`ws` npm package](https://www.npmjs.com/package/ws) is the de facto WebSocket library for Node.js. The ws package also includes a websocket client, which is
useful for testing.

Below is a basic example of a WebSocket server that tracks all open sockets and sends inbound messages to all open sockets. You can think of this as a simple chat server: when one person sends a message, the server broadcasts the message to everyone listening.

```javascript
[require:Node.*websockets.*basic]
```

Using ws and Express
--------------------

The above ws server has to have its own port: it can't listen on the same port
as an Express server. However, you can [handle websockets from Express](/tutorials/express/websockets) using ws by listening to the Express HTTP server's ['upgrade' event](https://developer.mozilla.org/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism)
as described in [ws' docs](https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server).

```javascript
[require:Express websockets basic example$]
```
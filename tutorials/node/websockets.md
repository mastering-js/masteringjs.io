[WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) are a tool for bidirectional communication between a browser client and a server. In particular, WebSockets enable the server to push data to the client. This is different from your standard HTTP request using [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) or [Axios](/tutorials/axios/basic_auth) because the server cannot communicate with the client unless the client sends a request first.

WebSockets are more flexible, but also are harder to implement and scale. WebSockets put more of a burden on the developer, so use them sparingly and only when you absolutely need them. In this article, you'll learn how to build a simple real-time chat application using WebSockets.

The WebSocket Server
--------------------

The [`ws` npm package](https://www.npmjs.com/package/ws) is the de facto WebSocket library for Node.js. You can also use [Socket.IO](https://socket.io/), but Socket.IO is a higher level framework on top of WebSockets rather than an implementation of the [WebSocket protocol](https://tools.ietf.org/html/rfc6455).

Below is a basic example of a WebSocket server that tracks all open sockets and sends inbound messages to all open sockets. You can think of this as a simple chat server: when one person sends a message, the server broadcasts the message to everyone listening.

```javascript
[require:Node.*websockets.*basic]
```

WebSocket Client in Node.js
---------------------------

A WebSocket connection has two components, a client and a server. In the above example, you created a server. Clients initiate a request to open a WebSocket connection, and servers respond to inbound requests to open WebSocket connections.

You can also create a WebSocket client in Node.js using `ws`. This is great for testing your WebSocket logic, although you can also use WebSockets for communication between backend services. Below is an example of a WebSocket client that talks to the above server.

```javascript
[require:Node.*websockets.*node client]
```

WebSocket Client in the Browser
-------------------------------

[Most modern browsers support WebSockets out of the box](https://caniuse.com/#feat=websockets). In other words, you can use the `WebSocket` class in the browser without without `ws` or transpilers, unless you want to support Internet Explorer 9 or Opera Mini. Below is a screenshot from [the `caniuse.com` section on WebSockets](https://caniuse.com/#feat=websockets).

<img src="https://i.imgur.com/hmA4oV1.png">

Below is an example of a chat page that connects to the above server:

```html
<html>
  <head>
    <script type="text/javascript">
      const ws = new WebSocket('ws://localhost:8080');

      // Browser WebSockets have slightly different syntax than `ws`.
      // Instead of EventEmitter syntax `on('open')`, you assign a callback
      // to the `onopen` property.
      ws.onopen = function() {
        document.querySelector('#send').disabled = false;

        document.querySelector('#send').addEventListener('click', function() {
          ws.send(document.querySelector('#message').value);
        });
      };

      ws.onmessage = function(msg) {
        document.querySelector('#messages').innerHTML += `<div>${msg.data}</div>`;
      };
    </script>
  </head>
  <body>
    <h1>Chat</h1>
    <div>
      <input id="message" placeholder="Message">
      <button id="send" disabled="true">Send</button>
    </div>
    <div id="messages">
    </div>
  </body>
</html>
```

Note that WebSockets in the browser have slightly different syntax for [waiting for the connection](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications#Sending_data_to_the_server) and [receiving messages from the server](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications#Receiving_messages_from_the_server). Instead of `on('message', messageHandler)`, you should write `onmessage = messageHandler`.
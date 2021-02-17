[WebSockets](/tutorials/node/websockets) are a great tool for when you want to show real time changes in data.
For example, a server can push stock market price changes to the client rather than the client needing to ask for the changes via a HTTP request.
With this being said, below you will find an example of a simple Vue application that shows the current time to the user and where
the user can send a simple message to the websocket.

```javascript
[require:Vue vue-websocket]
```

The server code is:

```javascript
"use strict";

const serverPort = 3000;
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const WebSocket = require("ws");
const websocketServer = new WebSocket.Server({ server });

//when a websocket connection is established
websocketServer.on("connection", (webSocketClient) => {
  // send feedback to the incoming connection
  webSocketClient.send("The time is: ");
  setInterval(() => {
      let time = new Date();
      webSocketClient.send("The time is: " + time.toTimeString());
  }, 1000);
});

//start the web server
server.listen(serverPort, () => {
    console.log("Websocket server started on port " + serverPort);
});
```

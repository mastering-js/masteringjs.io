[WebSockets](https://masteringjs.io/tutorials/node/websockets) are a great tool for when you want to show real time changes in data.
For example, displaying stock market changes, or in chat applications which reuse the WebSocket connection for the current users.
With this being said, below you will find an example of a simple Vue application that sends the current time to the user and where
the user can send a simple message to the websocket.


```javascript
[require:Vue vue-websocket]
```

The server code is:

```javascript
"use strict";

const serverPort = 3000,
    http = require("http"),
    express = require("express"),
    app = express(),
    server = http.createServer(app),
    WebSocket = require("ws"),
    websocketServer = new WebSocket.Server({ server });

//when a websocket connection is established
websocketServer.on('connection', (webSocketClient) => {
    // send feedback to the incoming connection
    webSocketClient.send('The time is: ');
    //when a message is received
    webSocketClient.on('message', (message) => {
        console.log(message);
        //for each websocket client
        websocketServer
        .clients
        .forEach( client => {
            //send the client the current time
            setInterval(() => {
                let time = new Date();
                client.send(time.toTimeString());
            },1000);
        });
    });
});

//start the web server
server.listen(serverPort, () => {
    console.log(`Websocket server started on port ` + serverPort);
});
```

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
    // webSocketClient.send('"{connection: ok}"');
    webSocketClient.send('The time is: ');
    /*
    setInterval(() => {
        let time = new Date();
        webSocketClient.send(time.toTimeString());
    },1000);
    */
    
    //when a message is received
    webSocketClient.on('message', (message) => {

        //for each websocket client
        websocketServer
        .clients
        .forEach( client => {
            //send the client the current message
            //client.send(`{ "message" : Hello there }`);
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
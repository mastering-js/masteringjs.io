'use strict';

const WebSocket = require('ws');

const server = new WebSocket.Server({
  port: 8080
});

let sockets = [];
server.on('connection', function(socket) {
  sockets.push(socket);

  // When you receive a message, send that message to every socket.
  socket.on('message', function(msg) {
    sockets.forEach(s => s.send(msg));
  });
});

const express = require('express');
const app = express();
app.use(require('express-static')(__dirname));
app.listen(3000);
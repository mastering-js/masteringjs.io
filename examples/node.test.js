'use strict';

const WebSocket = require('ws');
const assert = require('assert');
const axios = require('axios');
const config = require('../.config');
const fs = require('fs');

Object.assign(process.env, config);

describe('Node', function() {
  describe('websockets', function() {
    it('basic', async function() {
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

        // When a socket closes, or disconnects, remove it from the array.
        socket.on('close', function() {
          sockets = sockets.filter(s => s !== socket);
        });
      });
      // acquit:ignore:start
      let c1 = new WebSocket('ws://localhost:8080');
      let c2 = new WebSocket('ws://localhost:8080');

      const p1 = new Promise(resolve => c1.once('open', resolve));
      const p2 = new Promise(resolve => c2.once('open', resolve));

      await p1;
      await p2;
      const recv1 = new Promise(resolve => c1.once('message', resolve));
      const recv2 = new Promise(resolve => c2.once('message', resolve));

      c1.send('Hello');
      assert.deepEqual(await Promise.all([recv1, recv2]), ['Hello', 'Hello']);

      await c1.close();
      await c2.close();
      await server.close();
      // acquit:ignore:end
    });

    it('node client', async function() {
      // acquit:ignore:start
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

        // When a socket closes, or disconnects, remove it from the array.
        socket.on('close', function() {
          sockets = sockets.filter(s => s !== socket);
        });
      });
      // acquit:ignore:end
      let clients = [
        new WebSocket('ws://localhost:8080'),
        new WebSocket('ws://localhost:8080')
      ];

      clients.map(client => {
        client.on('message', msg => console.log(msg));
      });

      // Wait for the client to connect using async/await
      await new Promise(resolve => clients[0].once('open', resolve));

      // Prints "Hello!" twice, once for each client.
      clients[0].send('Hello!');
      // acquit:ignore:start
      const recv1 = new Promise(resolve => clients[0].once('message', resolve));
      const recv2 = new Promise(resolve => clients[1].once('message', resolve));

      assert.deepEqual(await Promise.all([recv1, recv2]), ['Hello!', 'Hello!']);
      clients.map(c => c.close());
      await server.close();
      // acquit:ignore:end
    });
  });

  describe('s3', function() {
    it('upload', async function() {
      const AWS = require('aws-sdk');
      const fs = require('fs');

      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      });

      const s3 = new AWS.S3();

      const res = await new Promise((resolve, reject) => {
        s3.upload({
          Bucket: process.env.AWS_BUCKET,
          Body: fs.createReadStream('./package.json'),
          Key: 'package.json'
        }, (err, data) => err == null ? resolve(data) : reject(err));
      });

      // 'https://s3.us-west-2.amazonaws.com/<bucket>/package.json'
      res.Location;
      // acquit:ignore:start
      assert.equal(res.Location, 'https://s3.us-west-2.amazonaws.com/val.log.test/package.json');
      // acquit:ignore:end
    });

    it('public upload', async function() {
      // acquit:ignore:start
      const AWS = require('aws-sdk');
      const fs = require('fs');

      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      });

      const s3 = new AWS.S3();
      // acquit:ignore:end
      const res = await new Promise((resolve, reject) => {
        s3.upload({
          Bucket: process.env.AWS_BUCKET,
          Body: fs.createReadStream('./package.json'),
          Key: 'package.json',
          ACL: 'public-read' // Make this object public
        }, (err, data) => err == null ? resolve(data) : reject(err));
      });

      // 'https://s3.us-west-2.amazonaws.com/<bucket>/package.json'
      res.Location;
      // acquit:ignore:start
      assert.equal(res.Location, 'https://s3.us-west-2.amazonaws.com/val.log.test/package.json');
      
      const { data } = await axios.get(res.Location);
      assert.equal(data.name, 'masteringjs.io');
      // acquit:ignore:end
    });
  });

  describe('promisify', function() {
    it('fs with callbacks', function(done) {
      const fs = require('fs');

      fs.readFile('./package.json', function callback(err, buf) {
        const obj = JSON.parse(buf.toString('utf8'));
        obj.name; // 'masteringjs.io'
        // acquit:ignore:start
        assert.equal(obj.name, 'masteringjs.io');
        done();
        // acquit:ignore:end
      });
    });

    it('fs with promisify', async function() {
      const fs = require('fs');
      const util = require('util');

      // Convert `fs.readFile()` into a function that takes the
      // same parameters but returns a promise.
      const readFile = util.promisify(fs.readFile);

      // You can now use `readFile()` with `await`!
      const buf = await readFile('./package.json');

      const obj = JSON.parse(buf.toString('utf8'));
      obj.name; // 'masteringjs.io'
      // acquit:ignore:start
      assert.equal(obj.name, 'masteringjs.io');
      // acquit:ignore:end
    });

    it('custom promisify', async function() {
      const fs = require('fs');

      // A simplified implementation of `util.promisify()`. Doesn't
      // cover all cases, don't use this in prod!
      function promisify(fn) {
        return function() {
          const args = Array.prototype.slice.call(arguments);
          return new Promise((resolve, reject) => {
            fn.apply(this, [].concat(args).concat([(err, res) => {
              if (err != null) {
                return reject(err);
              }
              resolve(res);
            }]));
          });
        };
      }

      // Convert `fs.readFile()` into a function that takes the
      // same parameters but returns a promise.
      const readFile = promisify(fs.readFile);

      // You can now use `readFile()` with `await`!
      const buf = await readFile('./package.json');

      const obj = JSON.parse(buf.toString('utf8'));
      obj.name; // 'masteringjs.io'
      // acquit:ignore:start
      assert.equal(obj.name, 'masteringjs.io');
      // acquit:ignore:end
    });

    it('losing context', async function() {
      class MyClass {
        myCallbackFn(cb) {
          cb(null, this);
        }
      }

      const obj = new MyClass();
      const promisified = require('util').promisify(obj.myCallbackFn);

      const context = await promisified();
      context; // `undefined` instead of a `MyClass` instance!
      // acquit:ignore:start
      assert.strictEqual(context, void 0);
      // acquit:ignore:end
    });

    it('correct context', async function() {
      class MyClass {
        myCallbackFn(cb) {
          cb(null, this);
        }
      }

      const obj = new MyClass();
      // Retain context because `promisified` is a property of `obj`
      obj.promisified = require('util').promisify(obj.myCallbackFn);

      const context = await obj.promisified();
      context === obj; // true
      // acquit:ignore:start
      assert.strictEqual(context, obj);
      // acquit:ignore:end
    });
  });
});
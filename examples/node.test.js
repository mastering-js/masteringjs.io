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

  describe('AWS lambda', function() {
    const awsBucket = 'codebarbarian-images';
    let functionArn;

    it('bundle and upload', async function() {
      const AdmZip = require('adm-zip');
      const AWS = require('aws-sdk');

      const file = new AdmZip();
      file.addFile('test.js', Buffer.from(`
        exports.handler = async function(event, context) {
          return { statusCode: 200, body: 'Hello, World' };
        };
      `));

      file.writeZip('./test.zip');

      // Make sure the configs are set!
      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1'
      });

      const s3 = new AWS.S3();
      await new Promise((resolve, reject) => {
        s3.upload({
          Bucket: awsBucket, // Make this your AWS bucket
          Body: fs.createReadStream('./test.zip'),
          Key: 'test.zip'
        }, (err, data) => err == null ? resolve(data) : reject(err));
      });
    });

    it('invoke', async function() {
      const AWS = require('aws-sdk');
      const promisify = require('util').promisify;

      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1'
      });

      const lambda = new AWS.Lambda();
      // acquit:ignore:start
      await promisify(lambda.deleteFunction).call(lambda, {
        FunctionName: 'nodetest'
      });
      // acquit:ignore:end
      
      // Actually create the function with the given name and runtime.
      const opts = {
        FunctionName: 'nodetest',
        Runtime: 'nodejs12.x',
        // Whatever role, doesn't matter
        Role: 'add actual role that starts with `arn:aws:iam::` here',
        // acquit:ignore:start
        Role: 'arn:aws:iam::676517094076:role/service-role/test',
        // acquit:ignore:end
        // `test` is for `test.js`, and `handler` is for `exports.handler`.
        Handler: 'test.handler',
        Code: {
          'S3Bucket': awsBucket,
          'S3Key': 'test.zip'
        }
      };
      const fn = await promisify(lambda.createFunction).call(lambda, opts);
      functionArn = fn.FunctionArn; // The "id" of the lambda function

      // Let API Gateway call this Lambda function
      await promisify(lambda.addPermission).call(lambda, {
        FunctionName: 'nodetest',
        StatementId: 'doesntmatter',
        Action: 'lambda:InvokeFunction',
        Principal: 'apigateway.amazonaws.com'
      });

      const res = await promisify(lambda.invoke).call(lambda, {
        FunctionName: 'nodetest'
      });
      res.Payload; // '{"statusCode":200,"body":"Hello, World"}'
      // acquit:ignore:start
      assert.equal(res.Payload, '{"statusCode":200,"body":"Hello, World"}');
      // acquit:ignore:end
    });

    it('create rest api', async function() {
      this.timeout(5000);
      const AWS = require('aws-sdk');
      const promisify = require('util').promisify;

      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1'
      });

      const gateway = new AWS.APIGateway();

      // Create a new API
      const api = await promisify(gateway.createRestApi).call(gateway, {
        name: 'My Test API'
      });
      const restApiId = api.id;

      // Create a new endpoint (resource) at `/test/
      const resources = await promisify(gateway.getResources).call(gateway, { restApiId });
      const resource = await promisify(gateway.createResource).call(gateway, {
        restApiId,
        // Parent resource is the "root" resource
        parentId: resources.items[0].id,
        pathPart: 'test'
      });
      await promisify(gateway.putMethod).call(gateway, {
        restApiId,
        resourceId: resource.id,
        httpMethod: 'GET',
        authorizationType: 'NONE'
      });

      // Configure the endpoint to use the Lambda function
      await promisify(gateway.putIntegration).call(gateway, {
        restApiId,
        resourceId: resource.id,
        httpMethod: 'GET',
        integrationHttpMethod: 'POST',
        type: 'AWS_PROXY',
        uri: `arn:aws:apigateway:us-east-1:lambda:path//2015-03-31/functions/${functionArn}/invocations`
      });
      await promisify(gateway.createDeployment).call(gateway, { restApiId, stageName: 'prod' });

      await promisify(gateway.putMethodResponse).call(gateway, {
        restApiId,
        resourceId: resource.id,
        httpMethod: 'GET',
        statusCode: '200'
      });
      await promisify(gateway.putIntegrationResponse).call(gateway, {
        restApiId,
        resourceId: resource.id,
        httpMethod: 'GET',
        statusCode: '200'
      });

      // Now call the function using Axios!
      const axios = require('axios');

      const res = await axios.get(`https://${api.id}.execute-api.us-east-1.amazonaws.com/prod/test`);
      res.data; // 'Hello, World'
      // acquit:ignore:start
      assert.equal(res.data, 'Hello, World');
      // acquit:ignore:end
    });
  });

  describe('buffers', function() {
    it('from filesystem', function() {
      const fs = require('fs');

      const buf = fs.readFileSync('./package.json');
      buf instanceof Buffer; // true
      // acquit:ignore:start
      assert.ok(buf instanceof Buffer);
      // acquit:ignore:end
      
      buf; // '<Buffer 7b 0a 20 20 22 6e 61 6d 65 22 ...>'
    });

    it('toString default', function() {
      const buf = Buffer.from('Hello, World', 'utf8');

      buf.toString(); // 'Hello, World'
      // acquit:ignore:start
      assert.equal(buf.toString(), 'Hello, World');
      // acquit:ignore:end
    });

    it('toString utf8', function() {
      const fs = require('fs');

      const buf = fs.readFileSync('./package.json');
      // acquit:ignore:start
      assert.ok(buf instanceof Buffer);
      // acquit:ignore:end
      buf.toString('utf8'); // '{ "name": "masteringjs.io", ...}'
    });

    it('toString hex', function() {
      const fs = require('fs');

      const buf = fs.readFileSync('./package.json');
      // acquit:ignore:start
      assert.ok(buf instanceof Buffer);
      // acquit:ignore:end
      buf.toString('hex'); // '7b0a2020...'
    });

    it('toString base64', function() {
      const fs = require('fs');

      const buf = fs.readFileSync('./package.json');
      // acquit:ignore:start
      assert.ok(buf instanceof Buffer);
      // acquit:ignore:end
      buf.toString('base64'); // 'ewogICJuYW1lI...'
    });

    it('from string', function() {
      let buf = Buffer.from('Hello, World', 'utf8');

      buf.toString('hex'); // '48656c6c6f2c20576f726c64'
      buf.toString('utf8'); // 'Hello, World'
      // acquit:ignore:start
      assert.equal(buf.toString('hex'), '48656c6c6f2c20576f726c64');
      assert.equal(buf.toString('utf8'), 'Hello, World');
      // acquit:ignore:end

      buf = Buffer.from('48656c6c6f2c20576f726c64', 'hex');
      buf.toString('utf8'); // 'Hello, World'
      // acquit:ignore:start
      assert.equal(buf.toString('utf8'), 'Hello, World');
      // acquit:ignore:end
    });

    it('json', function() {
      let buf = Buffer.from('Hello, World', 'utf8');

      let obj = { buffer: buf };
      obj = JSON.parse(JSON.stringify(obj));

      // { type: 'Buffer',
      //   data: [ 72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100 ] }
      obj.buffer;
      // acquit:ignore:start
      assert.deepEqual(obj.buffer.data,
        [72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100]);
      // acquit:ignore:end

      // To convert from JSON representation back to a buffer, use `Buffer.from()`
      obj.buffer = Buffer.from(obj.buffer);
      obj.buffer.toString('utf8'); // 'Hello, World'
      // acquit:ignore:start
      assert.equal(obj.buffer.toString('utf8'), 'Hello, World');
      // acquit:ignore:end
    });

    it('compare', function() {
      const buf1 = Buffer.from('Hello, World', 'utf8');
      const buf2 = Buffer.from('Hello, World', 'utf8');
      const buf3 = Buffer.from('Different buffer', 'utf8');

      Buffer.compare(buf1, buf2); // 0, means the 2 buffers are equal
      // acquit:ignore:start
      assert.strictEqual(Buffer.compare(buf1, buf2), 0);
      // acquit:ignore:end

      Buffer.compare(buf1, buf3); // 1, means buf1 < buf3
      // acquit:ignore:start
      assert.strictEqual(Buffer.compare(buf1, buf3), 1);
      // acquit:ignore:end
    });

    it('sort', function() {
      const buffers = [
        Buffer.from('A', 'utf8'),
        Buffer.from('C', 'utf8'),
        Buffer.from('B', 'utf8')
      ];

      buffers.sort(Buffer.compare);

      buffers.map(buf => buf.toString('utf8')); // ['A', 'B', 'C']
      // acquit:ignore:start
      assert.deepEqual(buffers.map(buf => buf.toString('utf8')), ['A', 'B', 'C']);
      // acquit:ignore:end
    });

    it('length', function() {
      const buf = Buffer.from('Hello, World', 'utf8');

      buf.length; // 12, same as 'Hello, World'.length
      // acquit:ignore:start
      assert.equal(buf.length, 12);
      // acquit:ignore:end
    });

    it('length of file', function() {
      const fs = require('fs');
      fs.writeFileSync('./test.txt', 'Hello, World');

      const buf = fs.readFileSync('./test.txt');

      Buffer.isBuffer(buf); // true
      buf.length; // 12, same as 'Hello, World'.length
      // acquit:ignore:start
      assert.ok(Buffer.isBuffer(buf));
      assert.equal(buf.length, 12);
      // acquit:ignore:end
    });

    it('alloc length', function() {
      const buf = Buffer.alloc(100);

      buf.length; // 100, even though the buffer contains 100 `0` bytes

      // Write 'Hello, World' to the buffer starting at offset 0
      buf.write('Hello, World', 0);

      buf.length; // still 100, because there's 100 bytes allocated.
      // acquit:ignore:start
      assert.equal(buf.length, 100);
      // acquit:ignore:end
    });
  });

  describe('Google Cloud', function() {
    it('storage', async function() {
      const { Storage } = require('@google-cloud/storage');

      const storage = new Storage({ keyFilename: './google-cloud-key.json' });
      // Replace with your bucket name and filename.
      const bucketname = 'vkarpov15-test1';
      const filename = 'package.json';

      const res = await storage.bucket(bucketname).upload('./' + filename);
      // `mediaLink` is the URL for the raw contents of the file.
      const url = res[0].metadata.mediaLink;

      // Need to make the file public before you can access it.
      await storage.bucket(bucketname).file(filename).makePublic();

      // Make a request to the uploaded URL.
      const axios = require('axios');
      const pkg = await axios.get(url).then(res => res.data);
      pkg.name; // 'masteringjs.io'
      // acquit:ignore:start
      assert.equal(pkg.name, 'masteringjs.io');
      // acquit:ignore:end
    });
  });

  describe('http request', function() {
    it('basic get', async function() {
      const http = require('http');

      // `res` is an instance of Node's built-in `ServerResponse` class:
      // https://nodejs.org/api/http.html#http_class_http_serverresponse
      const res = await new Promise(resolve => {
        http.get('http://httpbin.org/get?answer=42', resolve);
      });

      // A ServerResponse is a readable stream, so you need to use the
      // stream-to-promise pattern to use it with async/await.
      let data = await new Promise((resolve, reject) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('error', err => reject(err));
        res.on('end', () => resolve(data));
      });

      data = JSON.parse(data);
      data.args; // { answer: 42 }
      // acquit:ignore:start
      assert.deepEqual(data.args, { answer: 42 });
      // acquit:ignore:end
    });
  });
});
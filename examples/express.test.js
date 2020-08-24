'use strict';

const FormData = require('form-data');
const assert = require('assert');
const axios = require('axios');

process.on('unhandledRejection', () => {});

describe('Express', function() {
  describe('https', function() {
    it('works', async function() {
      const fs = require('fs');
      const https = require('https');

      const app = require('express')();
      app.get('*', (req, res) => res.send('<h1>Hello, World</h1>'));

      const server = https.createServer({
        key: fs.readFileSync(`${__dirname}/localhost-key.pem`, 'utf8'),
        cert: fs.readFileSync(`${__dirname}/localhost.pem`, 'utf8')
      }, app);

      await server.listen(443);
      // acquit:ignore:start
      const res = await axios.get('https://localhost');
      assert.ok(res.data.toString().includes('Hello, World'), res);

      server.close();
      // acquit:ignore:end
    });
  });

  describe('redirects', function() {
    it('basic 302', async function() {
      const app = require('express')();

      // The `res.redirect()` function sends back an HTTP 302 by default.
      // When an HTTP client receives a response with status 302, it will send
      // an HTTP request to the URL in the response, in this case `/to`
      app.get('/from', (req, res) => {
        res.redirect('/to');
      });
      app.get('/to', (req, res) => res.send('Hello, World!'));

      const server = await app.listen(3000);

      const res = await axios.get('http://localhost:3000/from');
      // Axios follows the redirect and sends a GET `/to` request, so the
      // response will contain the string "Hello, World!"
      res.data;
      // acquit:ignore:start
      assert.equal(res.data, 'Hello, World!');
      server.close();
      // acquit:ignore:end
    });

    it('301', async function() {
      const app = require('express')();

      app.get('/from', (req, res) => {
        // The optional first parameter to `res.redirect()` is a numeric
        // HTTP status.
        res.redirect(301, '/to');
      });
      app.get('/to', (req, res) => res.send('Hello, World!'));

      const server = await app.listen(3000);

      const res = await axios.get('http://localhost:3000/from');
      // "Hello, World!"
      res.data;
      // acquit:ignore:start
      assert.equal(res.data, 'Hello, World!');
      server.close();
      // acquit:ignore:end
    });

    it('307', async function() {
      const app = require('express')();
      // Parser to set `req.body`
      app.use(require('body-parser').json());

      app.post('/from', (req, res) => {
        res.redirect(307, '/to');
      });
      app.post('/to', (req, res) => res.send(req.body.message));

      const server = await app.listen(3000);

      const res = await axios.post('http://localhost:3000/from', {
        message: 'Hello, World!'
      });
      // "Hello, World!"
      res.data;
      // acquit:ignore:start
      assert.equal(res.data, 'Hello, World!');
      server.close();
      // acquit:ignore:end
    });
  });

  describe('promises', function() {
    it('promise errors', async function() {
      const app = require('express')();

      app.get(async function routeHandler(req, res) {
        // Will throw an error because `req.params.bar` is undefined
        req.params.bar.toString();

        // Request will hang forever because `res.json()` never gets called.
        res.json({ test: 42 });
      });

      const server = await app.listen(3000);

      // Will time out. If not for the `timeout` option, would hang forever.
      const err = await axios.get('http://localhost:3000', { timeout: 300 }).
        catch(err => err);
      err.message; // "timeout of 300ms exceeded"
      // acquit:ignore:start
      assert.equal(err.message, 'timeout of 300ms exceeded');
      await server.close();
      // acquit:ignore:end
    });

    it('wrapper', async function() {
      const app = require('express')();
      const { addAsync } = require('@awaitjs/express');
      addAsync(app);

      // @awaitjs/express adds a `getAsync()` function to Express
      app.getAsync(async function routeHandler(req, res) {
        // The `getAsync()` function knows to look out for promise rejections
        req.params.bar.toString();

        res.json({ test: 42 });
      });
      // acquit:ignore:start
      // Prevent Express from printing
      app.use(function(error, req, res, next) {
        res.status(500).json({ message: error.message });
      });
      // acquit:ignore:end

      const server = await app.listen(3000);

      const err = await axios.get('http://localhost:3000').
        catch(err => err);
      err.message; // "Request failed with status code 500"
      // acquit:ignore:start
      assert.equal(err.message, 'Request failed with status code 500');
      await server.close();
      // acquit:ignore:end
    });

    it('try/catch', async function() {
      const app = require('express')();

      app.get(async function routeHandler(req, res) {
        // Wrap your route handler logic in a try/catch, and make sure
        // to respond if an unexpected error occurs.
        try {
          req.params.bar.toString();

          res.json({ test: 42 });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      });

      const server = await app.listen(3000);

      const err = await axios.get('http://localhost:3000').
        catch(err => err);
      err.message; // "Request failed with status code 500"
      // acquit:ignore:start
      assert.equal(err.message, 'Request failed with status code 500');
      await server.close();
      // acquit:ignore:end
    });

    it('Promise catch', async function() {
      const app = require('express')();

      app.get('/', function routeHandler(req, res) {
        return Promise.resolve().
          then(() => req.params.bar.toString()).
          then(() => res.json({ test: 42 })).
          // Make sure you call `.catch()` on your promise to handle errors!
          catch(err => res.status(500).json({ message: err.message }));
      });

      const server = await app.listen(3000);

      const err = await axios.get('http://localhost:3000').
        catch(err => err);
      err.message; // "Request failed with status code 500"
      // acquit:ignore:start
      assert.equal(err.message, 'Request failed with status code 500');
      await server.close();
      // acquit:ignore:end
    });
  });

  it('file upload', async function() {
    const app = require('express')();
    const formidable = require('formidable');
    const fs = require('fs');

    app.post('/upload', function(req, res) {
      const form = new formidable.IncomingForm();
      // Parse `req` and upload all associated files
      form.parse(req, function(err, fields, files) {
        if (err != null) {
          console.log(err)
          return res.status(400).json({ message: err.message });
        }

        // The `files` object contains all files that were uploaded. Formidable
        // parses each file and uploads it to a temporary file for you.
        const [firstFileName] = Object.keys(files);

        res.json({ filename: firstFileName });
      });
    });

    const server = await app.listen(3000);
    // acquit:ignore:start
    const formData = new FormData();
    formData.append('yinyang.png', fs.createReadStream('./yinyang.png'));
    const res = await axios.post('http://localhost:3000/upload', formData, {
      headers: formData.getHeaders()
    });

    assert.equal(res.data.filename, 'yinyang.png');
    await server.close();
    // acquit:ignore:end
  });

  describe('.Request', function() {
    it('basic', async function() {
      const express = require('express');
      const app = express();

      app.get('*', function(req, res) {
        // `req` is an instance of Node.js' built-in HTTP request class,
        // with some additional features from Express
        req instanceof require('http').IncomingMessage; // true
        // acquit:ignore:start
        assert.ok(req instanceof require('http').IncomingMessage);
        // acquit:ignore:end

        res.json({ ok: 1 });
      });

      const server = await app.listen(3000);
      // acquit:ignore:start
      const res = await axios.get('http://localhost:3000');
      assert.equal(res.data.ok, 1);
      await server.close();
      // acquit:ignore:end
    });

    it('query string', async function() {
      const axios = require('axios');
      const express = require('express');
      const app = express();

      app.get('*', function(req, res) {
        const name = req.query.name; // 'Jean-Luc Picard'
        const rank = req.query.rank; // 'Captain'
        res.json({ name, rank });
      });

      const server = await app.listen(3000);

      // Send a GET request to the server with URL-encoded params in the
      // query string
      const querystring = 'name=Jean-Luc Picard&rank=Captain';
      const res = await axios.get('http://localhost:3000?' + querystring);

      res.data.name; // 'Jean-Luc Picard'
      res.data.rank; // 'Captain'
      // acquit:ignore:start
      assert.equal(res.data.name, 'Jean-Luc Picard');
      assert.equal(res.data.rank, 'Captain');
      await server.close();
      // acquit:ignore:end
    });

    it('params', async function() {
      const axios = require('axios');
      const express = require('express');
      const app = express();

      app.get('/:model/:id', function(req, res) {
        const model = req.params.model; // 'user'
        const id = req.params.id; // '1'
        res.json({ model, id });
      });

      const server = await app.listen(3000);

      // Send a GET request to the server with URL params
      const res = await axios.get('http://localhost:3000/user/1');

      res.data.model; // 'user'
      res.data.id; // '1'
      // acquit:ignore:start
      assert.equal(res.data.model, 'user');
      assert.equal(res.data.id, '1');
      await server.close();
      // acquit:ignore:end
    });

    it('json body', async function() {
      const axios = require('axios');
      const express = require('express');
      const app = express();

      // Parse the request body as JSON. Requires Express >= 4.16.0.
      app.use(express.json());

      app.put('*', function(req, res) {
        const name = req.body.name; // 'Jean-Luc Picard'
        const rank = req.body.rank; // 'Captain'
        res.json({ name, rank });
      });

      const server = await app.listen(3000);

      // Send a PUT request to the server with a request body
      const body = { name: 'Jean-Luc Picard', rank: 'Captain' };
      const res = await axios.put('http://localhost:3000', body);

      res.data.name; // 'Jean-Luc Picard'
      res.data.rank; // 'Captain'
      // acquit:ignore:start
      assert.equal(res.data.name, 'Jean-Luc Picard');
      assert.equal(res.data.rank, 'Captain');
      await server.close();
      // acquit:ignore:end
    });

    it('headers', async function() {
      const axios = require('axios');
      const express = require('express');
      const app = express();

      app.get('*', function(req, res) {
        // `req.get()` is case-insensitive.
        const authorization = req.get('authorization');

        // Or you can use `req.headers`
        req.headers.authorization;

        res.json({ authorization });
      });

      const server = await app.listen(3000);

      // Send a GET request to the server with an 'Authorization' header
      const res = await axios.get('http://localhost:3000', {
        headers: {
          'Authorization': 'test'
        }
      });

      res.data.authorization; // 'test'
      // acquit:ignore:start
      assert.equal(res.data.authorization, 'test');
      await server.close();
      // acquit:ignore:end
    });

    it('body size', async function() {
      const axios = require('axios');
      const express = require('express');
      const app = express();

      // Set the body size limit to 10 bytes
      app.use(express.json({ limit: 10 }));

      app.put('*', function(req, res) {
        const name = req.body.name; // 'Jean-Luc Picard'
        const rank = req.body.rank; // 'Captain'
        res.json({ name, rank });
      });
      // acquit:ignore:start
      app.use(function(err, req, res, next) {
        res.status(err.status);
        res.json({ error: err.message });
        next();
      });
      // acquit:ignore:end

      const server = await app.listen(3000);

      // Send a PUT request to the server with a request body
      const body = { name: 'Jean-Luc Picard', rank: 'Captain' };
      const err = await axios.put('http://localhost:3000', body).
        catch(err => err);

      err.response.status; // 413
      // acquit:ignore:start
      assert.equal(err.response.status, 413);
      await server.close();
      // acquit:ignore:end
    });
  });

  describe('response', function() {
    it('send', async function() {
      const axios = require('axios');
      const express = require('express');
      const app = express();

      app.get('*', function(req, res) {
        res.send('Hello, World');
      });

      const server = await app.listen(3000);

      const response = await axios.get('http://localhost:3000');
      response.data; // 'Hello, World'
      response.headers['content-type']; // 'text/html; charset=utf-8'
      // acquit:ignore:start
      assert.equal(response.data, 'Hello, World');
      assert.equal(response.headers['content-type'], 'text/html; charset=utf-8');

      await server.close();
      // acquit:ignore:end
    });

    it('json', async function() {
      const axios = require('axios');
      const express = require('express');
      const app = express();

      app.get('*', function(req, res) {
        res.json({ answer: 42 });
      });

      const server = await app.listen(3000);

      const response = await axios.get('http://localhost:3000');
      response.data; // { answer: 42 }
      response.headers['content-type']; // 'application/json; charset=utf-8'
      // acquit:ignore:start
      assert.deepEqual(response.data, { answer: 42 });
      assert.equal(response.headers['content-type'],
        'application/json; charset=utf-8');

      await server.close();
      // acquit:ignore:end
    });

    it('json pretty print', async function() {
      const axios = require('axios');
      const express = require('express');
      const app = express();

      // Make Express pass '2' as the 3rd argument to `JSON.stringify()`
      app.set('json spaces', 2);

      app.get('*', function(req, res) {
        res.json({ answer: 42, hello: 'world' });
      });

      const server = await app.listen(3000);

      const response = await axios.get('http://localhost:3000', {
        transformResponse: res => res // Disable automatic JSON parsing
      });
      // {
      //   "answer": 42,
      //   "hello": "world"
      // }
      response.data;
      // acquit:ignore:start
      assert.deepEqual(response.data, [
        '{',
        '  "answer": 42,',
        '  "hello": "world"',
        '}'        
      ].join('\n'));

      await server.close();
      // acquit:ignore:end
    });

    it('pug', async function() {
      const axios = require('axios');
      const express = require('express');
      const app = express();

      // Set 'pug' as the view engine
      app.set('view engine', 'pug');

      app.get('*', function(req, res) {
        // Loads `views/test.pug` and renders it with the given `locals`
        const locals = { message: 'Hello, World' };
        res.render('test', locals);
      });

      const server = await app.listen(3000);

      const response = await axios.get('http://localhost:3000');
      response.data; // '<h1>Hello, World</h1>'
      // acquit:ignore:start
      assert.equal(response.data, '<h1>Hello, World</h1>');

      await server.close();
      // acquit:ignore:end
    });

    it('status', async function() {
      const axios = require('axios');
      const express = require('express');
      const app = express();

      app.get('*', function(req, res) {
        // Sets the response status to 201 "Created". The response status
        // is 200 "OK" by default.
        res.status(201).json({ ok: 1 });
      });

      const server = await app.listen(3000);

      const response = await axios.get('http://localhost:3000');
      response.status; // 201
      // acquit:ignore:start
      assert.equal(response.status, 201);

      await server.close();
      // acquit:ignore:end
    });

    it('set header', async function() {
      const axios = require('axios');
      const express = require('express');
      const app = express();

      app.get('*', function(req, res) {
        // Setting content-type means Chrome will treat this endpoint as
        // an image to download rather than a page to display.    
        res.set('content-type', 'image/svg+xml').send(`
          <svg width="100" height="100">
            <circle cx="50" cy="50" r="40" stroke="blue" stroke-width="4" fill="white" />
          </svg>
        `);
      });

      const server = await app.listen(3000);

      const response = await axios.get('http://localhost:3000');
      response.headers['content-type']; // image/svg+xml; charset=utf-8
      // acquit:ignore:start
      assert.equal(response.headers['content-type'],
        'image/svg+xml; charset=utf-8');

      await server.close();
      // acquit:ignore:end
    });
  });

  describe('error handling', function() {
    it('basic', async function() {
      const app = require('express')();

      app.get('*', function routeHandler() {
        throw new Error('Oops!');
      });

      // Your function  **must** take 4 parameters for Express to consider it
      // error handling middleware.
      app.use((err, req, res, next) => {
        res.status(500).json({ message: err.message });
      });
      // acquit:ignore:start
      const server = await app.listen(3000);

      const err = await axios.get('http://localhost:3000').
        then(() => null, err => err);

      assert.equal(err.response.data.message, 'Oops!');
      await server.close();
      // acquit:ignore:end      
    });

    it('async', async function() {
      const app = require('express')();

      app.get('*', async function asyncRouteHandler(req, res, next) {
        try {
          throw new Error('Oops!');
        } catch (err) {
          // The `next()` function tells Express to go to the next middleware
          // in the chain. Express doesn't handle async errors, so you need to
          // report errors by calling `next()`.
          return next(err);
        }
      });

      app.use((err, req, res, next) => {
        res.status(500).json({ message: err.message });
      });
      // acquit:ignore:start
      const server = await app.listen(3000);

      const err = await axios.get('http://localhost:3000').
        then(() => null, err => err);

      assert.equal(err.response.data.message, 'Oops!');
      await server.close();
      // acquit:ignore:end      
    });
  });

  describe('middleware', function() {
    it('next with no more middleware', async function() {
      // acquit:ignore:start
      const app = require('express')();
      // acquit:ignore:end
      // It is OK to call `next()` even if there's no more middleware.
      app.use((req, res, next) => {
        res.send('Hello, World');
        next();
      });
      // acquit:ignore:start
      const server = await app.listen(3000);

      const res = await axios.get('http://localhost:3000');

      assert.equal(res.data, 'Hello, World');
      await server.close();
      // acquit:ignore:end
    });

    it('next with error', async function() {
      // acquit:ignore:start
      const app = require('express')();
      // acquit:ignore:end
      app.use((req, res, next) => {
        next(new Error('Fail!'));
      });
      // acquit:ignore:start
      app.use(function(err, req, res, next) {
        res.status(500).send(err.message);
      });
      const server = await app.listen(3000);

      const err = await axios.get('http://localhost:3000').
        then(() => null, err => err);

      assert.ok(err.response.data.indexOf('Fail!') !== -1, err.response.data);
      //await server.close();
      // acquit:ignore:end
    });
  });

  describe('cors', function() {
    it('basic example', async function() {
      const app = require('express')();
      // Set CORS headers on all responses
      app.use(require('cors')());

      app.get('/', (req, res) => res.send('Hello, World!'));
      const server = await app.listen(3000);

      // Make an example request to see that, yep, the CORS headers are set
      const axios = require('axios');
      const res = await axios.get('http://localhost:3000');
      res.headers['access-control-allow-origin']; // '*'
      // acquit:ignore:start
      assert.equal(res.headers['access-control-allow-origin'], '*');

      await server.close();
      // acquit:ignore:end
    });

    it('subset', async function() {
      const app = require('express')();
      // Set CORS headers on responses to any requests whose URL starts with
      // '/api'
      app.use('/api', require('cors')());

      app.get('/api/test', (req, res) => res.json({ ok: 1 }));
      app.get('/', (req, res) => res.send('Hello, World!'));
      const server = await app.listen(3000);

      // Make an example request to see that CORS headers are set on
      // `/api/test`, but not `/`
      const axios = require('axios');
      let res = await axios.get('http://localhost:3000');
      res.headers['access-control-allow-origin']; // undefined
      // acquit:ignore:start
      assert.strictEqual(res.headers['access-control-allow-origin'], void 0);
      // acquit:ignore:end

      res = await axios.get('http://localhost:3000/api/test');
      res.headers['access-control-allow-origin']; // '*'      
      // acquit:ignore:start
      assert.equal(res.headers['access-control-allow-origin'], '*');
      await server.close();
      // acquit:ignore:end
    });

    it('custom', async function() {
      const app = require('express')();

      // Need to handle 'OPTIONS' requests for pre-flight
      app.options('*', (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.send('ok');
      });

      // As well as set 'Access-Control-Allow-Origin' on the actual response
      app.get('/', (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.send('Hello, World!')
      });
      const server = await app.listen(3000);
      // acquit:ignore:start
      const axios = require('axios');
      const res = await axios.get('http://localhost:3000/api/test');
      res.headers['access-control-allow-origin']; // '*'      
      assert.equal(res.headers['access-control-allow-origin'], '*');
      await server.close();
      // acquit:ignore:end
    });
  });

  describe('router', function() {
    it('testing', async function() {
      const app = require('express')();
      app.get('/route1', (req, res) => res.send('Hello, World!'));
      // `app.listen()` returns a promise. Once this promise
      // resolves, that means Express is ready to handle requests.
      const server = await app.listen(3000);

      const axios = require('axios');
      const res = await axios.get('http://localhost:3000/route1');
      res.data; // 'Hello, World!'
      // acquit:ignore:start
      assert.equal(res.data, 'Hello, World!');
      await server.close();
      // acquit:ignore:end
    });
  });

  describe('request body', function() {
    it('json middleware', async function() {
      const express = require('express');
      const app = express();

      // Parse JSON bodies for this app. Make sure you put
      // `app.use(express.json())` **before** your route handlers!
      app.use(express.json());

      app.post('*', (req, res) => {
        req.body; // JavaScript object containing the parse JSON
        res.json(req.body);
      });
      const server = await app.listen(3000);

      // Demo showing the server in action
      const axios = require('axios');
      const res = await axios.post('http://localhost:3000/', {
        answer: 42
      });
      res.data; // `{ answer: 42 }`
      // acquit:ignore:start
      assert.deepEqual(res.data, { answer: 42 });
      await server.close();
      // acquit:ignore:end
    });

    it('malformed json', async function() {
      const express = require('express');
      const app = express();
      app.use(express.json());
      app.post('*', (req, res) => {
        res.json(req.body);
      });

      // Add error handling middleware that Express will call
      // in the event of malformed JSON.
      app.use(function(err, req, res, next) {
        // 'SyntaxError: Unexpected token n in JSON at position 0'
        err.message;
        next(err);
      });
      // acquit:ignore:start
      app.use(function(err, req, res, next) {
        res.status(err.status).send(err.message);
      });
      // acquit:ignore:end
      const server = await app.listen(3000);

      // Demonstrate the server in action
      const axios = require('axios');
      const headers = { 'Content-Type': 'application/json' };
      const err = await axios.
        post('http://localhost:3000/', 'not json', { headers }).
        then(() => null, err => err);

      // Express will send an HTTP 400 by default if JSON middleware
      // failed to parse.
      err.response.status; // 400
      err.message; // 'Request failed with status code 400'
      // acquit:ignore:start
      assert.equal(err.response.status, 400);
      assert.equal(err.message, 'Request failed with status code 400');
      await server.close();
      // acquit:ignore:end
    });

    it('content type', async function() {
      const express = require('express');
      const app = express();
      app.use(express.json());
      app.post('*', (req, res) => {
        // undefined, body parser ignored this request
        // because of the content-type header
        req.body;
        // acquit:ignore:start
        assert.strictEqual(res.body, void 0);
        // acquit:ignore:end
        res.json(req.body);
      });
      const server = await app.listen(3000);

      // Demo of making a request the JSON body parser ignores.
      const axios = require('axios');
      const headers = { 'Content-Type': 'text/plain' };
      const res = await axios.
        post('http://localhost:3000/', 'not json', { headers });

      res.data; // Empty object `{}`
      // acquit:ignore:start
      assert.deepEqual(res.data, {});
      await server.close();
      // acquit:ignore:end
    });

    it('url encoded', async function() {
      const express = require('express');
      const app = express();
      app.use(require('body-parser').urlencoded({ extended: false }));
      app.post('*', (req, res) => {
        req.body; // { answer: 42 }
        // acquit:ignore:start
        assert.deepEqual(req.body, { answer: 42 });
        // acquit:ignore:end
        res.json(req.body);
      });
      const server = await app.listen(3000);

      // Demo of making a request with a URL-encoded body.
      const axios = require('axios');
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      const res = await axios.
        post('http://localhost:3000/', 'answer=42', { headers });

      res.data; // { answer: 42 }
      // acquit:ignore:start
      assert.deepEqual(res.data, { answer: 42 });
      await server.close();
      // acquit:ignore:end
    });
  });

  describe('route parameters', function() {
    it('basic example', async function() {
      const app = require('express')();

      // `:userId` is a route parameter. Express will capture whatever
      // string comes after `/user/` in the URL and store it in
      // `req.params.userId`
      app.get('/user/:userId', (req, res) => {
        req.params; // { userId: '42' }
        res.json(req.params);
      });

      const server = await app.listen(3000);
      // Demo of making a request to the server
      const axios = require('axios');
      const res = await axios.get('http://localhost:3000/user/42');

      res.data; // { userId: '42' }
      // acquit:ignore:start
      assert.deepStrictEqual(res.data, { userId: '42' });
      await server.close();
      // acquit:ignore:end
    });

    it('multiple', async function() {
      const app = require('express')();

      app.get('/user/:userId/books/:bookId', (req, res) => {
        req.params; // { userId: '42', bookId: '101' }
        res.json(req.params);
      });

      const server = await app.listen(3000);
      // Demo of making a request to the server
      const axios = require('axios');
      const res = await axios.get('http://localhost:3000/user/42/books/101')

      res.data; // { userId: '42', bookId: '101' }
      // acquit:ignore:start
      assert.deepStrictEqual(res.data, { userId: '42', bookId: '101' });
      await server.close();
      // acquit:ignore:end
    });
  });

  describe('query parameters', function() {
    it('basic example', async function() {
      const app = require('express')();

      app.get('*', (req, res) => {
        req.query; // { a: '1', b: '2' }
        res.json(req.query);
      });

      const server = await app.listen(3000);
      // Demo of making a request to the server
      const axios = require('axios');
      const res = await axios.get('http://localhost:3000/?a=1&b=2')

      res.data; // { a: '1', b: '2' }
      // acquit:ignore:start
      assert.deepStrictEqual(res.data, { a: '1', b: '2' });
      await server.close();
      // acquit:ignore:end
    });

    it('array', async function() {
      const app = require('express')();

      app.get('*', (req, res) => {
        req.query; // { color: ['black', 'yellow'] }
        res.json(req.query);
      });

      const server = await app.listen(3000);
      // Demo of making a request to the server
      const axios = require('axios');
      const querystring = '?color=black&color=yellow';
      const res = await axios.get('http://localhost:3000/' + querystring);

      res.data; // { color: ['black', 'yellow'] }
      // acquit:ignore:start
      assert.deepStrictEqual(res.data, { color: ['black', 'yellow'] });
      await server.close();
      // acquit:ignore:end
    });

    it('simple', async function() {
      const app = require('express')();

      // Only parse query parameters into strings, not objects
      app.set('query parser', 'simple');

      app.get('*', (req, res) => {
        req.query; // { color: ['black', 'yellow'], 'shoe[color]': 'white' }
        res.json(req.query);
      });

      const server = await app.listen(3000);
      // Demo of making a request to the server
      const axios = require('axios');
      const querystring = '?color=black&color=yellow&shoe[color]=white';
      const res = await axios.get('http://localhost:3000/' + querystring);

      res.data; // { color: ['black', 'yellow'], 'shoe[color]': 'white' }
      // acquit:ignore:start
      assert.deepStrictEqual(res.data, {
        color: ['black', 'yellow'],
        'shoe[color]': 'white'
      });
      await server.close();
      // acquit:ignore:end
    });
  });

  describe('websockets', function() {
    const _consoleLog = console.log;
    let logs = [];

    beforeEach(() => {
      logs = [];
      console.log = function() {
        logs.push(Array.prototype.slice.call(arguments));
      };
    });
    afterEach(function() {
      console.log = _consoleLog;
    });

    it('basic example', async function() {
      const express = require('express');
      const ws = require('ws');

      const app = express();

      // Set up a headless websocket server that prints any
      // events that come in.
      const wsServer = new ws.Server({ noServer: true });
      wsServer.on('connection', socket => {
        socket.on('message', message => console.log(message));
      });

      // `server` is a vanilla Node.js HTTP server, so use
      // the same ws upgrade process described here:
      // https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
      const server = app.listen(3000);
      server.on('upgrade', (request, socket, head) => {
        wsServer.handleUpgrade(request, socket, head, socket => {
          wsServer.emit('connection', socket, request);
        });
      });
      // acquit:ignore:start
      const client = new ws('ws://localhost:3000');

      client.on('open', () => {
        client.send('Hello');
      });

      await new Promise(resolve => setTimeout(resolve, 100));
      assert.deepEqual(logs, [['Hello']]);

      await server.close();
      await wsServer.close();
      // acquit:ignore:end
    });
  });

  describe('render html', function() {
    it('from string', async function() {
      const html = '<h1>Hello, World!</h1>';

      const express = require('express');

      const app = express();
      app.get('*', (req, res) => {
        // That's all you need to do! If you pass a string to `res.send()`,
        // Express sets the response-type header to `text/html`
        res.send(html);
      });

      const server = await app.listen(3000);

      // Example of using the server
      const axios = require('axios');

      const res = await axios.get('http://localhost:3000');
      res.headers['content-type']; // 'text/html; charset=utf-8'
      res.data; // '<h1>Hello, World!</h1>'
      // acquit:ignore:start
      await server.close();

      assert.equal(res.headers['content-type'], 'text/html; charset=utf-8');
      assert.equal(res.data, '<h1>Hello, World!</h1>');
      // acquit:ignore:end
    });
  });
});
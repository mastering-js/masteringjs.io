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

      app.get(function routeHandler(req, res) {
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
          return res.json({ message: err.message });
        }

        // The `files` object contains all files that were uploaded. Formidable
        // parses each file and uploads it to a temporary file for you.
        const [firstFileName] = Object.keys(files);

        // The `path` property is where formidable stored the file
        console.log(files[firstFileName].path);

        // You can read the file and print it out.
        fs.readFile(files[firstFileName].path, function(err, content) {
          if (err != null) {
            return res.json({ message: err.message });
          }
          res.json({ content: content.toString('utf8') });
        });
      });
    });

    const server = await app.listen(3000);
    // acquit:ignore:start
    const Writable = require('readable-stream').Writable;
    class ConcatStream extends Writable {
      constructor(cb) {
        super();

        this.on('finish', () => cb(null, this._body));
      }

      _write(chunk, enc, next) {
        if (this._body == null) {
          this._body = '';
        }
        this._body = this._body + chunk.toString();
        next();
      }
    }
    const fd = new FormData();
    fd.append('file.txt', 'Hello World', {
      filename: 'file.txt',
      contentType: 'text/plain',
      knownLength: 'Hello World'.length
    });
    const content = await new Promise(resolve => {
      fd.pipe(new ConcatStream((err, res) => resolve(res)));
    });
    const res = await axios.post('http://localhost:3000/upload', content, {
      headers: fd.getHeaders()
    });

    assert.equal(res.data.content, 'Hello World');
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
});
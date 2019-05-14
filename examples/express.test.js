'use strict';

const assert = require('assert');
const axios = require('axios');

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
});
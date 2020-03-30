'use strict';

const assert = require('assert');
const axios = require('axios');
const express = require('express');

describe('axios', function() {
  it('setting headers with GET', async function() {
    const axios = require('axios');

    // httpbin.org gives you the headers in the response
    // body `res.data`.
    // See: https://httpbin.org/#/HTTP_Methods/get_get
    const res = await axios.get('https://httpbin.org/get', {
      headers: {
        'Test-Header': 'test-value'
      }
    });

    res.data.headers['Test-Header']; // "test-value"
    // acquit:ignore:start
    assert.equal(res.data.headers['Test-Header'], 'test-value');
    // acquit:ignore:end
  });

  it('setting headers with POST', async function() {
    const res = await axios.post('https://httpbin.org/post', { hello: 'world' }, {
      headers: {
        'Test-Header': 'test-value'
      }
    });

    res.data.headers['Test-Header']; // "test-value"
    // acquit:ignore:start
    assert.equal(res.data.headers['Test-Header'], 'test-value');
    // acquit:ignore:end
  });

  describe('POST requests', function() {
    it('basic example', async function() {
      const res = await axios.post('https://httpbin.org/post', { hello: 'world' });

      res.data.json; // { hello: 'world' }
      // acquit:ignore:start
      assert.deepEqual(res.data.json, { hello: 'world' });
      // acquit:ignore:end
    });

    it('headers', async function() {
      const res = await axios.post('https://httpbin.org/post', { hello: 'world' });

      res.data.headers['Content-Type']; // application/json;charset=utf-8
      // acquit:ignore:start
      assert.equal(res.data.headers['Content-Type'],
        'application/json;charset=utf-8');
      // acquit:ignore:end
    });

    it('content-type', async function() {
      const res = await axios.post('https://httpbin.org/post', { hello: 'world' }, {
        headers: {
          // 'application/json' is the modern content-type for JSON, but some
          // older servers may use 'text/json'.
          // See: http://bit.ly/text-json
          'content-type': 'text/json'
        }
      });

      res.data.headers['Content-Type']; // text/json
      // acquit:ignore:start
      assert.equal(res.data.headers['Content-Type'], 'text/json');
      // acquit:ignore:end
    });

    it('string', async function() {
      const res = await axios.post('https://httpbin.org/post', 'hello=world');

      res.data.form; // { hello: 'world' }
      res.data.headers['Content-Type']; // application/x-www-form-urlencoded
      // acquit:ignore:start
      assert.deepEqual(res.data.form, { hello: 'world' });
      assert.equal(res.data.headers['Content-Type'],
        'application/x-www-form-urlencoded');
      // acquit:ignore:end
    });
  });

  describe('basic auth', function() {
    it('works', async function() {
      const res = await axios.get('https://httpbin.org/basic-auth/foo/bar', {
        // Axios looks for the `auth` option, and, if it is set, formats a
        // basic auth header for you automatically.
        auth: {
          username: 'foo',
          password: 'bar'
        }
      });
      res.status; // 200
      // acquit:ignore:start
      assert.equal(res.status, 200);
      // acquit:ignore:end
    });

    it('error case', async function() {
      const err = await axios.
        get('https://httpbin.org/basic-auth/foo/bar', {
          auth: {
            username: 'foo',
            password: 'baz' // Bad password
          }
        }).
        catch(err => err);
      err.message; // "Request failed with status code 401"
      err.response.status; // 401 "Unauthorized"
      // acquit:ignore:start
      assert.equal(err.message, 'Request failed with status code 401');
      assert.equal(err.response.status, 401);
      // acquit:ignore:end
    });
  });

  describe('interceptors', function() {
    it('default error message', async function() {
      const app = express();
      app.get('*', (req, res) => {
        res.status(404).json({ message: `Could not find page ${req.url}` });
      });
      const server = await app.listen(3000);

      const err = await axios.get('http://localhost:3000/test').
        catch(err => err);
      // "Request failed with status code 404"
      err.message;
      // acquit:ignore:start
      assert.equal(err.message, 'Request failed with status code 404');
      server.close();
      // acquit:ignore:end
    });

    it('using interceptors', async function() {
      // acquit:ignore:start
      const app = express();
      app.get('*', (req, res) => {
        res.status(404).json({ message: `Could not find page ${req.url}` });
      });
      const server = await app.listen(3000);
      // acquit:ignore:end
      // Create an Axios instance to 
      const client = axios.create();
      // Interceptors take 2 parameters:
      // Axios calls the first function if the request succeeds
      // Axios calls the second function if the request fails
      client.interceptors.response.use(
        res => res,
        err => {
          throw new Error(err.response.data.message);
        }
      )
      const err = await client.get('http://localhost:3000/test').
        catch(err => err);
      // "Could not find page /test"
      err.message;
      // acquit:ignore:start
      assert.equal(err.message, 'Could not find page /test');
      server.close();
      // acquit:ignore:end
    });
  });

  describe('#create', function() {
    it('basic example', async function() {
      const axios = require('axios');
      const instance = axios.create({ timeout: 1000 });

      // `instance` is an instance of the same class as `axios`, so it has
      // the same methods
      axios.constructor === instance.constructor; // true

      // For example, `instance.get()` lets you send a GET request, but
      // it will also have the 1000ms timeout.
      await instance.get('https://httpbin.org/get?hello=world');
    });

    it('baseURL', async function() {
      const axios = require('axios').create({
        baseURL: 'https://httpbin.org'
      });

      // Sends request to 'https://httpbin.org/get' 
      const res = await axios.get('/get?hello=world');
      // acquit:ignore:start
      assert.deepEqual(res.data.args, { hello: 'world' });
      // acquit:ignore:end
    });
  });

  describe('#then', function() {
    it('is a promise', async function() {
      const axios = require('axios');

      const req = axios.get('https://httpbin.org/get?hello=world');

      req instanceof Promise; // true
      // acquit:ignore:start
      assert.ok(req instanceof Promise);
      // acquit:ignore:end

      const res = await req;
      res.data.args; // { hello: 'world' }
      // acquit:ignore:start
      assert.deepEqual(res.data.args, { hello: 'world' });
      // acquit:ignore:end
      return req.then(res => {
        res.data.args; // { hello: 'world' }
        // acquit:ignore:start
        assert.deepEqual(res.data.args, { hello: 'world' });
        // acquit:ignore:end
      });
    });

    it('error handling', async function() {
      const axios = require('axios');

      const err = await axios.get('https://httpbin.org/status/404').
        then(() => null, err => err);

      err.response.status; // 404
      err.response.statusText; // 'NOT FOUND'
      // acquit:ignore:start
      assert.equal(err.response.status, 404);
      assert.equal(err.response.statusText, 'NOT FOUND');
      // acquit:ignore:end
    });

    it('executes immediately', async function() {
      const axios = require('axios');
      const express = require('express');

      // Create a dummy Express server that stores all inbound
      // requests
      const app = express();
      const requests = [];
      app.get('*', function(req, res) {
        requests.push(req);
        res.json({ ok: 1 });
      });
      const server = await app.listen(3000);

      // Send a request without calling `then()`.
      axios.get('http://localhost:3000');

      // The server got the request.
      await new Promise(resolve => setTimeout(resolve, 100));
      requests.length; // 1
      // acquit:ignore:start
      assert.equal(requests.length, 1);
      await server.close();
      // acquit:ignore:end
    });
  });
});
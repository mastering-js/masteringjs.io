'use strict';

const assert = require('assert');
const axios = require('axios');
const express = require('express');
const sinon = require('sinon');

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

  describe('PUT requests', function() {
    it('basic example', async function() {
      const res = await axios.put('https://httpbin.org/put', { hello: 'world' });

      res.data.json; // { hello: 'world' }
      // acquit:ignore:start
      assert.deepEqual(res.data.json, { hello: 'world' });
      // acquit:ignore:end
    });

    it('headers', async function() {
      const res = await axios.put('https://httpbin.org/put', { hello: 'world' });

      res.data.headers['Content-Type']; // application/json;charset=utf-8
      // acquit:ignore:start
      assert.equal(res.data.headers['Content-Type'],
        'application/json;charset=utf-8');
      // acquit:ignore:end
    });

    it('string', async function() {
      const res = await axios.put('https://httpbin.org/put', 'hello=world');

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

  describe('Authorization header', function() {
    it('on GET', async function() {
      // Send a GET request with the authorization header set to
      // the string 'my secret token'
      const res = await axios.get('https://httpbin.org/get', {
        headers: {
          authorization: 'my secret token'
        }
      });
      // acquit:ignore:start
      assert.equal(res.data.headers.Authorization, 'my secret token');
      // acquit:ignore:end
    });

    it('case insensitive', async function() {
      // Send a GET request with the authorization header set to
      // the string 'my secret token'
      const res = await axios.get('https://httpbin.org/get', {
        headers: {
          'Authorization': 'my secret token'
        }
      });
      // acquit:ignore:start
      assert.equal(res.data.headers.Authorization, 'my secret token');
      // acquit:ignore:end
    });

    it('on POST', async function() {
      // Send a POST request with the authorization header set to
      // the string 'my secret token'. With `post()`, the 3rd parameter
      // is the request options, not the 2nd parameter like with `get()`.
      const body = {};
      const res = await axios.post('https://httpbin.org/post', body, {
        headers: {
          'Authorization': 'my secret token'
        }
      });
      // acquit:ignore:start
      assert.equal(res.data.headers.Authorization, 'my secret token');
      // acquit:ignore:end
    });
  });

  describe('FormData', function() {
    it('works in node', async function() {
      const axios = require('axios');
      const FormData = require('form-data');

      const form = new FormData();
      form.append('key', 'value');
      const res = await axios.post('https://httpbin.org/post', form);
      console.log(res.data);
    });
  });

  describe('Interceptors', function() {
    let called = [];
    const _log = console.log;

    beforeEach(function() {
      called = [];
      sinon.stub(console, 'log').callsFake(msg => called.push(msg));
    });

    afterEach(function() {
      console.log.restore();
      const axios = require('axios');
      axios.interceptors.request.handlers = [];
      axios.interceptors.response.handlers = [];
    });

    it('print request', async function() {
      const axios = require('axios');

      axios.interceptors.request.use(req => {
        console.log(`${req.method} ${req.url}`);
        // Important: request interceptors **must** return the request.
        return req;
      });

      // Prints "get https://httpbin.org/get"
      await axios.get('https://httpbin.org/get');
      // acquit:ignore:start
      assert.deepStrictEqual(called, ['get https://httpbin.org/get']);
      // acquit:ignore:end

      // Prints "post https://httpbin.org/post"
      await axios.post('https://httpbin.org/post', {});
      // acquit:ignore:start
      assert.deepStrictEqual(called, [
        'get https://httpbin.org/get',
        'post https://httpbin.org/post'
      ]);
      // acquit:ignore:end
    });

    it('print response', async function() {
      const axios = require('axios');

      axios.interceptors.request.use(req => {
        console.log(`${req.method} ${req.url}`);
        // Important: request interceptors **must** return the request.
        return req;
      });

      axios.interceptors.response.use(res => {
        console.log(res.data.json);
        // Important: response interceptors **must** return the response.
        return res;
      });

      // Prints "post https://httpbin.org/post" followed by "{ answer: 42 }"
      await axios.post('https://httpbin.org/post', { answer: 42 });
      // acquit:ignore:start
      assert.deepStrictEqual(called, [
        'post https://httpbin.org/post',
        { answer: 42 }
      ]);
      // acquit:ignore:end
    });

    it('authorization header', async function() {
      axios.interceptors.request.use(req => {
        // `req` is the Axios request config, so you can modify
        // the `headers`.
        req.headers.authorization = 'my secret token';
        return req;
      });

      // Automatically sets the authorization header because
      // of the request interceptor
      const res = await axios.get('https://httpbin.org/get');

      // acquit:ignore:start
      assert.equal(res.data.headers.Authorization, 'my secret token');
      // acquit:ignore:end
    });

    it('error handling', async function() {
      axios.interceptors.response.use(
        res => res,
        err => {
          if (err.response.status === 404) {
            throw new Error(`${err.config.url} not found`);
          }
          throw err;
        }
      );

      // Automatically sets the authorization header because
      // of the request interceptor
      const err = await axios.get('https://httpbin.org/status/404').
        then(() => null, err => err);

      err.message; // "https://httpbin.org/status/404 not found"
      // acquit:ignore:start
      assert.equal(err.message, 'https://httpbin.org/status/404 not found');
      // acquit:ignore:end
    });
  });

  describe('catch', function() {
    it('basic error', async function() {
      const err = await axios.get('https://httpbin.org/status/404').
        catch(err => err);
      
      err instanceof Error; // true
      err.message; // 'Request failed with status code 404'
      // acquit:ignore:start
      assert.ok(err instanceof Error);
      assert.equal(err.message, 'Request failed with status code 404');
      // acquit:ignore:end
    });

    it('chain', async function() {
      const err = await axios.get('https://httpbin.org/status/200').
        // Will throw a TypeError because the property doesn't exist.
        then(res => res.doesNotExist.throwAnError).
        catch(err => err);
      
      err instanceof TypeError; // true
      // acquit:ignore:start
      assert.ok(err instanceof TypeError);
      // acquit:ignore:end
    });

    it('rethrow', async function() {
      let error;
      try {
        await axios.get('https://httpbin.org/status/404').catch(err => {
          if (err.response.status === 404) {
            throw new Error(`${err.config.url} not found`);
          }
          throw err;
        });
      } catch (err) {
        error = err;
      }

      error.message; // "https://httpbin.org/status/404 not found"
      // acquit:ignore:start
      assert.equal(error.message, 'https://httpbin.org/status/404 not found');
      // acquit:ignore:end
    });
  });

  describe('post json', function() {
    it('automatically serializes', async function() {
      // Axios automatically serializes `{ answer: 42 }` into JSON.
      const res = await axios.post('https://httpbin.org/post', { answer: 42 });

      res.data.data; // '{"answer":42}'
      res.data.headers['Content-Type']; // 'application/json;charset=utf-8',
      // acquit:ignore:start
      assert.equal(res.data.data, '{"answer":42}');
      assert.equal(res.data.headers['Content-Type'], 'application/json;charset=utf-8');
      // acquit:ignore:end
    });

    it('with string', async function() {
      const json = JSON.stringify({ answer: 42 });
      const res = await axios.post('https://httpbin.org/post', json);

      // Axios automatically sets the `Content-Type` based on the
      // 2nd parameter to `axios.post()`.
      res.data.headers['Content-Type']; // 'application/x-www-form-urlencoded',
      // acquit:ignore:start
      assert.equal(res.data.headers['Content-Type'], 'application/x-www-form-urlencoded');
      // acquit:ignore:end
    });

    it('content-type with string', async function() {
      const json = JSON.stringify({ answer: 42 });
      const res = await axios.post('https://httpbin.org/post', json, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }
      });

      res.data.data; // '{"answer":42}'
      res.data.headers['Content-Type']; // 'application/json',
      // acquit:ignore:start
      assert.equal(res.data.data, '{"answer":42}');
      assert.equal(res.data.headers['Content-Type'], 'application/json');
      // acquit:ignore:end
    });
  });

  describe('get request', function() {
    it('basic example', async function() {
      const axios = require('axios');

      const res = await axios.get('https://httpbin.org/get?answer=42');

      res.data.args; // { answer: 42 }
      // acquit:ignore:start
      assert.deepEqual(res.data.args, { answer: 42 });
      // acquit:ignore:end
    });

    it('params', async function() {
      const axios = require('axios');

      const res = await axios.get('https://httpbin.org/get', { params: { answer: 42 } });

      res.data.args; // { answer: 42 }
      // acquit:ignore:start
      assert.deepEqual(res.data.args, { answer: 42 });
      // acquit:ignore:end
    });
  });

  describe('response body', function() {
    it('basic example', async function() {
      const axios = require('axios');

      const res = await axios.get('https://httpbin.org/get', { params: { answer: 42 } });

      res.constructor.name; // 'Object', means `res` is a POJO

      // `res.data` contains the parsed response body
      res.data; // { args: { answer: 42 }, ... }
      res.data instanceof Object; // true
      // acquit:ignore:start
      assert.equal(res.constructor.name, 'Object');
      assert.deepEqual(res.data.args, { answer: 42 });
      // acquit:ignore:end
    });

    it('json content type', async function() {
      const axios = require('axios');

      const res = await axios.get('https://httpbin.org/get', { params: { answer: 42 } });

      res.headers['content-type']; // 'application/json'
      // acquit:ignore:start
      assert.deepEqual(res.headers['content-type'], 'application/json');
      // acquit:ignore:end
    });

    it('html content type', async function() {
      const axios = require('axios');

      const res = await axios.get('https://httpbin.org/html');

      res.headers['content-type']; // 'text/html; charset=utf-8'

      typeof res.data; // 'string'
      res.data; // '... <h1>Herman Melville - Moby-Dick</h1> ...'
      // acquit:ignore:start
      assert.deepEqual(res.headers['content-type'], 'text/html; charset=utf-8');
      assert.equal(typeof res.data, 'string');
      assert.ok(res.data.includes('<h1>Herman Melville - Moby-Dick</h1>'));
      // acquit:ignore:end
    });

    it('arraybuffer', async function() {
      const axios = require('axios');

      const res = await axios.get('https://images.unsplash.com/photo-1506812574058-fc75fa93fead', {
        responseType: 'arraybuffer'
      });

      const fs = require('fs');
      fs.writeFileSync('./south-beach.jpg', res.data);
    });

    it('stream', async function() {
      const axios = require('axios');

      const res = await axios.get('https://images.unsplash.com/photo-1506812574058-fc75fa93fead', {
        responseType: 'stream'
      });

      const fs = require('fs');
      res.data.pipe(fs.createWriteStream('./south-beach.jpg'));
    });
  });
});
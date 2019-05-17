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
});
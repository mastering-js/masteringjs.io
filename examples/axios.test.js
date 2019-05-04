'use strict';

const assert = require('assert');
const axios = require('axios');

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
});
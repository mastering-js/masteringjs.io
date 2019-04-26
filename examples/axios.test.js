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
    const res = await axios.post('https://httpbin.org/get', { hello: 'world' }, {
      headers: {
        'Test-Header': 'test-value'
      }
    });

    res.data.headers['Test-Header']; // "test-value"
    // acquit:ignore:start
    assert.equal(res.data.headers['Test-Header'], 'test-value');
    // acquit:ignore:end
  });
});
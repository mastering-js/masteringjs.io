'use strict';

const assert = require('assert');
const axios = require('axios');

describe('Mocha', function() {
  it('axios example', async function() {
    const axios = require('axios');
    // acquit:ignore:start
    const res = await axios.get('http://httpbin.org/get?answer=42');
    assert.equal(res.data.args.answer, 42);
    // acquit:ignore:end

    function get(url, cb) {
      return axios.get(url);
    }
  });
});
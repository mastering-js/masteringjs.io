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
});
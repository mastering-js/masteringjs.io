'use strict';

const Vue = require('vue');
const assert = require('assert');
const axios = require('axios');

describe('Vue', function() {
  it('ssr', async function() {
    const { renderToString } = require('vue-server-renderer').createRenderer();
    const expressApp = require('express')();

    expressApp.get('*', (req, res) => {
      const app = new Vue({
        // Initialize with data from the request.
        data: { content: req.query.content },
        template: '<div>{{content}}</div>'
      });
      renderToString(app).
        // Sends '<div data-server-rendered="true">Hello, World</div>'
        then(html => res.send(html)).
        catch(err => res.status(500).send(err.stack));
    });

    const server = await expressApp.listen(3000);
    // acquit:ignore:start
    const res = await axios.get('http://localhost:3000?content=Hello, World');
    assert.equal(res.data, '<div data-server-rendered="true">Hello, World</div>');
    server.close();
    // acquit:ignore:end
  });
});
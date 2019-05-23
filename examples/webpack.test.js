'use strict';

const assert = require('assert');
const fs = require('fs');
const webpack = require('webpack');

describe('Webpack', function() {
  describe('watch', function() {
    before(async function() {
      fs.writeFileSync(`${__dirname}/example/app.js`,
        'module.exports = \'test\';');
    });

    it('basic example', async function() {
      // acquit:ignore:start
      let called = 0;
      // acquit:ignore:end
      const webpack = require('webpack');

      // Defining the webpack config inline, but you can replace this
      // with `require('./webpack.config.js')`
      const config = {
        mode: 'development',
        entry: `${__dirname}/example/app.js`,
        output: {
          path: `${__dirname}/example`,
          filename: 'app.min.js'
        }
      };
      const compiler = webpack(config);
      const watcher = compiler.watch({}, function(err) {
        // Gets called every time Webpack finishes recompiling.
        // acquit:ignore:start
        ++called;
        // acquit:ignore:end
      });

      fs.writeFileSync(`${__dirname}/example/app.js`,
        'module.exports = \'Hello, World\';');
      // acquit:ignore:start
      await new Promise(resolve => setTimeout(resolve, 250))
      const content = fs.readFileSync(`${__dirname}/example/app.min.js`, 'utf8');
      assert.ok(content.includes('Hello, World'));
      assert.ok(called > 0);
      watcher.close();
      // acquit:ignore:end
    });

    it('with Express', async function() {
      const app = require('express')();
      const webpack = require('webpack');

      app.use(require('express-static')(`${__dirname}/example`));
      const server = await app.listen(3000);

      const config = {
        mode: 'development',
        entry: `${__dirname}/example/app.js`,
        output: {
          path: `${__dirname}/example`,
          filename: 'app.min.js'
        }
      };
      const compiler = webpack(config);
      const watcher = compiler.watch({}, function(err) {
        // Gets called every time Webpack finishes recompiling.
      });

      fs.writeFileSync(`${__dirname}/example/app.js`,
        'module.exports = \'Hello, World\';');
      // acquit:ignore:start
      await new Promise(resolve => setTimeout(resolve, 250))
      const content = fs.readFileSync(`${__dirname}/example/app.min.js`, 'utf8');
      assert.ok(content.includes('Hello, World'));
      watcher.close();
      server.close();
      // acquit:ignore:end
    });
  });
});
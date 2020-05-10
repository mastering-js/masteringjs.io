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

  it('Node API', async function() {
    // acquit:ignore:start
    const fs = require('fs');
    try {
      fs.unlinkSync(`${__dirname}/bin/app.min.js`);
    } catch (err) {}
    // acquit:ignore:end
    const config = require('./webpack.config.js');
    const webpack = require('webpack');

    const compiler = webpack(config);

    // `compiler.run()` doesn't support promises yet, only callbacks
    await new Promise((resolve, reject) => {
      compiler.run((err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });
    // acquit:ignore:start
    assert.ok(fs.existsSync(`${__dirname}/bin/app.min.js`));
    // acquit:ignore:end
  });

  describe('CSS Loader', function() {
    before(function() {
      function myApp() {
        require('./style.css');

        document.querySelector('#content').innerHTML = '<h1>Hello, World</h1>';
      }

      fs.writeFileSync(`${__dirname}/example/app.js`,
        myApp.toString().concat(`\nmyApp();`));
      fs.writeFileSync(`${__dirname}/example/style.css`,
        'h1 { color: green }');
    });

    it('works correctly', async function() {
      const webpack = require('webpack');

      const config = {
        entry: `${__dirname}/example/app.js`,
        module: {
          rules: [
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
              exclude: /node_modules/
            }
          ]
        },
        resolve: {
          extensions: ['.css', '.js']
        },
        output: {
          filename: 'main.js',
          path: `${__dirname}/example/dist`
        }
      };
      // acquit:ignore:start
      const compiler = webpack(config);

      // `compiler.run()` doesn't support promises yet, only callbacks
      await new Promise((resolve, reject) => {
        compiler.run((err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        });
      });

      const puppeteer = require('puppeteer');
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      page.setContent(`
        <html>
          <body>
            <div id="content"></div>
            <script>
              ${fs.readFileSync(__dirname + '/example/dist/main.js', 'utf8')}
            </script>
          </body>
        </html>    
      `);
      let res =
        await page.evaluate(() => document.querySelector('#content').innerHTML);
      assert.equal(res, '<h1>Hello, World</h1>');

      res =
        await page.evaluate(() => getComputedStyle(document.querySelector('#content h1')).color);
      assert.equal(res, 'rgb(0, 128, 0)');
      await browser.close();
      // acquit:ignore:end
    });
  });
});
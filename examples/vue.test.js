'use strict';

const Nightmare = require('nightmare');
const Vue = require('vue');
const assert = require('assert');
const axios = require('axios');
const { renderToString } = require('vue-server-renderer').createRenderer();

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

  describe('Vuex', function() {
    const { renderToString } = require('vue-server-renderer').createRenderer();
    const Vuex = require('vuex');
    Vue.use(Vuex);

    it('basic counter', async function() {
      // acquit:ignore:start
      const { renderToString } = require('vue-server-renderer').createRenderer();
      const Vuex = require('vuex');
      Vue.use(Vuex);
      // acquit:ignore:end
      /**
       * Step 1: Create a Vuex store.
       * Vuex stores have 3 primary concepts:
       * - `state` is a POJO that contains all the application's data
       * - `mutations` are synchronous functions that change the `state`
       * - `actions` are potentially async functions that may trigger 1 or
       *   more mutations.
       */
      const state = { count: 0 };
      const mutations = {
        increment: (state) => { ++state.count; },
        decrement: (state) => { --state.count; }
      };
      const actions = {
        increment: ({ commit }) => commit('increment'),
        decrement: ({ commit }) => commit('decrement')
      };
      const store = new Vuex.Store({ state, mutations, actions });

      // Step 2: Create a Vue app that's wired up to use the Vuex store
      const app = new Vue({
        store,
        // In Vue templates, you reference the Vuex state with `$store.state`
        template: '<div>{{$store.state.count}}</div>'
      });
      
      // Step 3: Render the app using vue-server-renderer
      await renderToString(app); // <div data-server-rendered="true">0</div>
      // acquit:ignore:start
      assert.equal(await renderToString(app),
        '<div data-server-rendered="true">0</div>');
      // acquit:ignore:end

      // Step 4: Dispatch an action and re-render the app
      store.dispatch('increment');
      store.state.count; // 1
      // acquit:ignore:start
      assert.equal(store.state.count, 1);
      // acquit:ignore:end

      await renderToString(app); // <div data-server-rendered="true">1</div>
      assert.equal(await renderToString(app),
        '<div data-server-rendered="true">1</div>');
      // acquit:ignore:end
    });

    it('async action', async function() {
      // Create the store
      const state = { count: 0 };
      const mutations = {
        increment: (state) => { ++state.count; },
        decrement: (state) => { --state.count; }
      };
      const actions = {
        increment: async ({ commit }) => {
          await new Promise(resolve => setTimeout(resolve, 100));
          commit('increment');
        }
      };
      const store = new Vuex.Store({ state, mutations, actions });

      // Create the app
      const app = new Vue({
        store,
        template: '<div>{{$store.state.count}}</div>'
      });

      // Dispatch an action. Note that the `dispatch()` function returns a
      // promise because the `increment` action is an async function.
      await store.dispatch('increment');
      // acquit:ignore:start
      assert.equal(store.state.count, 1);
      // acquit:ignore:end

      await renderToString(app); // <div data-server-rendered="true">1</div>
      assert.equal(await renderToString(app),
        '<div data-server-rendered="true">1</div>');
      // acquit:ignore:end
    });

    it('async error', async function() {
      // acquit:ignore:start
      const state = { count: 0 };
      const mutations = {
        increment: (state) => { ++state.count; },
        decrement: (state) => { --state.count; }
      };
      // acquit:ignore:end
      const actions = {
        increment: async () => {
          await new Promise(resolve => setTimeout(resolve, 100));
          throw new Error('Oops');
        }
      };
      const store = new Vuex.Store({ state, mutations, actions });
      // acquit:ignore:start
      const app = new Vue({
        store,
        template: '<div>{{$store.state.count}}</div>'
      });
      // acquit:ignore:end
      // 
      const err = await store.dispatch('increment').catch(err => err);
      err.message; // "Oops"
      // acquit:ignore:start
      assert.equal(err.message, 'Oops');
      // acquit:ignore:end
    });
  });

  describe('slots', function() {
    it('basic', async function() {
      Vue.component('green', {
        // The `<slot></slot>` part will be replaced with child content.
        template: `
          <div style="background-color: #00ff00">
            <slot></slot>
          </div>
        `
      });

      const app = new Vue({
        // The `<h1>` is the child content.
        template: `
          <green>
            <h1>Hello, World!</h1>
          </green>
        `
      });
      // acquit:ignore:start
      const data = await renderToString(app);
      assert.equal(data, '<div data-server-rendered="true" ' +
        'style="background-color:#00ff00;"><h1>Hello, World!</h1></div>');
      // acquit:ignore:end
    });

    it('default', async function() {
      Vue.component('green', {
        // The inner HTML of `<slot></slot>` is the default.
        template: `
          <div style="background-color: #00ff00">
            <slot>
              <h2>Hello, World!</h2>
            </slot>
          </div>
        `
      });

      const app = new Vue({
        // No inner HTML
        template: `<green></green>`
      });
      // acquit:ignore:start
      const data = await renderToString(app);
      assert.equal(data, '<div data-server-rendered="true" ' +
        'style="background-color:#00ff00;"><h2>Hello, World!</h2></div>');
      // acquit:ignore:end
    });

    it('named', async function() {
      Vue.component('brand', {
        // 2 slots named 'logo' and 'name'.
        template: `
          <div class="brand">
            <div class="logo">
              <slot name="logo"></slot>
            </div>
            <div class="name">
              <a href="/">
                <slot name="name"></slot>
              </a>
            </div>
          </div>
        `
      });

      const app = new Vue({
        // `template v-slot:name` is how you insert content into a slot named
        // 'name'
        template: `
          <brand>
            <template v-slot:logo>
              <img src="http://masteringjs.io/assets/logo.png">
            </template>
            <template v-slot:name>
              Mastering JS
            </template>
          </brand>
        `
      });
      // acquit:ignore:start
      const data = await renderToString(app);
      assert.ok(data.includes('/logo.png'));
      assert.ok(data.includes('Mastering JS'));
      // acquit:ignore:end
    });
  });

  describe('templates', function() {
    it('inline', async function() {
      Vue.component('app', {
        template: '<h1>{{message}}</h1>',
        data: () => ({ message: 'Hello World' })
      });

      const app = new Vue({
        template: '<app></app>'
      });

      const data = await renderToString(app);
      // <h1 data-server-rendered="true">Hello World</h1>
      data;
      // acquit:ignore:start
      assert.equal(data, '<h1 data-server-rendered="true">Hello World</h1>');
      // acquit:ignore:end
    });

    it('loader', async function() {
      Vue.component('app', {
        template: await load('app-template'),
        data: () => ({ message: 'Hello World' })
      });

      const app = new Vue({
        template: '<app></app>'
      });

      const data = await renderToString(app);
      // <h1 data-server-rendered="true">Hello World</h1>
      data;

      async function load(template) {
        if (typeof window !== 'undefined') {
          return fetch(template + '.html').then(res => res.text());
        }

        const fs = require('fs');
        return new Promise((resolve, reject) => {
          fs.readFile(`${__dirname}/${template}.html`, 'utf8', (err, res) => {
            if (err != null) {
              return reject(err);
            }
            resolve(res);
          });
        });
      }
      // acquit:ignore:start
      assert.equal(data, '<h1 data-server-rendered="true">Hello World</h1>');
      // acquit:ignore:end
    });

    it('inline', async function() {
      Vue.component('app', {
        data: () => ({ message: 'Hello World' })
      });

      const app = new Vue({
        template: `
          <app inline-template>
            <h1>{{message}}</h1>
          </app>
        `
      });

      const data = await renderToString(app);
      // <h1 data-server-rendered="true">Hello World</h1>
      data;
      // acquit:ignore:start
      assert.equal(data, '<h1 data-server-rendered="true">Hello World</h1>');
      // acquit:ignore:end
    });

    it('template compiler', async function() {
      const compiler = require('vue-template-compiler');
      const parsed = compiler.parseComponent(`
        <template>
          <h1>{{message}}</h1>
        </template>
        <script>
          module.exports = {
            data: () => ({ message: 'Hello World' })
          };
        </script>
      `);

      // Contains `template`, `data` properties
      const appComponent = Object.assign({ template: parsed.template.content },
        eval(parsed.script.content));
      Vue.component('app', appComponent);
      const app = new Vue({
        template: '<app></app>'
      });

      const data = await renderToString(app);
      // <h1 data-server-rendered="true">Hello World</h1>
      data;
      // acquit:ignore:start
      assert.equal(data, '<h1 data-server-rendered="true">Hello World</h1>');
      // acquit:ignore:end
    });
  });

  describe('router', function() {
    it('basic example', async function() {
      const nightmare = new Nightmare({ show: false });

      await nightmare.
        goto(`file://${process.cwd()}/tutorials/vue/router/example1.html`).
        wait('#rendered-content');

      await nightmare.click('a[href="#/home"]');
      let res = await nightmare.evaluate(() => document.querySelector('h1').innerHTML);
      assert.equal(res, 'Home');

      await nightmare.click('a[href="#/about"]');
      res = await nightmare.evaluate(() => document.querySelector('h1').innerHTML);
      assert.equal(res, 'About Us');

      await nightmare.end();
    });
  });

  describe('template compiler', function() {
    it('compiling a string', async function() {
      const compiler = require('vue-template-compiler');
      const { renderToString } = require('vue-server-renderer').createRenderer();

      // Compile a `render()` function based on a string template
      const { render } = compiler.compileToFunctions('<h1>Hello, {{message}}</h1>');

      Vue.component('hello', {
        props: ['message'],
        render
      });

      const app = new Vue({
        template: '<hello message="World"></hello>'
      });

      // <h1 data-server-rendered="true">Hello, World</h1>
      const data = await renderToString(app);
      // acquit:ignore:start
      assert.equal(data, '<h1 data-server-rendered="true">Hello, World</h1>');
      // acquit:ignore:end
    });
  });
});
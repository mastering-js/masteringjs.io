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
          throw new Error('oops')
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
      store.dispatch('increment');
      // acquit:ignore:start
      assert.equal(store.state.count, 1);
      // acquit:ignore:end

      await renderToString(app); // <div data-server-rendered="true">1</div>
      assert.equal(await renderToString(app),
        '<div data-server-rendered="true">1</div>');
      // acquit:ignore:end
    });
  });
});
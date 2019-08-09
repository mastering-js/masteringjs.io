'use strict';

const Nightmare = require('nightmare');
const Vue = require('vue');
const assert = require('assert');
const axios = require('axios');
const { renderToString } = require('vue-server-renderer').createRenderer();
const sinon = require('sinon');

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
              <img src="https://masteringjs.io/assets/logo.png">
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

  describe('v-if', function() {
    it('basic', async function() {
      const app = new Vue({
        data: () => ({ render: false }),
        template: `
          <div>
            <h1 v-if="render">Hello, World</h1>
          </div>
        `
      });

      // Vue will **not** render 'Hello, World' because the `v-if`
      // expression evaluates to false.
      const data = await renderToString(app);
      // <div data-server-rendered="true"><!----></div>
      data;
      // acquit:ignore:start
      assert.equal(data,
        '<div data-server-rendered="true"><!----></div>');
      // acquit:ignore:end
    });

    it('else', async function() {
      const app = new Vue({
        data: () => ({ value: 1 }),
        template: `
          <div>
            <div v-if="value > 0">Positive</div>
            <div v-else-if="value < 0">Negative</div>
            <div v-else>Zero</div>
          </div>
        `
      });

      let data = await renderToString(app);
      // <div data-server-rendered="true"><div>Positive</div></div>
      data;
      // acquit:ignore:start
      assert.equal(data,
        '<div data-server-rendered="true"><div>Positive</div></div>');
      // acquit:ignore:end

      app._data.value = -1;
      data = await renderToString(app);
      // <div data-server-rendered="true"><div>Negative</div></div>
      data;
      // acquit:ignore:start
      assert.equal(data,
        '<div data-server-rendered="true"><div>Negative</div></div>');
      // acquit:ignore:end

      app._data.value = 0;
      data = await renderToString(app);
      // <div data-server-rendered="true"><div>Zero</div></div>
      data;
      // acquit:ignore:start
      assert.equal(data,
        '<div data-server-rendered="true"><div>Zero</div></div>');
      // acquit:ignore:end
    });
  });

  describe('v-model', function() {
    it('basic example', async function() {
      const nightmare = new Nightmare({ show: true });

      await nightmare.
        goto(`file://${process.cwd()}/examples/vue/v-model.html`).
        wait('#rendered-content');

      let res = await nightmare.evaluate(() => document.querySelector('h1').innerHTML);
      assert.equal(res, 'Hello, World');

      await nightmare.evaluate(() => {
        document.querySelector('input').value = 'Test';
        document.querySelector('input').dispatchEvent(new Event('input'));
      });

      res = await nightmare.evaluate(() => document.querySelector('h1').innerHTML);
      assert.equal(res, 'Test');

      await nightmare.evaluate(() => {
        document.querySelector('button').click();
      });

      res = await nightmare.evaluate(() => document.querySelector('h1').innerHTML);
      assert.equal(res, 'Hello, World');

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

  describe('component', function() {
    before(function() {
      sinon.stub(Vue.prototype, '$mount').callsFake(() => null);
    });

    after(function() {
      Vue.prototype.$mount.restore && Vue.prototype.$mount.restore();
    });

    it('create a component', async function() {
      const helloComponent = Vue.component('hello', {
        template: '<h1>Hello, World</h1>'
      });
      // Technically, a component is a function
      typeof helloComponent; // 'function'
      helloComponent.name; // 'VueComponent'

      // Internally, Vue keeps a map from ids to components in
      // `Vue.options.components`
      Vue.options.components['hello'] === helloComponent; // true
      // acquit:ignore:start
      assert.ok(typeof helloComponent === 'function');
      assert.equal(helloComponent.name, 'VueComponent');
      assert.ok(Vue.options.components['hello'] === helloComponent);
      // acquit:ignore:end

      // Renders "<h1>Hello, World</h1>"
      const app = new Vue({
        template: '<hello></hello>'
      });
      app.$mount('#content');
      // acquit:ignore:start
      const data = await renderToString(app);
      assert.equal(data, '<h1 data-server-rendered="true">Hello, World</h1>');
      // acquit:ignore:end
    });

    it('component state', async function() {
      Vue.component('hello', {
        data: () => ({
          name: 'World'
        }),
        template: `
          <div>
            <div>
              <input v-model="name"></input>
            </div>
            <h1>Hello, {{name}}</h1>
          </div>
        `
      });

      // Displays "Hello, World" initially, changes based on input
      const app = new Vue({
        template: '<hello></hello>'
      });
      app.$mount('#content');
      // acquit:ignore:start
      const data = await renderToString(app);
      assert.ok(data.includes('Hello, World'));
      // acquit:ignore:end
    });

    it('component props', async function() {
      // `props` is an array of prop names this component accepts. If you
      // don't explicitly list a prop in `props`, you won't be able to use
      // it in your template.
      Vue.component('hello', {
        props: ['name'],
        template: '<h1>Hello, {{name}}</h1>'
      });

      // The app tracks `name` as internal state, and there's an input to
      // modify `name` using `v-model`. Then, `v-bind:name` passes `name` as
      // a prop to the `hello` component.
      const app = new Vue({
        data: () => ({ name: 'World' }),
        template: `
          <div>
            <div>
              <input v-model="name"></input>
            </div>
            <hello v-bind:name="name"></hello>
          </div>
        `
      });
      // acquit:ignore:start
      app.$mount('#content');
      const data = await renderToString(app);
      assert.ok(data.includes('Hello, World'), data);
      // acquit:ignore:end
    });

    it('emit', async function() {
      Vue.component('input-name', {
        data: () => ({ name: 'World' }),
        // When you click the "Update" button, Vue will emit an event `update`
        // to the parent, with the current state of 'name'.
        template: `
          <div>
            <input type="text" v-model="name">
            <button v-on:click="$emit('update', name)">
              Update
            </button>
          </div>
        `
      });

      const app = new Vue({
        data: () => ({ name: 'World' }),
        // To listen to the 'update' event, you create the `input-name`
        // component with a `v-on:update` attribute. `$event` contains
        // the value of the 2nd parameter to `$emit()`.
        template: `
          <div>
            <div>
              <input-name v-on:update="setName($event)"></input-name>
            </div>
            <h1>Hello, {{name}}</h1>
          </div>
        `,
        methods: {
          // Define a method that Vue will call to handle the 'update' event.
          setName: function(v) {
            this.name = v;
          }
        }
      });
      app.$mount('#content');
      // acquit:ignore:start
      const data = await renderToString(app);
      assert.ok(data.includes('Hello, World'), data);
      // acquit:ignore:end
    });
  });

  describe('watch', function() {
    it('basic example', async function() {
      const nightmare = new Nightmare({ show: false });

      await nightmare.
        goto(`file://${process.cwd()}/examples/vue/watch-basic.html`).
        wait('#rendered-content');

      let val = await nightmare.evaluate(() => document.querySelector('select').value);
      assert.equal(val, 'A');

      await nightmare.evaluate(() => {
        document.querySelector('select').value = 'B';
        document.querySelector('select').dispatchEvent(new Event('change'));
      });
      await nightmare.evaluate(() => {
        document.querySelector('select').value = 'C';
        document.querySelector('select').dispatchEvent(new Event('change'));
      });
      val = await nightmare.evaluate(() => document.querySelector('select').value);
      assert.equal(val, 'C');
      
      await nightmare.evaluate(() => document.querySelector('#undo').click());

      val = await nightmare.evaluate(() => document.querySelector('select').value);
      assert.equal(val, 'B');

      await nightmare.end();
    });

    it('http', async function() {
      const nightmare = new Nightmare({ show: false });

      await nightmare.
        goto(`file://${process.cwd()}/examples/vue/watch-http.html`).
        wait('#rendered-content');

      let val = await nightmare.evaluate(() => document.querySelector('select').value);
      assert.equal(val, 'A');

      await nightmare.evaluate(() => {
        document.querySelector('select').value = 'B';
        document.querySelector('select').dispatchEvent(new Event('change'));
      });

      await nightmare.wait('#saved');

      await nightmare.end();
    });
  });

  describe('props', function() {
    afterEach(function() {
      console.error.restore && console.error.restore();
    });

    it('basic', async function() {
      Vue.component('greet', {
        props: ['name'],
        template: `
          <div>
            Hello, {{name}}
          </div>
        `
      });

      const app = new Vue({
        template: `<greet name="World!"></greet>`
      });
      // acquit:ignore:start
      const data = await renderToString(app);
      assert.ok(data.includes('Hello, World'), data);
      // acquit:ignore:end
    });

    it('dynamic', async function() {
      Vue.component('greet', {
        props: ['name'],
        // Renders "Hello, World"
        template: `
          <div>
            Hello, {{name}}
          </div>
        `
      });

      const app = new Vue({
        data: () => ({ value: 'World' }),
        // Note the `v-bind:` prefix. If you forget it, `greet` will treat
        // 'value' as a raw string and render "Hello, value"
        template: `<greet v-bind:name="value"></greet>`
      });
      // acquit:ignore:start
      const data = await renderToString(app);
      assert.ok(data.includes('Hello, World'), data);
      // acquit:ignore:end
    });

    it('validation', async function() {
      Vue.component('greet', {
        // Note the slightly different syntax. When doing validation, you set
        // `props` as an object with the prop names as the keys.
        props: {
          name: String
        },
        // Renders "Hello, 42"
        template: `
          <div>
            Hello, {{name}}
          </div>
        `
      });

      // Prints a warning:
      // Invalid prop: type check failed for prop "name". Expected String
      // with value "42", got Number with value 42.
      const app = new Vue({
        data: () => ({ value: 42 }),
        template: `<greet v-bind:name="value"></greet>`
      });
      // acquit:ignore:start
      sinon.stub(console, 'error');
      const data = await renderToString(app);

      assert.equal(console.error.getCalls().length, 1);
      assert.ok(console.error.getCalls()[0].toString().indexOf('Expected String') !== -1,
        console.error.getCalls()[0].toString());
      // acquit:ignore:end
    });
  });

  describe('computed', function() {
    it('motivation', async function() {
      const app = new Vue({
        data: () => ({
          reviews: [
            { score: 5 },
            { score: 3 },
            { score: 4 }
          ]
        }),
        // Computing the average in a template expression is awkward
        template: `
          <div>
            {{reviews.reduce((sum, v) => sum + v.score, 0) / reviews.length}} ({{reviews.length}} reviews)
          </div>
        `
      });
      // acquit:ignore:start
      const data = await renderToString(app);
      assert.ok(data.includes('4 (3 reviews)'), data);
      // acquit:ignore:end
    });

    it('basic example', async function() {
      const app = new Vue({
        data: () => ({
          reviews: [
            { score: 5 },
            { score: 3 },
            { score: 4 }
          ]
        }),
        computed: {
          // `average` is a computed property. Vue will call `computeAverage()`
          // for you when a `data` property changes.
          average: function computeAverage() {
            if (this.reviews.length === 0) {
              return 0;
            }
            return this.reviews.
              reduce((sum, v) => sum + v.score, 0) / this.reviews.length;
          }
        },
        template: `
          <div>
            {{average}} ({{reviews.length}} reviews)
          </div>
        `
      });
      // acquit:ignore:start
      const data = await renderToString(app);
      assert.ok(data.includes('4 (3 reviews)'), data);
      // acquit:ignore:end
    });

    it('method', async function() {
      const app = new Vue({
        data: () => ({
          reviews: [
            { score: 5 },
            { score: 3 },
            { score: 4 }
          ]
        }),
        methods: {
          // `average` is a method that's called in the template expression
          average: function average() {
            if (this.reviews.length === 0) {
              return 0;
            }
            return this.reviews.
              reduce((sum, v) => sum + v.score, 0) / this.reviews.length;
          }
        },
        template: `
          <div>
            {{average()}} ({{reviews.length}} reviews)
          </div>
        `
      });
      // acquit:ignore:start
      const data = await renderToString(app);
      assert.ok(data.includes('4 (3 reviews)'), data);
      // acquit:ignore:end
    });

    it('method', async function() {
      const app = new Vue({
        data: () => ({
          field1: 'row',
          field2: 'your boat'
        }),
        computed: {
          // Vue will **only** call` getter()` when `field2` changes. Vue will
          // not call `getter()` when `field1` changes.
          field2Upper: function getter() {
            console.log('Called!');
            return this.field2.toUpperCase();
          }
        },
        template: `
          <div>
            <div>
              {{field2Upper}}
            </div>
            <button v-on:click="field1 += ' row'">Add</button>
          </div>
        `
      });
      // acquit:ignore:start
      const data = await renderToString(app);
      assert.ok(data.includes('4 (3 reviews)'), data);
      // acquit:ignore:end
    });    
  });

  describe('expressions', function() {
    it('with expression', async function() {
      const app = new Vue({
        data: () => ({ answer: null }),
        template: `
          <div>
            {{answer = 42}}
          </div>
        `
      });
      // acquit:ignore:start
      const data = await renderToString(app);
      assert.ok(data.includes('42'), data);
      // acquit:ignore:end
    });

    it('with statement', async function() {
      const app = new Vue({
        data: () => ({}),
        // Will throw a "Error compiling template" error
        template: `
          <div>
            {{let answer = 42}}
          </div>
        `
      });
      // acquit:ignore:start
      const err = await renderToString(app).then(() => null, err => err);
      assert.ok(err);
      assert.ok(err.message.includes('Error compiling template'));
      // acquit:ignore:end
    });
  });

  describe('emit', function() {
    it('in a component', async function() {
      Vue.component('my-component', {
        mounted: function() {
          // `$emit()` sends an event up the component tree. The parent
          // can listen for the 'notify' event using 'v-on:notify'
          this.$emit('notify');
        },
        template: '<div></div>'
      });

      const app = new Vue({
        data: () => ({ show: false }),
        // Vue evaluates the expression in 'v-on:notify' when it gets a 'notify'
        // event. 
        template: `
          <div>
            <my-component v-on:notify="show = true"></my-component>
            <div v-if="show">Notified</div>
          </div>
        `
      });
      // acquit:ignore:start
      await renderToString(app);
      app.$children[0].$emit('notify');
      assert.equal(app.$data.show, true);
      // acquit:ignore:end
    });

    it('in app', async function() {
      const app = new Vue({
        template: '<div></div>'
      });

      let called = 0;
      app.$on('test-event', () => { ++called; });

      app.$emit('test-event');
      called; // 1
      // acquit:ignore:start
      assert.equal(called, 1);
      // acquit:ignore:end
    });
  });

  describe('bind', function() {
    it('href', async function() {
      const app = new Vue({
        data: () => ({ link: 'http://google.com' }),
        // Initially, the link will go to Google...
        template: `
          <a v-bind:href="link">My Link</a>
        `
      });
      // acquit:ignore:start
      let data = await renderToString(app);
      assert.ok(data.includes('google.com'));
      // acquit:ignore:end
      // Now, the link will go to Twitter.
      app.$data.link = 'http://twitter.com';
      // acquit:ignore:start
      data = await renderToString(app);
      assert.ok(data.includes('twitter.com'));
      // acquit:ignore:end
    });

    it('style', async function() {
      const app = new Vue({
        data: () => ({ color: 'blue' }),
        // Initially, will show "blue text" in blue font.
        template: `
          <div v-bind:style="{ color }">{{color}} text</div>
        `
      });
      // acquit:ignore:start
      let data = await renderToString(app);
      assert.ok(data.includes('color:blue'));
      // acquit:ignore:end
      // Now, it will show "green text" in green font.
      app.$data.color = 'green';
      // acquit:ignore:start
      data = await renderToString(app);
      assert.ok(data.includes('color:green'));
      // acquit:ignore:end
    });

    it('shorthand', async function() {
      const app = new Vue({
        data: () => ({ link: 'http://google.com' }),
        // `:href` is the same ad `v-bind:href`, just more concise.
        template: `
          <a :href="link">My Link</a>
        `
      });
      // acquit:ignore:start
      let data = await renderToString(app);
      assert.ok(data.includes('google.com'));
      // acquit:ignore:end
    });
  });
});
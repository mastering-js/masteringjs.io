'use strict';

const Nightmare = require('nightmare');
const Vue = require('vue');
const assert = require('assert');
const axios = require('axios');
const puppeteer = require('puppeteer');
const { renderToString } = require('vue-server-renderer').createRenderer();
const sinon = require('sinon');
const FormData = require('form-data');
const fs = require('fs');

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

  describe('axios', function() {
    it('basic example', async function() {
      const url = 'https://jsonplaceholder.typicode.com/users/1';

      const app = new Vue({
        data: () => ({ user: null, error: null }),
        // Display username if available, and error message if not
        template: `
          <div>
            <div v-if="user != null">
              {{user.name}}
            </div>
            <div v-if="error != null">
              {{error.message}}
            </div>
          </div>
        `,
        mounted
      });

      async function mounted() {
        try {
          this.user = await axios.get(url).then(res => res.data);
          this.error = null;
        } catch (error) {
          this.user = null;
          this.error = error;
        }
      }
      // acquit:ignore:start
      await mounted.call(app);
      const data = await renderToString(app);
      assert.ok(data.includes('Leanne Graham'));
      // acquit:ignore:end
    });
  });

  describe('render function', function() {
    it('basic example', async function() {
      const app = new Vue({
        data: () => ({ user: 'World' }),
        render: function(createElement) {
          // `this` refers to the Vue instance, so you can
          // edit data.
          return createElement('h1', 'Hello, ' + this.user);
        }
      });
      // acquit:ignore:start
      const data = await renderToString(app);
      assert.ok(data.includes('Hello, World'));
      // acquit:ignore:end
    });

    it('data input', async function() {
      // acquit:ignore:start
      this.timeout(10000);
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      const html = `
        <html>
          <body>
            <script src="https://unpkg.com/vue/dist/vue.js"></script>

            <div id="content"></div>
        
            <script type="text/javascript">
              const app = new Vue({
                data: () => ({ count: 0 }),
                render: function(createElement) {
                  return createElement('div', null, [
                    createElement('h1', 'Count: ' + this.count),
                    createElement('button', {
                      domProps: {
                        innerHTML: 'Increment'
                      },
                      on: { click: () => ++this.count }
                    })
                  ]);
                }
              });

              app.$mount('#content');
            </script>
          </body>
        </html>
      `;
      // acquit:ignore:end
      const app = new Vue({
        data: () => ({ count: 0 }),
        render: function(createElement) {
          return createElement('div', null, [
            createElement('h1', 'Count: ' + this.count),
            // Note that the **2nd** parameter is the `data` object. Otherwise,
            // `on` won't work.
            createElement('button', {
              domProps: {
                innerHTML: 'Increment'
              },
              on: { click: () => ++this.count }
            })
          ]);
        }
      });
      // acquit:ignore:start
      await page.setContent(html);
      let count = await page.evaluate(() => {
        return document.querySelector('h1').innerHTML;
      });
      assert.equal(count, 'Count: 0');

      await page.evaluate(() => {
        return document.querySelector('button').click();
      });
      count = await page.evaluate(() => {
        return document.querySelector('h1').innerHTML;
      });
      assert.equal(count, 'Count: 1');
      await browser.close();
      // acquit:ignore:end
    });
  });

  describe('form', function() {
    it('login form with axios', async function() {
      const app = new Vue({
        // `v-model` binds `email` to a text input in the template,
        // and `password` to a password input.
        data: () => ({ email: '', password: '' }),
        methods: {
          submit: async function() {
            await axios.post('http://httpbin.org/post', {
              email: this.email,
              password: this.password
            });
          }
        },
        template: `
          <div>
            <input
              type="text"
              v-model="email"
              placeholder="Email">
            <input
              type="password"
              v-model="password"
              placeholder="Password">
            <button v-on:click="submit()">
              Submit
            </button>
          </div>
        `
      });
    });
  });

  describe('conditional class', function() {
    it('object syntax', async function() {
      const app = new Vue({
        data: () => ({ isGreen: true }),
        // `div` will have class 'green' if `isGreen` is true
        template: `
          <div v-bind:class="{ green: isGreen }"></div>
        `
      });
      // acquit:ignore:start
      let data = await renderToString(app);
      assert.ok(data.includes('class="green"'));
      // acquit:ignore:end

      // Remove the class 'green' from the `div`
      app.$data.isGreen = false;
      // acquit:ignore:start
      data = await renderToString(app);
      assert.ok(!data.includes('class="green"'));
      // acquit:ignore:end
    });

    it('multiple', async function() {
      const app = new Vue({
        data: () => ({ green: true, small: false }),
        // `div` will have class 'green' if `green` is true
        // and 'small' if `small` is true.
        template: `
          <div :class="{ green, small }"></div>
        `
      });
      // acquit:ignore:start
      let data = await renderToString(app);
      assert.ok(data.includes('class="green"'));
      // acquit:ignore:end

      // Remove the class 'green' from the `div` and add class 'small'
      app.$data.green = false;
      app.$data.small = true;
      // acquit:ignore:start
      data = await renderToString(app);
      assert.ok(data.includes('class="small"'));
      // acquit:ignore:end
    });

    it('string', async function() {
      const app = new Vue({
        data: () => ({ myClass: 'green' }),
        // `div` will have whatever class or classes are in the
        // `myClass` data value.
        template: `
          <div :class="myClass"></div>
        `
      });
      // acquit:ignore:start
      let data = await renderToString(app);
      assert.ok(data.includes('class="green"'));
      // acquit:ignore:end

      // Remove the class 'green' from the `div` and replace it
      // with the class 'small'
      app.$data.myClass = 'small';
      // acquit:ignore:start
      data = await renderToString(app);
      assert.ok(data.includes('class="small"'));
      // acquit:ignore:end
    });

    it('ternary', async function() {
      const app = new Vue({
        data: () => ({ isGreen: true }),
        // `div` will have class 'green' if `isGreen` is true.
        template: `
          <div :class="isGreen ? 'green' : 'small'"></div>
        `
      });
      // acquit:ignore:start
      let data = await renderToString(app);
      assert.ok(data.includes('class="green"'));
      // acquit:ignore:end

      // Remove the class 'green' from the `div` and replace it
      // with the class 'small'
      app.$data.isGreen = false;
      // acquit:ignore:start
      data = await renderToString(app);
      assert.ok(data.includes('class="small"'));
      // acquit:ignore:end
    });

    it('array', async function() {
      const app = new Vue({
        data: () => ({ green: true }),
        // `div` will have class 'green' if `green` is true, and
        // 'small' otherwise.
        template: `
          <div :class="[{ green }, green ? '' : 'small']"></div>
        `
      });
      // acquit:ignore:start
      let data = await renderToString(app);
      assert.ok(data.includes('class="green"'));
      // acquit:ignore:end

      // Remove the class 'green' from the `div` and replace it
      // with the class 'small'
      app.$data.green = false;
      // acquit:ignore:start
      data = await renderToString(app);
      assert.ok(data.includes('class="small"'));
      // acquit:ignore:end
    });
  });

  describe('lifecycle hooks', function() {
    it('example', async function() {
      // acquit:ignore:start
      const _console = console;
      let called = 0;
      console = {
        log: () => ++called
      };
      // acquit:ignore:end
      // The below Vue instance has a `created` hook
      const app = new Vue({
        created: function() {
          console.log('Called!');
        },
        template: `
          <h1>Hello, World</h1>
        `
      });
      // acquit:ignore:start
      assert.equal(called, 1);
      app.$mount = () => true;
      // acquit:ignore:end

      // Prints "Called!"
      app.$mount('#content');
    });

    it('created async', async function() {
      // This Vue instance has an async created hook
      const app = new Vue({
        data: () => ({ answer: null }),
        created: async function() {
          await new Promise(resolve => setTimeout(resolve, 100));
          this.answer = 42;
        },
        // Will first render "The answer is N/A", and then
        // "The answer is 42" after 100 ms
        template: `
          <h1>The answer is {{answer == null ? 'N/A' : answer}}</h1>
        `
      });
      // acquit:ignore:start
      let data = await renderToString(app);
      assert.ok(data.includes('answer is N/A'));

      await new Promise(resolve => setTimeout(resolve, 100));
      data = await renderToString(app);
      assert.ok(data.includes('answer is 42'));
      // acquit:ignore:end
    });

    it('beforeCreate', async function() {
      // acquit:ignore:start
      let v = '42';
      // acquit:ignore:end
      // This Vue instance has an beforeCreate hook
      const app = new Vue({
        data: () => ({ data: 'test' }),
        beforeCreate: function() {
          // acquit:ignore:start
          v = this.data;
          // acquit:ignore:end
          this.data; // undefined
        },
        template: `<div></div>`
      });
      // acquit:ignore:start
      await renderToString(app);
      assert.strictEqual(v, void 0);
      // acquit:ignore:end
    });

    it('update', async function() {
      // acquit:ignore:start
      this.timeout(10000);
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      const fn = function() {
        // acquit:ignore:end
        window.numUpdated = 0;

        const app = new Vue({
          data: () => ({ count: 0 }),
          updated: function() {
            // Will print every time you click on the h1
            console.log(++window.numUpdated);
          },
          template: '<h1 v-on:click="++count">Clicked {{count}}</h1>'
        });

        app.$mount('#content');
        // acquit:ignore:start
      };

      const html = `
        <html>
          <body>
            <script src="https://unpkg.com/vue/dist/vue.js"></script>

            <div id="content"></div>
        
            <script type="text/javascript">
              (${fn.toString()})();
            </script>
          </body>
        </html>
      `;
      await page.setContent(html);
      let count = await page.evaluate(() => {
        return document.querySelector('h1').innerHTML;
      });
      assert.equal(count, 'Clicked 0');
      let numUpdated = await page.evaluate(() => {
        return window.numUpdated;
      });
      assert.equal(numUpdated, 0);

      await page.evaluate(() => {
        return document.querySelector('h1').click();
      });
      count = await page.evaluate(() => {
        return document.querySelector('h1').innerHTML;
      });
      assert.equal(count, 'Clicked 1');
      numUpdated = await page.evaluate(() => {
        return window.numUpdated;
      });
      assert.equal(numUpdated, 1);
      await browser.close();
      // acquit:ignore:end
    });

    it('destroyed', async function() {
      // acquit:ignore:start
      this.timeout(10000);
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      const fn = function() {
        // acquit:ignore:end
        window.numDestroyed = 0;

        Vue.component('test', {
          destroyed: () => ++window.numDestroyed,
          props: ['num'],
          template: '<div class="test-element">{{num}}</div>'
        });

        const app = new Vue({
          data: () => ({ elements: [1, 2, 3, 4] }),
          destroyed: function() {
            // Will print every time you click on the button, because
            // Vue unmounts a `test` component every time you remove
            // an element from `elements`.
            console.log(++window.numDestroyed);
          },
          template: `
            <div>
              <test v-for="el in elements" :num="el"></test>
              <button v-on:click="elements.splice(0, 1)">
                Remove First
              </button>
            </div>
          `
        });

        app.$mount('#content');
        // acquit:ignore:start
      };

      const html = `
        <html>
          <body>
            <script src="https://unpkg.com/vue/dist/vue.js"></script>

            <div id="content"></div>
        
            <script type="text/javascript">
              (${fn.toString()})();
            </script>
          </body>
        </html>
      `;
      await page.setContent(html);
      let count = await page.evaluate(() => {
        return document.querySelectorAll('.test-element').length;
      });
      assert.equal(count, 4);

      await page.evaluate(() => {
        return document.querySelector('button').click();
      });

      count = await page.evaluate(() => {
        return document.querySelectorAll('.test-element').length;
      });
      assert.equal(count, 3);

      let numDestroyed = await page.evaluate(() => {
        return window.numDestroyed;
      });
      assert.equal(numDestroyed, 1);
      
      await browser.close();
      // acquit:ignore:end
    });
  });

  describe('refs', function() {
    it('basic example', async function() {
      // acquit:ignore:start
      this.timeout(10000);
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      const fn = function() {
        // acquit:ignore:end
        const app = new Vue({
          data: () => ({ username: '', password: '', failed: false }),
          methods: {
            login: async function() {
              // Simulate that login always fails, just for this example
              this.failed = true;

              // Give focus back to `username` input. If you change the
              // 'ref' attribute in the template to 'usernameRef', you
              // would do `this.$refs.usernameRef` here.
              this.$refs.username.focus();
            }
          },
          template: `
            <div>
              <input type="text" v-model="username" ref="username" id="username">
              <input type="password" v-model="password">
              <button v-on:click="login()">Login</button>
              <div v-if="failed" id="failed">
                Login Failed!
              </div>
            </div>
          `
        });
        // acquit:ignore:start
        app.$mount('#content');
      };

      const html = createVueHTMLScaffolding(fn.toString());
      await page.setContent(html);

      let count = await page.evaluate(() => {
        return document.querySelectorAll('#failed').length;
      });
      assert.equal(count, 0);
      let hasFocus = await page.evaluate(() => {
        return document.activeElement === document.getElementById('username');
      });
      assert.strictEqual(hasFocus, false);

      await page.evaluate(() => {
        return document.querySelector('button').click();
      });

      count = await page.evaluate(() => {
        return document.querySelectorAll('#failed').length;
      });
      assert.equal(count, 1);

      hasFocus = await page.evaluate(() => {
        return document.activeElement === document.getElementById('username');
      });
      assert.strictEqual(hasFocus, true);

      await browser.close();
      // acquit:ignore:end
    });

    it('up down', async function() {
      // acquit:ignore:start
      this.timeout(10000);
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      const fn = function() {
        // acquit:ignore:end
        const app = new Vue({
          data: () => ({ cells: ['foo', 'bar', 'baz'].map(val => ({ val })) }),
          mounted: function() {
            let cur = 0;
            this.$refs.inputs[0].focus();

            document.addEventListener('keyup', ev => {
              console.log('Got event', ev)
              cur = this.$refs.inputs.findIndex(el => document.activeElement === el);
              if (cur === -1) {
                cur = 0;
              }

              const numEls = this.cells.length;
              if (ev.keyCode === 38) { // Up arrow
                cur = (numEls + cur - 1) % numEls; 

                this.$refs.inputs[cur].focus();
              } else if (ev.keyCode === 40) { // Down arrow
                cur = (cur + 1) % numEls;

                this.$refs.inputs[cur].focus();
              }
            });
          },
          template: `
            <div>
              <div v-for="cell in cells">
                <input v-model="cell.val" ref="inputs">
              </div>
            </div>
          `
        });
        // acquit:ignore:start
        app.$mount('#content');
      };

      const html = createVueHTMLScaffolding(fn.toString());
      await page.setContent(html);

      let focusedVal = await page.evaluate(() => {
        return document.activeElement == null ? null : document.activeElement.value.trim();
      });
      assert.strictEqual(focusedVal, 'foo');

      await page.evaluate(() => {
        const ev = new Event('keyup');
        ev.keyCode = 40;
        return document.dispatchEvent(ev);
      });

      focusedVal = await page.evaluate(() => {
        return document.activeElement == null ? null : document.activeElement.value.trim();
      });
      assert.strictEqual(focusedVal, 'bar');

      await browser.close();
      // acquit:ignore:end
    });
  });

  describe('unit test', function() {
    it('with ssr', async function() {
      const Vue = require('vue');
      const { renderToString } = require('vue-server-renderer').createRenderer();

      const app = new Vue({
        data: () => ({ count: 0 }),
        methods: {
          increment: function() { ++this.count; }
        },
        template: `
          <div>
            <div id="clicks">Clicks: {{count}}</div>
            <button v-on:click="increment()">Increment</button>
          </div>
        `
      });

      let res = await renderToString(app);
      assert.ok(res.includes('Clicks: 0'));

      // `app` is reactive in Node
      app.count = 2;
      res = await renderToString(app);
      assert.ok(res.includes('Clicks: 2'));

      // You can also call methods in Node
      app.$options.methods.increment.call(app);
      res = await renderToString(app);
      assert.ok(res.includes('Clicks: 3'));
    });

    it('with puppeteer', async function() {
      const puppeteer = require('puppeteer');

      // Since your Vue app is running in a real browser, you would need
      // webpack or browserify to build a bundle if you use `require()`
      const createComponent = function() {
        return new Vue({
          data: () => ({ count: 0 }),
          methods: {
            increment: function() { ++this.count; }
          },
          template: `
            <div>
              <div id="clicks">Clicks: {{count}}</div>
              <button v-on:click="increment()">Increment</button>
            </div>
          `
        });
      };

      const js = createComponent.toString();
      const htmlScaffold = `
        <html>
          <body>
            <script src="https://unpkg.com/vue/dist/vue.js"></script>
    
            <div id="content"></div>
        
            <script type="text/javascript">
              const app = (${js})();
              app.$mount('#content');
            </script>
          </body>
        </html>
      `;

      // Launch a new browser and make it render the above HTML.
      // You can set `headless: false` to interact with the real browser.
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setContent(htmlScaffold);

      // Interact with the component via `evaluate()`
      let content = await page.evaluate(() => {
        return document.querySelector('#clicks').innerHTML.trim()
      });
      assert.equal(content, 'Clicks: 0');

      await page.evaluate(() => document.querySelector('button').click());

      content = await page.evaluate(() => {
        return document.querySelector('#clicks').innerHTML.trim()
      });
      assert.equal(content, 'Clicks: 1');

      // Clean up
      await browser.close();
    });
  });

  describe('v-for', function() {
    it('basic', async function() {
      const app = new Vue({
        data: () => ({ people: ['Axl Rose', 'Slash', 'Izzy Stradlin'] }),
        // 1 `<li>` for each person in `people`
        template: `
          <div>
            <h1>Band Members</h1>
            <ul>
              <li v-for="person in people">
                {{person}}
              </li>
            </ul>
          </div>
        `
      });
      // acquit:ignore:start
      let res = await renderToString(app);
      assert.ok(res.includes('Axl Rose'));
      assert.ok(res.includes('Slash'));
      assert.ok(res.includes('Izzy Stradlin'));
      // acquit:ignore:end
    });

    it('v-model bad', async function() {
      // acquit:ignore:start
      this.timeout(10000);
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      const fn = function() {
        // acquit:ignore:end
        const app = new Vue({
          data: () => ({ people: ['Axl Rose', 'Slash', 'Izzy Stradlin'] }),
          // 1 `<input>` for each person in `people`
          template: `
            <div>
              <h1>Band Members</h1>
              <div id="people-array">{{people}}</div>
              <ul>
                <li v-for="person in people">
                  <input v-model="person">
                  <span>{{person}}</span>
                </li>
              </ul>
            </div>
          `
        });
        // acquit:ignore:start
        app.$mount('#content');
      };

      const html = createVueHTMLScaffolding(fn.toString());
      await page.setContent(html);

      let peopleArr = await page.evaluate(() => {
        return document.querySelector('#people-array').innerHTML.trim();
      });
      assert.ok(peopleArr.includes('Slash'));

      await page.evaluate(() => {
        const input = document.querySelector('li:nth-of-type(2) input');
        input.value = 'Saul Hudson';
        console.log(input);
        input.dispatchEvent(new Event('change'));
      });

      let inFor = await page.evaluate(() => {
        return document.querySelector('li:nth-of-type(2) span').innerHTML.trim();
      });
      assert.ok(peopleArr.includes('Slash'));

      peopleArr = await page.evaluate(() => {
        return document.querySelector('#people-array').innerHTML.trim();
      });
      assert.ok(peopleArr.includes('Slash'));

      await browser.close();
      // acquit:ignore:end
    });

    it('v-model good', async function() {
      // acquit:ignore:start
      this.timeout(1000);
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      const fn = function() {
        // acquit:ignore:end
        const app = new Vue({
          data: () => ({
            people: [
              { name: 'Axl Rose' },
              { name: 'Slash' },
              { name: 'Izzy Stradlin' }
            ]
          }),
          template: `
            <div>
              <h1>Band Members</h1>
              <div id="people-array">{{people}}</div>
              <ul>
                <li v-for="person in people">
                  <input v-model="person.name">
                  <span>{{person.name}}</span>
                </li>
              </ul>
            </div>
          `
        });
        // acquit:ignore:start
        app.$mount('#content');
      };

      const html = createVueHTMLScaffolding(fn.toString());
      await page.setContent(html);

      let peopleArr = await page.evaluate(() => {
        return document.querySelector('#people-array').innerHTML.trim();
      });
      assert.ok(peopleArr.includes('Slash'));

      await page.evaluate(() => {
        const input = document.querySelector('li:nth-of-type(2) input');
        input.value = 'Saul Hudson';
        console.log(input)
        input.dispatchEvent(new Event('input'));
      });
      await new Promise(resolve => setTimeout(resolve, 50));

      let inFor = await page.evaluate(() => {
        return document.querySelector('li:nth-of-type(2) span').innerHTML.trim();
      });
      assert.ok(inFor.includes('Saul Hudson'), inFor);

      peopleArr = await page.evaluate(() => {
        return document.querySelector('#people-array').innerHTML.trim();
      });
      assert.ok(peopleArr.includes('Saul Hudson'));

      await browser.close();
      // acquit:ignore:end
    });

    it('object', async function() {
      const app = new Vue({
        data: () => ({
          people: {
            singer: 'Axl Rose',
            guitarist: 'Slash',
            bassist: 'Duff McKagan'
          }
        }),
        // 3 `<li>` elements: "Axl Rose - singer", "Slash - guitarist",
        // and "Duff McKagan - bassist"
        template: `
          <div>
            <h1>Band Members</h1>
            <ul>
              <li v-for="(value, key) in people">
                {{value}} - {{key}}
              </li>
            </ul>
          </div>
        `
      });
      // acquit:ignore:start
      let res = await renderToString(app);
      assert.ok(res.includes('Axl Rose - singer'));
      assert.ok(res.includes('Slash - guitarist'));
      assert.ok(res.includes('Duff McKagan - bassist'));
      // acquit:ignore:end
    });
  });

  it('login form', async function() {
    // acquit:ignore:start
    this.timeout(10000);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const fn = function() {
      // acquit:ignore:end
      const app = new Vue({
        data: () => ({
          username: '',
          password: '',
          error: null,
          success: false
        }),
        methods: {
          login: async function() {
            const auth = { username: this.username, password: this.password };
            // Correct username is 'foo' and password is 'bar'
            const url = 'https://httpbin.org/basic-auth/foo/bar';
            this.success = false;
            this.error = null;

            try {
              const res = await axios.get(url, { auth }).then(res => res.data);
              this.success = true;
            } catch (err) {
              this.error = err.message;
            }
          }
        },
        template: `
          <form @submit="login()">
            <h1>Login</h1>
            <div>
              <input type="string" placeholder="Username" v-model="username">
            </div>
            <div>
              <input type="password" placeholder="Password" v-model="password">
            </div>
            <div v-if="error">
              {{error}}
            </div>
            <div v-if="success" id="success">
              Logged in Successfully
            </div>
            <button type="submit">Submit</button>
          </div>
        `
      });
      // acquit:ignore:start
      app.$mount('#content');
    };

    const html = createVueHTMLScaffolding(fn.toString());
    await page.setContent(html);

    await page.evaluate(() => {
      document.querySelector('input[type="string"]').value = 'foo';
      document.querySelector('input[type="string"]').dispatchEvent(new Event('input'));

      document.querySelector('input[type="password"]').value = 'bar';
      document.querySelector('input[type="password"]').dispatchEvent(new Event('input'));

      document.querySelector('form').dispatchEvent(new Event('submit'));
    });

    await page.waitForSelector('#success');
    // acquit:ignore:end
  });

  describe('watch vs computed', function() {
    it('using computed', async function() {
      const app = new Vue({
        data: () => ({ items: [{ id: 1, price: 10, quantity: 2 }] }),
        computed: {
          numItems: function numItems() {
            return this.items.reduce((sum, item) => sum + item.quantity, 0);
          }
        },
        template: `<div>numItems is {{numItems}}</div>`
      });
      // acquit:ignore:start
      let res = await renderToString(app);
      assert.ok(res.includes('numItems is 2'), res);

      app.items[0].quantity = 3;
      res = await renderToString(app);
      assert.ok(res.includes('numItems is 3'), res);
      // acquit:ignore:end
    });

    it('using watch', async function() {
      const app = new Vue({
        data: () => ({
          items: [{ id: 1, price: 10, quantity: 2 }],
          numItems: 2
        }),
        watch: {
          items: function updateNumItems() {
            this.numItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
          }
        },
        template: `<div>numItems is {{numItems}}</div>`
      });
      // acquit:ignore:start
      let res = await renderToString(app);
      assert.ok(res.includes('numItems is 2'), res);

      // Doesn't work with SSR
      // app.items = [{ id: 1, price: 10, quantity: 3 }];
      // res = await renderToString(app);
      // assert.ok(res.includes('numItems is 3'), res);
      // acquit:ignore:end
    });
  });

  describe('click', function() {
    it('basic example', async function() {
      // Click the "Add" button twice to make the <h1> show
      // "Row row row your boat"
      const app = new Vue({
        data: () => ({ message: 'Row' }),
        template: `
        <div>
          <h1>{{message}} your boat</h1>
          <button v-on:click="message += ' row'">Add</button>
        </div>
        `
      });
      // acquit:ignore:start
      let res = await renderToString(app);
      assert.ok(res.includes('Row your boat'), res);
      // acquit:ignore:end
    });
  });

  describe('errorCaptured', function() {
    it('basic example', async function() {
      // acquit:ignore:start
      this.timeout(10000);
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      const fn = function() {
        // acquit:ignore:end
        Vue.component('test', {
          template: '<button v-on:click="notAMethod()">Throw</button>'
        });

        const app = new Vue({
          data: () => ({ count: 0 }),
          errorCaptured: function(err) {
            console.log('Caught error', err.message);
            ++this.count;
            return false;
          },
          template: `
          <div>
            <span id="count">{{count}}</span>
            <test></test>
          </div>
          `
        });
        // acquit:ignore:start
        app.$mount('#content');
      };

      const html = createVueHTMLScaffolding(fn.toString());
      await page.setContent(html);

      let count = await page.evaluate(() => document.querySelector('#count').innerHTML.trim());
      assert.equal(count, 0);

      page.evaluate(() => document.querySelector('button').dispatchEvent(new Event('click')));

      count = await page.evaluate(() => document.querySelector('#count').innerHTML.trim());
      assert.equal(count, 1);

      page.evaluate(() => document.querySelector('button').dispatchEvent(new Event('click')));

      count = await page.evaluate(() => document.querySelector('#count').innerHTML.trim());
      assert.equal(count, 2);
      // acquit:ignore:end
    });

    it('same component', async function() {
      // acquit:ignore:start
      this.timeout(10000);
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      const fn = function() {
        // acquit:ignore:end
        const app = new Vue({
          data: () => ({ count: 0 }),
          // Vue won't call this hook, because the error occurs in this Vue
          // instance, not a child component.
          errorCaptured: function(err) {
            console.log('Caught error', err.message);
            ++this.count;
            return false;
          },
          template: `
          <div>
            <span id="count">{{count}}</span>
            <button v-on:click="notAMethod()">Throw</button>
          </div>
          `
        });
        // acquit:ignore:start
        app.$mount('#content');
      };

      const html = createVueHTMLScaffolding(fn.toString());
      await page.setContent(html);

      let count = await page.evaluate(() => document.querySelector('#count').innerHTML.trim());
      assert.equal(count, 0);

      page.evaluate(() => document.querySelector('button').dispatchEvent(new Event('click')));

      count = await page.evaluate(() => document.querySelector('#count').innerHTML.trim());
      assert.equal(count, 0);
      // acquit:ignore:end
    });

    it('async', async function() {
      // acquit:ignore:start
      this.timeout(10000);
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      const fn = function() {
        // acquit:ignore:end
        Vue.component('test', {
          methods: {
            // Vue bubbles up async errors to the parent's `errorCaptured()`, so
            // every time you click on the button, Vue will call the `errorCaptured()`
            // hook with `err.message = 'Oops'`
            test: async function test() {
              await new Promise(resolve => setTimeout(resolve, 50));
              throw new Error('Oops!');
            }
          },
          template: '<button v-on:click="test()">Throw</button>'
        });

        const app = new Vue({
          data: () => ({ count: 0 }),
          errorCaptured: function(err) {
            console.log('Caught error', err.message);
            ++this.count;
            return false;
          },
          template: `
          <div>
            <span id="count">{{count}}</span>
            <test></test>
          </div>
          `
        });
        // acquit:ignore:start
        app.$mount('#content');
      };

      const html = createVueHTMLScaffolding(fn.toString());
      await page.setContent(html);

      let count = await page.evaluate(() => document.querySelector('#count').innerHTML.trim());
      assert.equal(count, 0);

      page.evaluate(() => document.querySelector('button').dispatchEvent(new Event('click')));

      await new Promise(resolve => setTimeout(resolve, 500));

      count = await page.evaluate(() => document.querySelector('#count').innerHTML.trim());
      assert.equal(count, 1);
      // acquit:ignore:end
    });

    it('multi level propagation', async function() {
      // acquit:ignore:start
      this.timeout(10000);
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      const fn = function() {
        // acquit:ignore:end
        Vue.component('level2', {
          template: '<button v-on:click="notAMethod()">Throw</button>'
        });

        Vue.component('level1', {
          errorCaptured: function(err) {
            console.log('Level 1 error', err.message);
          },
          template: '<level2></level2>'
        });

        const app = new Vue({
          data: () => ({ count: 0 }),
          errorCaptured: function(err) {
            // Since the level1 component's `errorCaptured()` didn't return `false`,
            // Vue will bubble up the error.
            console.log('Caught top-level error', err.message);
            ++this.count;
            return false;
          },
          template: `
          <div>
            <span id="count">{{count}}</span>
            <level1></level1>
          </div>
          `
        });
        // acquit:ignore:start
        app.$mount('#content');
      };

      const html = createVueHTMLScaffolding(fn.toString());
      await page.setContent(html);

      let count = await page.evaluate(() => document.querySelector('#count').innerHTML.trim());
      assert.equal(count, 0);

      page.evaluate(() => document.querySelector('button').dispatchEvent(new Event('click')));

      count = await page.evaluate(() => document.querySelector('#count').innerHTML.trim());
      assert.equal(count, 1);
      // acquit:ignore:end
    });

    it('stop propagation', async function() {
      // acquit:ignore:start
      this.timeout(10000);
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      const fn = function() {
        // acquit:ignore:end
        Vue.component('level2', {
          template: '<button v-on:click="notAMethod()">Throw</button>'
        });

        Vue.component('level1', {
          errorCaptured: function(err) {
            console.log('Level 1 error', err.message);
            return false;
          },
          template: '<level2></level2>'
        });

        const app = new Vue({
          data: () => ({ count: 0 }),
          errorCaptured: function(err) {
            // Since the level1 component's `errorCaptured()` returned `false`,
            // Vue won't call this function.
            console.log('Caught top-level error', err.message);
            ++this.count;
            return false;
          },
          template: `
          <div>
            <span id="count">{{count}}</span>
            <level1></level1>
          </div>
          `
        });
        // acquit:ignore:start
        app.$mount('#content');
      };

      const html = createVueHTMLScaffolding(fn.toString());
      await page.setContent(html);

      let count = await page.evaluate(() => document.querySelector('#count').innerHTML.trim());
      assert.equal(count, 0);

      page.evaluate(() => document.querySelector('button').dispatchEvent(new Event('click')));

      count = await page.evaluate(() => document.querySelector('#count').innerHTML.trim());
      assert.equal(count, 0);
      // acquit:ignore:end
    });
  });

  describe('vuex getters', function() {
    it('basic example', function() {
      const Vuex = require('vuex');

      const store = new Vuex.Store({
        state: {
          firstName: 'Bill',
          lastName: 'Gates'
        },
        getters: {
          fullName: state => `${state.firstName} ${state.lastName}`
        }
      });

      store.getters.fullName; // 'Bill Gates'
      // acquit:ignore:start
      assert.equal(store.getters.fullName, 'Bill Gates');
      // acquit:ignore:end
    });

    it('reactive', function() {
      // acquit:ignore:start
      const Vuex = require('vuex');
      // acquit:ignore:end
      const store = new Vuex.Store({
        state: {
          firstName: 'Bill',
          lastName: 'Gates'
        },
        getters: {
          fullName: state => `${state.firstName} ${state.lastName}`
        },
        mutations: {
          changeFirstName(state, val) {
            state.firstName = val;
          }
        }
      });
      
      // When you commit a change, the next time you access the getter you get
      // an updated value!
      store.commit('changeFirstName', 'William');
      store.getters.fullName; // 'William Gates'
      // acquit:ignore:start
      assert.equal(store.getters.fullName, 'William Gates');
      // acquit:ignore:end
    });

    it('component using fullName', async function() {
      // acquit:ignore:start
      this.timeout(10000);
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      
      const fn = function() {
        Vue.use(Vuex);
        // acquit:ignore:end
        const store = new Vuex.Store({
          state: {
            firstName: 'Bill',
            lastName: 'Gates'
          },
          getters: {
            fullName: state => `${state.firstName} ${state.lastName}`
          },
          mutations: {
            changeFirstName(state, val) {
              state.firstName = val;
            }
          }
        });

        const app = new Vue({
          store,
          computed: {
            fullName: function() {
              return this.$store.getters.fullName;
            }
          },
          methods: {
            toggleName: function() {
              const newName = this.fullName === 'William Gates' ? 'Bill' : 'William';
              this.$store.commit('changeFirstName', newName);
            }
          },
          template: `
            <div>
              <h1>{{fullName}}</h1>
              <button v-on:click="toggleName">
                Toggle
              </button>
            </div>
          `
        });
        // acquit:ignore:start
        app.$mount('#content');
      };
      
      const html = createVueHTMLScaffolding(fn.toString());
      await page.setContent(html);
      
      let fullName = await page.evaluate(() => document.querySelector('h1').innerHTML.trim());
      assert.equal(fullName, 'Bill Gates');

      page.evaluate(() => document.querySelector('button').dispatchEvent(new Event('click')));

      fullName = await page.evaluate(() => document.querySelector('h1').innerHTML.trim());
      assert.equal(fullName, 'William Gates');
      // acquit:ignore:end
    });
  });

  describe('vuex store', function() {
    it('basic example', function() {
      const Vuex = require('vuex');

      const store = new Vuex.Store({
        state: { count: 0 }
      });

      store.state; // { count: 0 }
      // acquit:ignore:start
      assert.deepEqual(store.state, { count: 0 });
      // acquit:ignore:end
    });

    it('mutations', function() {
      const Vuex = require('vuex');

      const store = new Vuex.Store({
        state: { count: 0 },
        mutations: {
          increment: store => store.count += 1,
          decrement: store => store.count -= 1
        }
      });

      store.state; // { count: 0 }
      // acquit:ignore:start
      assert.deepEqual(store.state, { count: 0 });
      // acquit:ignore:end

      store.commit('increment');
      store.state; // { count: 1 }
      // acquit:ignore:start
      assert.deepEqual(store.state, { count: 1 });
      // acquit:ignore:end

      store.commit('decrement');
      store.state; // { count: 0 }
      // acquit:ignore:start
      assert.deepEqual(store.state, { count: 0 });
      // acquit:ignore:end
    });

    it('getters', function() {
      const Vuex = require('vuex');

      const store = new Vuex.Store({
        state: { count: 0 },
        getters: {
          count: store => store.count
        },
        mutations: {
          increment: store => store.count += 1,
          decrement: store => store.count -= 1
        }
      });

      store.getters.count; // 0
      // acquit:ignore:start
      assert.equal(store.getters.count, 0);
      // acquit:ignore:end

      store.commit('increment');
      store.getters.count; // 1
      // acquit:ignore:start
      assert.equal(store.getters.count, 1);
      // acquit:ignore:end
    });

    it('in browser', async function() {
      // acquit:ignore:start
      this.timeout(10000);
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      
      const fn = function() {
        // acquit:ignore:end
        Vue.use(Vuex);

        const store = new Vuex.Store({
          state: { count: 0 },
          getters: {
            count: state => state.count
          },
          mutations: {
            increment: store => store.count += 1,
            decrement: store => store.count -= 1
          }
        });

        const app = new Vue({
          store,
          computed: {
            count: function() {
              return this.$store.getters.count;
            }
          },
          template: `
            <div>
              <h1>{{count}}</h1>
              <button v-on:click="$store.commit('increment')" id="increment">
                Increment
              </button>
              <button v-on:click="$store.commit('decrement')" id="decrement">
                Decrement
              </button>
            </div>
          `
        });
        // acquit:ignore:start
        app.$mount('#content');
      };
      
      const html = createVueHTMLScaffolding(fn.toString());
      await page.setContent(html);
      
      let count = await page.evaluate(() => document.querySelector('h1').innerHTML.trim());
      assert.equal(count, '0');

      page.evaluate(() => document.querySelector('#increment').dispatchEvent(new Event('click')));

      count = await page.evaluate(() => document.querySelector('h1').innerHTML.trim());
      assert.equal(count, '1');
      // acquit:ignore:end
    });
  });

  describe('vuex actions', function() {
    it('basic example', async function() {
      const Vuex = require('vuex');

      const store = new Vuex.Store({
        state: {
          count: 0
        },
        mutations: {
          increment: state => ++state.count
        },
        actions: {
          incrementDelay: async function(context) {
            // Wait 50ms
            await new Promise(resolve => setTimeout(resolve, 50));
  
            context.commit('increment');
          }
        }
      });
  
      // To "call" an action, you should use call `dispatch()` function with
      // the action's name.
      await store.dispatch('incrementDelay');
      store.state.count; // 1
      // acquit:ignore:start
      assert.equal(store.state.count, 1);
      // acquit:ignore:end
    });

    it('vs async function', async function() {
      const Vuex = require('vuex');

      const store = new Vuex.Store({
        state: {
          count: 0
        },
        mutations: {
          increment: state => ++state.count
        }
      });

      async function incrementDelay() {
        // Wait 50ms
        await new Promise(resolve => setTimeout(resolve, 50));

        store.commit('increment');
      }
  
      // Instead of dispatching an action, you could just call an
      // async function.
      await incrementDelay();
      store.state.count; // 1
      // acquit:ignore:start
      assert.equal(store.state.count, 1);
      // acquit:ignore:end
    });

    it('subscribeAction', async function() {
      const Vuex = require('vuex');

      const store = new Vuex.Store({
        state: {
          count: 0
        },
        mutations: {
          increment: state => ++state.count
        },
        actions: {
          incrementDelay: async function(context) {
            // Wait 50ms
            await new Promise(resolve => setTimeout(resolve, 50));
  
            context.commit('increment');
          }
        }
      });

      store.subscribeAction(function callback(action, state) {
        // Prints "{ type: 'incrementDelay', payload: undefined }"
        console.log(action);
      });
  
      // To "call" an action, you should use call `dispatch()` function with
      // the action's name.
      await store.dispatch('incrementDelay');
      store.state.count; // 1
      // acquit:ignore:start
      assert.equal(store.state.count, 1);
      // acquit:ignore:end
    });
  });
  it('vue-websocket', async function() {
    // acquit:ignore:start
    this.timeout(10000);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const fn = function() {
    // acquit:ignore:end
      const app = new Vue({
        data: () => ({ time: null }),
        template: `
          <div>
            <h2>{{time}}</h2>
          </div>
        `,
        mounted: function(){
          let connection = new WebSocket('ws://localhost:3000/');
          connection.onmessage = (event) => {
            // Vue data binding means you don't need any extra work to
            // update your UI. Just set the `time` and Vue will automatically
            // update the `<h2>`.
            this.time = event.data;
          }
        }
      });
      app.$mount("#content");
    // acquit:ignore:start
    };
    const html = createVueHTMLScaffolding(fn.toString());
    await page.setContent(html);
    page.evaluate(() => document.querySelector('button').dispatchEvent(new Event('click')));
    // acquit:ignore:end
  });
  it('vue-file-upload', async function() {
    // acquit:ignore:start
    this.timeout(10000);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const fn = function() {
    // acquit:ignore:end
    const app = new Vue({
      data: () => ({Images: null}),
      template: `
        <div>
          <input type = "file" @change="uploadFile" ref="file">
          <button @click="submitFile">Upload!</button>
        </div>
      `,
      methods: {
        uploadFile() {
          this.Images = this.$refs.file.files[0];
        },
        submitFile() {
          const formData = new FormData();
          formData.append('file', this.Images);
          axios.post('https://httpbin.org/post', formData, {headers: {
            'Content-Type': 'multipart/form-data'}}).then((res) => {
            res.data.files;
          });
        }
      }
    });
    app.$mount("#content");
  // acquit:ignore:start
  };
  const html = createVueHTMLScaffolding(fn.toString());
  await page.setContent(html);
  page.evaluate(() => document.querySelector('button').dispatchEvent(new Event('click')));
  // acquit:ignore:end
  });
});

function createVueHTMLScaffolding(code) {
  return `
    <html>
      <body>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
        <script src="https://unpkg.com/vuex/dist/vuex.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>

        <div id="content"></div>
    
        <script type="text/javascript">
          (${code})();
        </script>
      </body>
    </html>
  `;
}
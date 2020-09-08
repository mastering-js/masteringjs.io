[Vue Test Utils](http://npmjs.com/package/@vue/test-utils) is Vue's official library for testing Vue components
from Node.js. For example, suppose you have a simple counter component:

```javascript
const Vue = require('vue');

module.exports = Vue.component('App', {
  data: () => ({ count: 0 }),
  methods: {
    increment: function increment() {
      ++this.count;
    }
  },
  template: `
    <div>
      <span>{{count}}</span>
      <button @click="increment">Increment</button>
    </div>
  `
});
```

Here's how you can mount and interact with the above component using Vue Test Utils. Note that [Vue Test Utils **requires** JSDom to work](https://vue-test-utils.vuejs.org/guides/#choosing-a-test-runner). The below example is a standalone script
that you can run in Node.js, no test runners required.

```javascript
// Make sure to put jsdom before `require('vue')`!
require('jsdom-global')();

const Vue = require('vue');
const { mount } = require('@vue/test-utils');

// Must be a component, **not** a Vue instance, otherwise you get:
// "Failed to mount component: template or render function not defined"
const component = Vue.component('App', {
  data: () => ({ count: 0 }),
  methods: {
    increment: function increment() {
      ++this.count;
    }
  },
  template: `
    <div>
      <span>{{count}}</span>
      <button @click="increment">Increment</button>
    </div>
  `
});

const wrapper = mount(component);

run().catch(err => console.log(err));

async function run() {
  wrapper.html(); // <div><span>0</span> <button>Increment</button></div>

  // Note that `trigger()` is an async function
  await wrapper.find('button').trigger('click');
  wrapper.html(); // <div><span>1</span> <button>Increment</button></div>
}
```

Testing with [Mocha](/mocha)
--------------------------

Mocha is a minimal test framework, so you can easily port the above script into Mocha tests. Plus, Mocha makes it
easy to clean up JSDom when your tests are done, so you don't have to worry about polluting your Node.js environment
if you want to run Node tests.

```javascript
const assert = require('assert');

describe('App', function() {
  let Vue;
  let mount;
  let cleanup;
  let wrapper;

  before(async function() {
    cleanup = require('jsdom-global')();
    Vue = require('vue');
    mount = require('@vue/test-utils').mount;
  });

  after(() => cleanup());

  beforeEach(function() {
    const component = Vue.component('App', {
      data: () => ({ count: 0 }),
      methods: {
        increment: function increment() {
          ++this.count;
        }
      },
      template: `
        <div>
          <span>{{count}}</span>
          <button @click="increment">Increment</button>
        </div>
      `
    });
    wrapper = mount(component);
  });

  it('increments when you click', async function() {
    assert.ok(wrapper.html().includes('<span>0</span'));

    await wrapper.find('button').trigger('click');
    assert.ok(wrapper.html().includes('<span>1</span'));
  });
});
```
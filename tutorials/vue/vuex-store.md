A [Vuex Store](https://vuex.vuejs.org/api/#vuex-store) is the fundamental object in Vuex. A store wraps your app's
[state](https://vuex.vuejs.org/guide/state.html) in a convenient object and gives you access to powerful features
and patterns, like [mutations](https://vuex.vuejs.org/guide/mutations.html) and [getters](/tutorials/vue/vuex-getters).

Creating a Store
----------------

Vuex exports a `Store` class. So you can use `require()` in Node.js, or [ESM `import`](/tutorials/node/import) to pull in Vuex, and create a new store:

```javascript
const Vuex = require('vuex');

// Equivalent:
import Vuex from 'vuex';

// Create a new store:
const store = new Vuex.Store({
  state: {
    count: 0
  }
});
```

You can also load Vuex via a `script` tag from a CDN like [unpkg](https://unpkg.com/):

```html
<script src="https://unpkg.com/vuex/dist/vuex.js"></script>
<script>
  const store = new Vuex.Store({
    state: {
      count: 0
    }
  });
</script>
```

Using a Store
-------------

You experiment with Vuex in Node.js without using Vue at all. For example, here's how you can create a new
store and print the current state.

```javascript
[require:Vue vuex store basic example$]
```

The canonical way to modify a Vuex store's state is via a _mutation_. You should not modify the `state` property
directly. Below is how you can define mutations that increment and decrement the `count` property:

```javascript
[require:Vue vuex store mutations$]
```

Although you can access a Vuex store's state directly with `store.state`, you typically wouldn't do that in
a Vue app. That's because accessing `store.state` directly doesn't tie in to Vue's reactivity properly. Instead,
you would define a [Vuex getter](/tutorials/vue/vuex-getters).

```javascript
[require:Vue vuex store getters$]
```

Adding the Store to Your App
----------------------------

In order to wire up your Vue app to use Vuex, you need to do two things:

1. Call `Vue.use(Vuex)` before you define your app.
2. Create a `store` and pass it to the Vue constructor. For example, `new Vue({ store, computed, template })`

For example, below is how you can wire up a Vue instance to use the `count` store:

```javascript
[require:Vue vuex store in browser$]
```
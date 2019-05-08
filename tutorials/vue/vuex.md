[Vuex](https://github.com/vuejs/vuex) is the official state management library for Vue. A handy metaphor is that Vuex is to Vue as [Redux](https://www.npmjs.com/package/redux) is to [React](https://www.npmjs.com/package/react). If you already know Redux, Vuex will seem familiar, just with slightly different terminology. In this article, you'll learn the basics of Vuex from standalone Node.js scripts, no browser required.

First, to get started, you should install [vue](https://www.npmjs.com/package/vue), [vuex](https://www.npmjs.com/package/vuex), and [vue-server-renderer](https://www.npmjs.com/package/vue-server-renderer) from npm. Here's how you import these libraries:

```javascript
const { renderToString } = require('vue-server-renderer').createRenderer();
const Vuex = require('vuex');
Vue.use(Vuex);
```

Next, let's define a template that displays a single number `count` that's stored in Vuex. This script has 4 steps:

1) Create a Vuex store. To create a Vuex store, you need to define [state](https://vuex.vuejs.org/guide/state.html), [mutations](https://vuex.vuejs.org/guide/mutations.html), and [actions](https://vuex.vuejs.org/guide/actions.html).

2) Create a Vue app that's wired up to use the Vuex store.

3) Render the app using vue-server-renderer.

4) Dispatch an action and re-render the app using vue-server-renderer.

```javascript
[require:Vue.*Vuex.*counter]
```

If you're coming from Redux, the concepts of _state_ and _action_ in Vuex are equivalent to states and actions in Redux. You can think of a _mutation_ as being equivalent to a reducer.

Async Actions
-------------

One key difference between actions and mutations is that actions can be asynchronous, whereas [mutations must be synchronous](https://vuex.vuejs.org/guide/mutations.html#mutations-must-be-synchronous). Making state changes in separate synchronous mutations enables better debugging and better devtools. Actions, however, can be async. For example, your `increment` action can be async as shown below.

```javascript
[require:Vue.*Vuex.*async action]
```

One important caveat is that Vuex doesn't handle errors in async actions for you. If an async action throws an error, you'll get an [unhandled promise rejection](https://thecodebarbarian.com/unhandled-promise-rejections-in-node.js.html) unless you explicitly handle the error using `.catch()` or [async/await](https://thecodebarbarian.com/80-20-guide-to-async-await-in-node.js).

```javascript
[require:Vue.*Vuex.*async error]
```
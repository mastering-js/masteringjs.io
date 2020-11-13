In Vuex, [actions](https://vuex.vuejs.org/guide/actions.html) are functions that call [mutations](https://vuex.vuejs.org/guide/mutations.html). Actions exist because [mutations _must_ be synchronous](https://vuex.vuejs.org/guide/mutations.html#mutations-must-be-synchronous), whereas actions can be asynchronous.

You can define actions by passing a [POJO](/tutorials/fundamentals/pojo) as the `actions` property to the
[Vuex store](https://vuex.vuejs.org/api/#vuex-store) constructor as shown below. To "call" an action, you
should use the [`Store#dispatch()` function](https://vuex.vuejs.org/api/#dispatch).

```javascript
[require:Vue vuex actions basic example$]
```

What's the Point of Actions?
----------------------------

The obvious question to ask about actions is "why actions?" Vuex stores have a [`commit()` function](https://vuex.vuejs.org/api/#dispatch) that lets any function commit mutations, so you could just as easily do this:

```javascript
[require:Vue vuex actions vs async function$]
```

In isolation, the async function approach above is better because it doesn't depend on any particular framework.
You can just call a function and that's it. Plus you can just use `incrementDelay()` as a method on your Vue instance
and get [error handling](/tutorials/vue/error-handling) for free.

But there's one very cool benefit of using actions: the [`subscribeAction` API](https://vuex.vuejs.org/api/#subscribeaction). Vue lets you register a [callback](/tutorials/fundamentals/callbacks) that Vue will call
every time an action is dispatched.

```javascript
[require:Vue vuex actions subscribeAction$]
```

The `subscribeAction()` API is the basis for many [Vuex plugins](https://vuex.vuejs.org/guide/plugins.html), so
using actions can let you better leverage the Vue community's plugins.

`mapActions()`
--------------

Actions are great, but how do you use them with Vue components? Vuex has a neat [`mapActions()` function](https://vuex.vuejs.org/guide/actions.html#dispatching-actions-in-components) that converts actions to Vue instance methods
as shown below.

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment: state => ++state.count
  },
  getters: {
    count: state => state.count
  },
  actions: {
    incrementDelay: async function(context) {
      // Wait 50ms
      await new Promise(resolve => setTimeout(resolve, 50));
  
      context.commit('increment');
    }
  }
});

const app = new Vue({
  store,
  methods: Vuex.mapActions(['incrementDelay']),
  computed: Vuex.mapGetters(['count']),
  mounted: async function() {
    await this.incrementDelay(); // Dispatches "incrementDelay"
  },
  // Displays 0, then 1 after 50ms
  template: `<h1>{{count}}</h1>`
});
```
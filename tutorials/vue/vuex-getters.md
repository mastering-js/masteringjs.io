[Vuex getters](https://vuex.vuejs.org/guide/getters.html#property-style-access) behave a lot like [Mongoose getters](https://mongoosejs.com/docs/tutorials/getters-setters.html): they're special properties that are computed from
other properties when you access them.

For example, suppose your store contains a user's `firstName` and `lastName`. You can write a getter that returns
the user's `fullName`.

```javascript
[require:Vue vuex getters basic example$]
```

Change Tracking
---------------

Vuex getters react to changes in the store's state just like [computed properties](/tutorials/vue/computed). So
if you update one of the state properties the getter relies on, the getter value updates too:

```javascript
[require:Vue vuex getters reactive$]
```

`mapGetters()`
--------------

What makes getters so interesting is that you can use them in your component's
[computed properties](/tutorials/vue/computed), so your UI updates whenever the state changes.
For example, below is a component that displays the computed `fullName` and updates automatically whenever
the `fullName` changes:

```javascript
[require:Vue vuex getters component using fullName$]
```

This is easy to write by hand for one computed property, but can get unwieldy if you need many computed properties.
That's why Vuex has a neat `mapGetters()` helper that takes a list of property names and returns a list of computed
property functions.

```javascript
const app = new Vue({
  store,
  // Equivalent to the previous example
  computed: Vuex.mapGetters(['fullName']),
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
```

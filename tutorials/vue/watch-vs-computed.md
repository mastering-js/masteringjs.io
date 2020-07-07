[Vue's `watch()` function](/tutorials/vue/watch) can serve a similar purpose
as [computed properties](/tutorials/vue/computed). For example, suppose you want
to track the number of items in a user's shopping cart. You could represent
`numItems` as a computed property:

```javascript
[require:Vue watch vs computed using computed$]
```

You could also define a watcher that updates a `numItems` property every
time `items` changes:

```javascript
[require:Vue watch vs computed using watch$]
```

Which approach should you use? In general, you should use computed properties
for updating values. You should only use watchers for "side effects" like
`console.log()`, or HTTP requests. Here's why.

Keeping Updates in Sync
----------------------

The problem with `numItems` as a watcher is that you can accidentally update
`numItems` without updating `items`. That means `numItems` may be out of sync.

```javascript
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
  methods: {
    myMethod: function() {
      // Perfectly valid, since `numItems` is a data property.
      this.numItems = 5;
    }
  },
  template: `<div>numItems is {{numItems}}</div>`
});
```

On the other hand, if you try to update a computed property, Vue will treat
it as a no-op and print the below warning:

```
[Vue warn]: Computed property "numItems" was assigned to but it has no setter.
```

So `numItems` is guaranteed to stay in sync with the contents of `items`, even
if you accidentally try to overwrite it.

When to Use Watchers
--------------------

The Vue docs recommend using watchers when [you want to perform async operations in response to changing data](https://vuejs.org/v2/guide/computed.html#Watchers). For example, if you want to automatically save the `cart` every time it changes, you might
do something like this:

```javascript
const app = new Vue({
  data: () => ({
    items: [{ id: 1, price: 10, quantity: 2 }],
  }),
  watch: {
    items: async function saveCart() {
      await axios.put('/cart', items);
    }
  },
  template: ...
});
```
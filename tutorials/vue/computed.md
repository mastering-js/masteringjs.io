In Vue, [computed properties](https://vuejs.org/v2/guide/computed.html) help you avoid putting too much logic in your [template](/tutorials/vue/templates) expressions. For example, suppose your app has a list of reviews, and you want to display the average of all reviews.

```javascript
[require:Vue.*computed.*motivation]
```

Instead of computing the average in the template, you can instead
create a computed property `average`, and use `average` in the 
template expression instead.

```javascript
[require:Vue.*computed.*basic example]
```

When To Use Computed Properties Versus Methods
----------------------------------------------

You can also use Vue methods to abstract out complex template logic as shown below.

```javascript
[require:Vue.*computed.*method]
```

Both approaches work, but Vue [caches computed properties based on their "reactive values"](https://vuejs.org/v2/guide/computed.html#Computed-Caching-vs-Methods).
In other words, Vue figures out what `data` fields your computed property relies on,
and doesn't recompute the computed property unless one of those `data` fields
changes.

For example, if you have a computed property that only depends on `field1`,
Vue won't recompute the property if you modify `field2`.

```javascript
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
        {{field1}} {{field2Upper.toLowerCase()}}
      </div>
      <button v-on:click="field1 += ' row'">Add</button>
    </div>
  `
});
```

If your computed property is expensive, computed properties can save you from
unnecessarily recalculating. [Vue has a clever algorithm for tracking what properties your computed property depends on](https://forum.vuejs.org/t/how-vuejs-knows-the-dependencies-of-computed-properties-for-caching/4945/2). When the function `getter()` above accesses `field2`, Vue intercepts
that property access and adds it to a list of fields `getter()` depends on.
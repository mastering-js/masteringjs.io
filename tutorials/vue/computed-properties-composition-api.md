To create a computed property with the Vue's Composition API, you should call Vue's `computed()` function.
For example, the following code demonstrates how to create a computed property that transforms a string value to lowercase.

```javascript
Vue.createApp({
  setup() {
    const name = Vue.ref('World');
    const lowercase = Vue.computed(() => name.value.toLowerCase());

    // Make sure to return your computed property
    // so your templates can use it!
    return { name, lowercase };
  },
  template: `
  <div>
    <input v-model="name">
    <div>
      Hello, {{lowercase}}
    </div>
  </div>
  `
}).mount('#app');
```

Below is a live example.
Notice that Vue automatically updates the value of `lowercase` whenever `name` changes.

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app" style="border: 1px solid #ddd; padding: 1em"></div>

<script>
Vue.createApp({
  setup() {
    const name = Vue.ref('World');
    const lowercase = Vue.computed(() => name.value.toLowerCase());
    return { name, lowercase };
  },
  template: `
  <div>
    <input v-model="name">
    <div>
      Hello, {{lowercase}}
    </div>
  </div>
  `
}).mount('#app');
</script>
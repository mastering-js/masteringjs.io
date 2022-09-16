To create a computed property with the Vue's Composition API, initialize the computed property in the `setup` hook in conjunction with the `ref` function.
Then, make sure the `setup` hook returns all the values you wish to use later on.

```javascript
  const { createApp, ref, computed } = Vue

  createApp({
    data: function() {
        return {
            message: 'Example'
        }
    },
    setup(){
        const count = ref(0);
        const double = computed(() => count.value * 2);
        return { count, double };
    },
    template: `
    <div>
        <div>{{message}}</div>
    <button @click="count++">Hello There: {{count}}</button>
    <h2>{{double}}</h2>
    </div>
    `
  }).mount('#app')
```

The above example increases the value of the count variable while the computed property displays the value of the count variable doubled.

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app" style="border: 1px solid #ddd; padding: 1em"></div>

<script>
  const { createApp, ref, computed } = Vue

  createApp({
    data: function() {
        return {
            message: 'Example'
        }
    },
    setup(){
        const count = ref(0);
        const double = computed(() => count.value * 2);
        return { count, double };
    },
    template: `
    <div>
        <div>{{message}}</div>
    <button @click="count++">Hello There: {{count}}</button>
    <h2>{{double}}</h2>
    </div>
    `
  }).mount('#app')
</script>
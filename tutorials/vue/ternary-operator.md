You can use `?` in Vue templates to conditionally display data.


<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app"></div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        value: 0
      }
    },
    methods: {
      increaseVal() {
        this.value++
      }
    },
    template: `
    <div>
      <div>{{value}}</div>
      <div>{{value % 2 == 0 ? 'The number is even' : 'The number is odd'}}</div>
      <div>
        <button @click="increaseVal">Click me</button>
      </div>
    </div>
    `
  }).mount('#app')
</script>

```javascript
  const { createApp } = Vue

  createApp({
    data() {
      return {
        value: 0
      }
    },
    methods: {
      increaseVal() {
        this.value++
      }
    }
    template: `
    <div>
      <div>{{value % 2 == 0 ? 'The number is even' : 'The number is odd'}}</div>
      <div>
        <button @click="increaseVal">Click me</button>
      </div>
    </div>
    `
  }).mount('#app')
```

## Limitations of the ternary operator

You cannot use `?` on `v-model` expressions.
If you want to conditionally update a property when an input changes, you need to use `@input` as shown [here](/tutorials/vue/v-model.html).
You can use the ternary operator `?` in Vue templates to conditionally display data.
The ternary operator works with `{{}}`, `v-text`, `:show`, [`:class`](/tutorials/vue/conditional-class), `:style`, and other render-only directives.
However, you **cannot** use the ternary operator with `v-model`.

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app" style="border: 1px solid #ddd; padding: 10px"></div>

<script>
Vue.createApp({
  data: () => ({ value: 0 }),
  methods: {
    increaseVal() {
      this.value++;
    }
  },
  template: `
  <div>
    <div>
      <button @click="increaseVal">Increase Value by 1</button>
    </div>
    <div>Current Value: {{value}}</div>
    <div :style="{ color: value % 2 === 0 ? 'red' : 'green' }">
      {{value % 2 == 0 ? 'Value is even' : 'Value is odd'}}
    </div>
  </div>
  `
}).mount('#app');
</script>

```javascript
Vue.createApp({
  data: () => ({ value: 0 }),
  methods: {
    increaseVal() {
      this.value++;
    }
  },
  template: `
  <div>
    <div>
      <button @click="increaseVal">Increase Value by 1</button>
    </div>
    <div>Current Value: {{value}}</div>
    <div :style="{ color: value % 2 === 0 ? 'red' : 'green' }">
      {{value % 2 == 0 ? 'Value is even' : 'Value is odd'}}
    </div>
  </div>
  `
});
```

## With `v-model`

You cannot use the ternary operator `?` with `v-model` expressions.
However, remember that [two way data binding with `v-model`](/tutorials/vue/v-model) is just a combination of `v-bind` and `v-on:input`.
So if you want to update a different variable based on a condition, you can implement `v-model` manually as follows.

```javascript
Vue.createApp({
  // If `disableBinding` is true, updating the text input will not
  // modify `value`
  data: () => ({ disableBinding: false, value: 'Hello, World!' }),
  template: `
  <div>
    <div>
      <div>Text Input:</div>
      <input
        :value="value"
        @change="value = disableBinding ? value : $event.target.value">
    </div>
    <div>
      <div>JS Value:</div>
      <div>{{value}}</div>
    </div>
    <div>
      <div>Disable Binding</div>
      <input type="checkbox" v-model="disableBinding">
    </div>
  </div>
  `
}).mount('#app2');
```

<div id="app2" style="border: 1px solid #ddd; padding: 10px"></div>

<script>
Vue.createApp({
  data: () => ({ disableBinding: false, value: 'Hello, World!' }),
  template: `
  <div>
    <div>
      <div>Text Input:</div>
      <input
        :value="value"
        @change="value = disableBinding ? value : $event.target.value">
    </div>
    <div>
      <div>JS Value:</div>
      <div>{{value}}</div>
    </div>
    <div>
      <div>Disable Binding</div>
      <input type="checkbox" v-model="disableBinding">
    </div>
  </div>
  `
}).mount('#app2');
</script>
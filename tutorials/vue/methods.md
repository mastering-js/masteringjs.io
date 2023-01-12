Methods in Vue are defined in the `methods` object.

```javascript
Vue.createApp({
  data: () => ({ value: 0 }),
  methods: {
    getValue() {
      return this.value;
    }
  },
  template: `
  <div>
    <div>A function that returns the value of 'value'</div>
    <div>{{getValue()}}</div>
  </div>
  `
}).mount('#app');
```

## Methods are reactive

If your Vue template uses a method, and a value that the method relies on changes, Vue will re-render the template.
For example, the following code correctly displays the current `value`, even though `value` is displayed using a method.

```javascript
Vue.createApp({
  data: () => ({ value: 0 }),
  methods: {
    getValue() {
      return this.value;
    },
    incrementValue() {
      this.value++;
    }
  },
  template: `
  <div>
    <div>Change the Value of 'value'</div>
    <div>
      <button @click="incrementValue">Click me</button>
    </div>
    <div>Current Value: {{getValue()}}</div>
  </div>
  `
}).mount('#example');
```

## Methods can be async

Simply add the `async` keyword in front of your function name to make it async.
Async methods aren't useful for displaying in templates, but they are helpful for making API requests when the user clicks a button or submits a form.

```javascript
Vue.createApp({
  data: () => ({ response: '' }),
  methods: {
    async makeRequest() {
      const res = await fetch('https://httpbin.org/get').
        then(res => res.json());
      this.response = res;
    }
  },
  template: `
  <div>
    <div>Make an async request</div>
    <div>The response: {{response}} </div>
    <div>
      <button @click="makeRequest">Click Me</button>
    </div>
  </div>
  `
}).mount('#async')
```

## When not to use Methods

When it comes to display or formatting related logic, you should use [computed properties](/tutorials/vue/computed).
Methods should only be used for event handlers and formatting in a `v-for` that is dependent on the state of the loop.
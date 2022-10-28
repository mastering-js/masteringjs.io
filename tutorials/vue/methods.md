Methods in Vue are defined in the `methods` object.


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
      getValue() {
        return this.value
      }
    },
    template: `
    <div>
      <div>A function that returns the value of 'value'</div>
      <div>{{getValue()}}</div>
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
      getValue() {
        return this.value
      }
    },
    template: `
    <div>
      <div>A function that returns the value of 'value'</div>
      <div>{{getValue()}}</div>
    </div>
    `
  }).mount('#app')
```

## Methods are reactive

If a variable referenced in a method is changed, the method will trigger using the new value(s).

<div id="example"></div>

<script>
   createApp({
    data() {
      return {
        value: 0
      }
    },
    methods: {
      getValue() {
        return this.value
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
      <div>A function that returns the value of 'value'</div>
      <div>{{getValue()}}</div>
    </div>
    `
  }).mount('#example')
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
      getValue() {
        return this.value
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
      <div>A function that returns the value of 'value'</div>
      <div>{{getValue()}}</div>
    </div>
    `
  }).mount('#example')
```

## Methods can be async

Simply add the `async` keyword in front of your function name to make it async.

<div id="async"></div>

<script>
   createApp({
    data() {
      return {
        response: ''
      }
    },
    methods: {
      async makeRequest() {
        const res = await fetch('https://httpbin.org/get').then((res) => {return res.json()});
        this.response = res;
      }
    },
    template: `
    <div>
      <div>Make an async request</div>
      <div>The result: {{response}} </div>
      <div>
        <button @click="makeRequest">Click Me</button>
      </div>
    </div>
    `
  }).mount('#async')
</script>

```javascript
  const { createApp } = Vue

   createApp({
    data() {
      return {
        response: ''
      }
    },
    methods: {
      async makeRequest() {
        const res = await fetch('https://httpbin.org/get').then((res) => {return res.json()});
        this.response = res;
      }
    },
    template: `
    <div>
      <div>Make an async request</div>
      <div>The result: {{response}} </div>
      <div>
        <button @click="makeRequest">Click Me</button>
      </div>
    </div>
    `
  }).mount('#async')
```

## When not to use Methods

When it comes to display or formatting related logic, you should use computed properties.
Methods should only be used for event handlers and formatting in a `v-for` that is dependent on the state of the loop.
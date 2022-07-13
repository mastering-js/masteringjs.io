To conditionally render something in Vue, you should use [`v-if`](/tutorials/vue/v-if.html) and `v-else` directives.
Simply pass an expression to the `v-if` directive, and the block will render if the expression is true.
You can also use `v-else`, which will render if the preceeding `v-if` expression evaluates to a falsy value.
Below is a live example and the necessary code to replicate it:

```javascript
const app = Vue.createApp({
  data: () => ({ display: true }),
  methods: {
    toggleText() {
      this.display = !this.display;
    }
  },
  template: `
  <div>
    <h1 v-if="display">Hello!</h1>
    <h1 v-else>Goodbye :(</h1>
    <button @click="toggleText()">Toggle</button>
  </div>
  `
}).mount('#content');
```

<div id="content" style="border: 1px solid #ddd; padding: 1em"></div>

<script src="https://unpkg.com/vue@3.x"></script>
<script>
  const app = Vue.createApp({
    data: () => ({ display: true }),
    methods: {
      toggleText() {
        this.display = !this.display;
      }
    },
    template: `
    <div>
      <h1 v-if="display">Hello!</h1>
      <h1 v-else>Goodbye :( </h1>
      <button @click="toggleText()">Toggle</button>
    </div>
    `
  }).mount('#content');
</script>

An element with a `v-else` directive must immediately follow an element with a `v-if` or `v-else-if` directive.
Otherwise, the `v-else` element will always render, and Vue will log the below warning to the console:

```
vue@3.x:1616 [Vue warn]: Template compilation error: v-else/v-else-if has no adjacent v-if or v-else-if.
3  |        <h1 v-if="display">Hello</h1>
4  |        <h1>World</h1>
5  |        <h1 v-else>Goodbye</h1>
   |        ^^^^^^^^^^^^^^^^^^^^^^^
6  |        <button @click="toggleText()">Toggle</button>
7  |      </div> 
  at <App>
```

Below is a live example of a `v-else` without an adjacent `v-if`.
Notice that the "Goodbye" `h1` renders regardless of the `display` value.

<div id="content2" style="border: 1px solid #ddd; padding: 1em"></div>

<script src="https://unpkg.com/vue@3.x"></script>
<script>
  const app2 = Vue.createApp({
    data: () => ({ display: true }),
    methods: {
      toggleText() {
        this.display = !this.display;
      }
    },
    template: `
    <div>
      <h1 v-if="display">Hello</h1>
      <h1>World</h1>
      <h1 v-else>Goodbye</h1>
      <button @click="toggleText()">Toggle</button>
    </div>
    `
  }).mount('#content2');
</script>

```javascript
const app2 = Vue.createApp({
  data: () => ({ display: true }),
  methods: {
    toggleText() {
      this.display = !this.display;
    }
  },
  // BAD: the below template has a `v-else` that isn't adjacent to a `v-if`
  template: `
  <div>
    <h1 v-if="display">Hello</h1>
    <h1>World</h1>
    <h1 v-else>Goodbye</h1>
    <button @click="toggleText()">Toggle</button>
  </div>
  `
}).mount('#content2');
```
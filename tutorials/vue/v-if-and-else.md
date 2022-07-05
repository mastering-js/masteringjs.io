To conditionally render something in Vue, you should use [`v-if`](/tutorials/vue/v-if.html) and `v-else` directive.
Simply pass an expression to the `v-if` directive, and the block will render if the expression is true.
You can also use `v-else`, which will render if the `v-if` expression evaluates to a falsy value.
`v-else` must come after a `v-if` or it will not be recognized.
Below is a live example and the necessary code to replicate it:

```html
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
      <button v-on:click="toggleText()">Toggle</button>
    </div>
    `
  }).mount('#content');
</script>
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
      <button v-on:click="toggleText()">Toggle</button>
    </div>
    `
  }).mount('#content');
</script>
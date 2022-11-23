To conditionally display content on your Vue applications, you can use the `v-show` directive.
The `v-show` directive toggles the `display` css property of the element.

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
    <h1 v-show="display">Hello!</h1>
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
    <h1 v-show="display">Hello!</h1>
    <button @click="toggleText()">Toggle</button>
  </div>
  `
}).mount('#content');
</script>


## Using `v-bind:class`

The `v-show` directive works well for most cases.
But if you want more fine-grained control over the CSS of how the element is hidden, like hiding the element using `height: 0px;` or `opacity: 0;`, you can use `v-bind:class` to conditionally add a class to your element.

```css
.hide {
  display: none;
}
```

```javascript
const example = Vue.createApp({
  data: () => ({ hide: true }),
  methods: {
    toggleText() {
      this.hide = !this.hide;
    }
  },
  template: `
  <div>
    <h1 v-bind:class="{hide:hide}">Hello!</h1>
    <button @click="toggleText()">Toggle</button>
  </div>
  `
}).mount('#example');
```

<div id="example" style="border: 1px solid #ddd; padding: 1em"></div>
<style>
.hide {
  display: none;
}

</style>
<script>
const example = Vue.createApp({
  data: () => ({ hide: true }),
  methods: {
    toggleText() {
      this.hide = !this.hide;
    }
  },
  template: `
  <div>
    <h1 v-bind:class="{hide:hide}">Hello!</h1>
    <button @click="toggleText()">Toggle</button>
  </div>
  `
}).mount('#example');
</script>

## Using `v-if`

The `v-if` directive is similar to `v-show`.
The major difference is that `v-if` unmounts the element from the DOM, while `v-show` simply hides it.

```javascript
const example1 = Vue.createApp({
  data: () => ({ display: true }),
  methods: {
    toggleText() {
      this.display = !this.display;
    }
  },
  template: `
  <div>
    <h1 v-if="display">Hello!</h1>
    <button @click="toggleText()">Toggle</button>
  </div>
  `
}).mount('#example1');
```

<div id="example1" style="border: 1px solid #ddd; padding: 1em"></div>

<script>
  const example1 = Vue.createApp({
  data: () => ({ display: true }),
  methods: {
    toggleText() {
      this.display = !this.display;
    }
  },
  template: `
  <div>
    <h1 v-if="display">Hello!</h1>
    <button @click="toggleText()">Toggle</button>
  </div>
  `
}).mount('#example1');
</script>

Keep in mind that `v-if` will fire the [Vue mounted hooks](/tutorials/vue/mounted) of any component underneath the `v-if` when the `v-if` expression changes from `false` to `true`.

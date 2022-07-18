Vue provides a `v-else-if` directive that you can use with `v-if` analogous to using `else if {}` with `if {}`.

```javascript
const app = Vue.createApp({
  data: () => ({ value: 1 }),
  template: `
  <div>
    <div>
      <h1 v-if="value > 0">Hello</h1>
      <h1 v-else-if="value > 1">There</h1>
      <h1 v-else-if="value > 2">World</h1>
    </div>
    <button @click="value++">Increment</button>
  </div>
  `
}).mount('#content');
```


<div id="content" style="border: 1px solid #ddd; padding: 1em"></div>

<script src="https://unpkg.com/vue@3.x"></script>
<script>
   const app = Vue.createApp({
    data: () => ({ value: 1 }),
    template: `
    <div>
      <div>
        <h1 v-if="value > 0">Hello</h1>
        <h1 v-else-if="value > 1">There</h1>
        <h1 v-else-if="value > 2">World</h1>
      </div>
      <button @click="value++">Increment</button>
    </div>
    `
  }).mount('#content');
</script>

`v-else-if` must follow a `v-if`.
If you use `v-else-if` without `v-if`, Vue will print the following warning to the console.

```
[Vue warn]: Template compilation error: v-else/v-else-if has no adjacent v-if or v-else-if.
```

Below is an example of using `v-else-if` without `v-if`.
If you open the console on this page, you'll see a "Template compilation error" warning from Vue.

```javascript
const example = Vue.createApp({
  data: () => ({ value: 2 }),
  // BAD: this template uses v-else-if without an adjacent v-if
  template: `
  <div>
    <div>
      <h1 v-else-if="value > 1">There</h1>
      <h1 v-else-if="value > 2">World</h1>
      <h1 v-else-if="value > 3">Hello</h1>
    </div>
    <button @click="value++">Increment</button>
  </div>
  `
}).mount('#example');
```

<div id="example" style="border: 1px solid #ddd; padding: 1em"></div>

<script src="https://unpkg.com/vue@3.x"></script>
<script>
  const example = Vue.createApp({
    data: () => ({ value: 2 }),
    template: `
    <div>
      <div>
        <h1 v-else-if="value > 1">There</h1>
        <h1 v-else-if="value > 2">World</h1>
        <h1 v-else-if="value > 3">Hello</h1>
      </div>
      <button @click="value++">Increment</button>
    </div>
    `
  }).mount('#example');
</script>



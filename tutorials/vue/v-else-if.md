The `v-else-if` is another directive provided by Vue.
It must follow a `v-if` or it will not be recognized.
`v-if` and `v-else-if` are essentially the same given the right circumstances.
For example, if you were to check if the value of a variable is equal to a number, `v-if` and `v-else-if` would function the same.
The only statement that would execute would be the one where the variable equals the desired number.
However, if you were to check different variables for different values, they would no longer function the same.
The first `v-if` statement that is correct would execute and the following `v-else-if` statements would be ignored.
If you used multiple `v-if` statements, they would all be checked.

```html
<div id="content" style="border: 1px solid #ddd; padding: 1em"></div>

<script src="https://unpkg.com/vue@3.x"></script>
<script>
  const app = Vue.createApp({
    data: () => ({ message: 'Hello', value: 2 }),
    template: `
    </div>
    <div>
      <h1 v-if="message == 'Hello'">Hello</h1>
      <h1 v-if="value == 2">World</h1>
      <h1 v-if="value == 3">There</h1>
    </div>
    <div>
      <h1 v-if="message == 'Hello'">Hello</h1>
      <h1 v-else-if="value == 2">World</h1>
      <h1 v-else-if="value == 3">There</h1>
    </div>
    </div>
    `
  }).mount('#content');
</script>
```


<div id="content" style="border: 1px solid #ddd; padding: 1em"></div>

<script src="https://unpkg.com/vue@3.x"></script>
<script>
  const app = Vue.createApp({
    data: () => ({ message: 'Hello', value: 2 }),
    template: `
    </div>
    <div>
      <h1 v-if="message == 'Hello'">Hello</h1>
      <h1 v-if="value == 2">World</h1>
      <h1 v-if="value == 3">There</h1>
    </div>
    <div>
      <h1 v-if="message == 'Hello'">Hello</h1>
      <h1 v-else-if="value == 2">World</h1>
      <h1 v-else-if="value == 3">There</h1>
    </div>
    </div>
    `
  }).mount('#content');
</script>
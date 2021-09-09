With Vue, you can tie button clicks to functions you want to execute. The formal
way to do this is to use the `v-on:click` attribute, however, Vue has a neat shortcut, `@click`.


```javascript
const app = new Vue({
  data: () => ({counter: 0}),
  template: `
    <div style="border-style:solid">
      <div>Number of button clicks: {{counter}}</div>
      <button @click="incrementCounter">Click Me!</button>
    </div>
  `,
  methods: {
    incrementCounter() {
      this.counter++;
    }
  }
});
app.$mount("#content");
```

Vue's `@click` also supports [modifiers](https://vuejs.org/v2/guide/events.html#Event-Modifiers). For example, If you only want a button to be clicked once, instead of creating a boolean variable, you can append `.once` to the `v-on:click` or `@click`.

```javascript
const app = new Vue({
  data: () => ({counter: 0}),
  template: `
    <div style="border-style:solid">
      <div>Number of button clicks: {{counter}}</div>
      <button @click.once="incrementCounter">Click Me!</button>
    </div>
  `,
  methods: {
    // Will only be called at most once, even if you try to click the button multiple times.
    incrementCounter() {
      this.counter++;
    }
  }
});
app.$mount("#content");
```

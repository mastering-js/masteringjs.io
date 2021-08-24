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

**Note:** If you only want a button to be clicked once, instead of creating a boolean variable, you can append `.once` to the `v-on:click` or `@click`.

<div id = "content"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script>
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
</script>

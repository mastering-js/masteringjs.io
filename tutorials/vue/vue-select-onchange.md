If you want to avoid having to use `v-model` with your `<select>` tags,
you can use Vue's `v-on:change` directive, or just the shorthand `@change`.

In every `option` tag, you must set the `value` property to define the value of each option.
Vue event handlers have a special `$event` property that describes the event, and `$event.target.value`
contains the value of the newly selected option.
From there, `@change` can handle the rest. Below is a live example:

<div id = "content"></div>
<script src="https://unpkg.com/vue@next"></script>
<script>
Vue.createApp({
  data: () => ({ selected: '' }),
  methods: {
    switchSelect(event) {
      this.selected = event.target.value;
   }
  },
  template: `
    <div>
        <p>Your choice is: {{selected}}</p>
        <select @change="switchSelect($event)">
          <option value = "">Choose</option>
          <option value = "A">A</option>
          <option value = "B">B</option>
          <option value = "C">C</option>
        </select>
    </div>
  `
}).mount('#content');
</script>

Below is the code:

```javascript
Vue.createApp({
  data: () => ({ selected: '' }),
  methods: {
    switchSelect(event) {
      this.selected = event.target.value;
    }
  },
  template: `
    <div>
      <p>Your choice is: {{selected}}</p>
      <select @change="switchSelect($event)">
        <option value="">Choose</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
    </div>
  `
});
```

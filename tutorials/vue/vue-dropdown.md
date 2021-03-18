Vue mostly works nicely with [Bootstrap's dropdowns](https://getbootstrap.com/docs/4.0/components/dropdowns/) using similar syntax to the [`<select>` tag](/tutorials/vue/select) in HTML.

Below is an example of using a Bootstrap dropdown to choose between 'A', 'B', and 'C'. Note that Bootstrap dropdowns do **not** work with [Vue's `v-model` directive](/tutorials/vue/v-model), you need to explicitly [register a `@click` event handler](/tutorials/vue/click) as shown below.

```javascript
Vue.createApp({
  template: `
  <div class="dropdown">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button" id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false">
      Dropdown button: {{value}}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
      <li v-for="option in options" :key="option">
        <a class="dropdown-item" @click="value = option" href="javascript:void(0)">{{option}}</a>
      </li>
    </ul>
  </div>
  `,
  data: () => ({
    options: ['A', 'B', 'C'],
    value: 'B'
  })
});
```

Below is a live example in an `iframe`:

<iframe src="/examples/vue/bootstrap-dropdown" style="height:200px"></iframe>

Note that the `role="menu"` and `href="javascript:void(0)"` properties are [important to enable keyboard shortcuts](https://stackoverflow.com/questions/15720107/how-to-make-bootstrap-button-dropdown-menu-selectable-by-keyboard) on the dropdown, like being able to hit the "up" and "down" keys in order to select an option without using the mouse. Learn more about the [void operator in JavaScript here](/tutorials/fundamentals/void).

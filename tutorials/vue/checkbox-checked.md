Controlling a checkbox in Vue is easy: just use [Vue's `v-model`](/tutorials/vue/v-model) directive.
Vue's `v-model` will tie the checkbox to a boolean value.
If the variable in `v-model` changes to `true`, Vue will check the checkbox.
And, if the checkbox is checked or unchecked, Vue will update the `v-model` variable to match whether the checkbox is checked.
Below is an example of a checkbox with Vue.

```javascript
const app = new Vue({
  data: () => ({ value: false }),
  template: `
    <div>
      <h1>Checked state: {{value}}</h1>
      <div>
        <input type="checkbox" v-model="value"></input>
      </div>
    </div>
  `
});
```

Below is a live example of the above code.

<script src="https://unpkg.com/vue@3"></script>

<div id="app" style="padding: 1em; border: 1px dashed #ddd"></div>

<style>
  input[type="checkbox"] {
    height: 1.25em;
    width: 1.25em;
  }
</style>
<script>
  const { createApp } = Vue

  createApp({
    data: () => ({ value: false }),
    template: `
      <div>
        <h1>Checked state: {{value}}</h1>
        <div>
          <input type="checkbox" v-model="value"></input>
        </div>
      </div>
    `
  }).mount('#app')
</script>

More Sophisticated Integration
------------------------------

Sometimes `v-model` is not sufficiently flexible.
For example, suppose you want to tie a checkbox to whether a particular value is in an array.
`v-model` can't update computed properties like that, but you can tie a checkbox to a computed value using a combination of `:checked` and `@input` as follows.

```javascript
const app = new Vue({
  data: () => ({ arr: ['cats', 'dogs'] }),
  template: `
    <div>
      <h1>Pets I like: {{value}}</h1>
      <div>
        <input
          type="checkbox"
          :value="arr.includes('cats')"
          id="cats"
          @input="updateArr('cats', $event.target.checked)">
        <label for="cats">Cats</label>
      </div>
      <div>
        <input
          type="checkbox"
          :value="arr.includes('dogs')"
          id="dogs"
          @input="updateArr('dogs', $event.target.checked)">
        <label for="dogs">Dogs</label>
      </div>
    </div>
  `,
  methods: {
    updateArr(element, includeElement) {
      if (includeElement && !this.arr.includes(element)) {
        this.arr.push(element);
      } else {
        this.arr = this.arr.filter(el => el !== element);
      }
    }
  }
});
```

Below is a live example.

<div id="app2" style="padding: 1em; border: 1px dashed #ddd"></div>

<style>
  input[type="checkbox"] {
    height: 1.25em;
    width: 1.25em;
  }
</style>
<script>
  createApp({
    data: () => ({ arr: ['cats', 'dogs'] }),
    template: `
      <div>
        <h1>Pets I like: {{arr}}</h1>
        <div>
          <input
            type="checkbox"
            :checked="arr.includes('cats')"
            id="cats"
            @input="updateArr('cats', $event.target.checked)">
          <label for="cats">Cats</label>
        </div>
        <div>
          <input
            type="checkbox"
            :checked="arr.includes('dogs')"
            id="dogs"
            @input="updateArr('dogs', $event.target.checked)">
          <label for="dogs">Dogs</label>
        </div>
      </div>
    `,
    methods: {
      updateArr(element, includeElement) {
        if (includeElement && !this.arr.includes(element)) {
          this.arr.push(element);
        } else {
          this.arr = this.arr.filter(el => el !== element);
        }
      }
    }
  }).mount('#app2')
</script>

<div style="height: 1.5em"></div>
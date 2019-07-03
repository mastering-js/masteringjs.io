[Two way data binding](https://stackoverflow.com/questions/13504906/what-is-two-way-binding) is a powerful pattern for building forms in JavaScript. For example,
suppose you have an `input` element and a JavaScript variable `value`.
Two way data binding means:

1. When the user types in the `input`, `value` gets updated to match the value in `input`.
2. When you update `value`, the `input` element's content updates to match `value`.

Vue supports two way data binding via the [`v-model`](https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components) property. In the below example, if you type in the input, Vue will display your changes in the `h1` element. Also, if you update `value` by clicking the "Reset" button, Vue will display the new `value` in the `input` and `h1` elements.

```javascript
const app = new Vue({
  data: () => ({ value: 'Hello, World' }),
  template: `
    <div id="rendered-content">
      <h1>{{value}}</h1>
      <div>
        <input v-model="value"></input>
      </div>
      <button v-on:click="value = 'Hello, World'">
        Reset
      </button>
    </div>
  `
});
```

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/c94584d5fd6c40d1a9410f6af74b39bb" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

[Here's a live example](/examples/vue/v-model).

With Checkboxes and Dropdowns
-----------------------------

The `v-model` property works seamlessly with other native inputs. If
you have an input of type 'checkbox', `v-model` will store a boolean:

```javascript
const app = new Vue({
  data: () => ({ value: false }),
  template: `
    <div id="rendered-content">
      <h1>{{value}}</h1>
      <div>
        <input type="checkbox" v-model="value"></input>
      </div>
      <button v-on:click="value = false">
        Reset
      </button>
    </div>
  `
});
```

[Here's a live example of using `v-model` with checkboxes](/examples/vue/v-model-checkbox).

If you attach `v-model` to a `select` element, Vue will bind to the
selected option's `value`.

```javascript
const app = new Vue({
  data: () => ({ value: 'B' }),
  template: `
    <div id="rendered-content">
      <h1>{{value}}</h1>
      <div>
        <select v-model="value">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>
      <button v-on:click="value = 'B'">
        Reset
      </button>
    </div>
  `
});
```

Custom Inputs
-------------

Under the hood, `v-model` builds on 2 other Vue properties:

1. [`v-bind`](https://vuejs.org/v2/guide/class-and-style.html) to bind the input to the JavaScript value.
2. [`v-on`](https://vuejs.org/v2/guide/events.html) to listen for 'input' events.

You can use `v-model` with a [custom Vue component](/tutorials/vue/components) by accepting a prop named 'value' and emitting an event named 'input'. For example, the below custom component is a fake select using `div` elements. Clicking on a `div` selects it.

```javascript
Vue.component('my-select', {
  // `v-model` passes the 'value' as a prop...
  props: ['value'],
  methods: {
    set: function(v) {
      // And listens to the 'input' event for changes
      this.$emit('input', v);
    }
  },
  template: `
    <div>
      <div v-for="v in ['A', 'B', 'C']" v-on:click="set(v)">
        {{v}}
        <span v-if="v === value">[x]</span>
      </div>
    </div>
  `
});

const app = new Vue({
  data: () => ({ value: 'B' }),
  template: `
    <div id="rendered-content">
      <h1>{{value}}</h1>
      <div>
        <my-select v-model="value"></my-select>
      </div>
      <button v-on:click="value = 'B'">
        Reset
      </button>
    </div>
  `
});
```

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/592315027467418985b32dfda80ccd66" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

[Here's a live example](/examples/vue/v-model-fake)
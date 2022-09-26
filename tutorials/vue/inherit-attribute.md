By default, attributes on the component "fall through" to the rendered element.
In the following example, the top-level `<div>` in the `MyComponent` template will inherit the `class="style-div"` attribute.

```javascript
// MyComponent.js
Vue.component('MyComponent', {
  template: `<div>Hello World</div>`
});

// index.js
<MyComponent class="style-div" />
```

In other words, the rendered element would look like the following.

```html
<div class="style-div">Hello World</div>
```

## `inheritAttrs`

Setting `inheritAttrs` to `false` prevents this fall through behavior.
In the following example, the `<div>` in `MyComponent` will **not** inherit the `class` attribute, or any other attribute.

```javascript
Vue.component('MyComponent', {
  inheritAttrs: false,
  template: `<div>Hello World</div>`
});
```

The rendered element would look like the following.

```html
<div class="style-div">Hello World</div>
```

We find `inheritAttrs` is useful in cases where you want to define an internal event handler that fires the user-specified event handler.
For example, we use `inheritAttrs` for our `async-button` component, which executes an async function when the button is clicked and disables the button for the duration of the async function.
The `async-button` component needs to execute some logic to disable itself, in addition to executing the user-specified `@click` handler.

```javascript
app.component('async-button', {
  data: () => ({
    status: 'init'
  }),
  inheritAttrs: false,
  methods: {
    // When the user clicks the button, we actually call
    // the `handleClick()` method first...
    async handleClick(ev) {
      if (this.status === 'in_progress') {
        return;
      }
      this.status = 'in_progress';
      try {
        // and the `handleClick()` method calls the user-specified
        // `@click` handler. `this.$attrs` refers to the attributes
        // specified on `<async-button>` in HTML.
        await this.$attrs.onClick(ev);
      } catch (err) {
        this.status = 'error';
        throw err;
      }
      this.status = 'success';
    }
  },
  computed: {
    // Use "selective binding". Bind all attributes _except_
    // `onClick` and `disabled`, because `async-button` wraps
    // those attributes. Styles and class names still fall through.
    attrsToBind() {
      const attrs = { ...this.$attrs };
      delete attrs.onClick;
      delete attrs.disabled;
      return attrs;
    },
    isDisabled() {
      return this.status === 'in_progress' || this.$attrs.disabled;
    }
  },
  template: template
});
```

Below is the HTML for the `async-button` component.
Note that `v-bind` binds any additional attributes, other than
`disabled` and `onClick`.

```html
<button v-bind="attrsToBind" :disabled="isDisabled" @click="handleClick">
  <slot></slot>
</button>
```
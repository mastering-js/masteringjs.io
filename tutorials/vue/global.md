You can't access variables on the `window` object from Vue 3 templates.
However, you can set the `config.globalProperties` property on your Vue app to register global variables and methods that _any_ template can access.

```javascript
const app = Vue.createApp();

// Now any template can access `answer` and `capitalizeFirstLetter()`
app.config.globalProperties = {
  answer: 42,
  capitalizeFirstLetter(str) {
    if (!str) {
      return '';
    }
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }
};
```

With this code, you can do `{{answer}}` anywhere in a component's `template` property and 42 will render.
You can also use `{{capitalizeFirstLetter(name)}}` to capitalize the first letter of the `name` property in any template.

If a component has a naming conflict with `config.globalProperties`, the component has the priority.
For example, if you have a component with an `answer` data property, like `data: () => ({ answer: 99 })`, `{{answer}}` will render `99`, **not** the global value `42`.

## When to Use Global Properties

We make heavy use of global properties for well-defined formatting logic, like the previous `capitalizeFirstLetter()` example.
There are many similar cases when you want to format a string or a date in the same way across multiple components, and defining a global property saves you from having to manually define the same [method](https://v1.vuejs.org/guide/events.html) on multiple components.

We only recommend using global properties for methods, **not** objects or values.
Global properties aren't tied into [Vue reactivity](/tutorials/vue/reactivity), so updating `answer` won't update `answer` automatically everywhere Vue renders `answer`.
We don't recommend accessing config values, like API keys, in Vue templates, so there is no need to put API keys in `config.globalProperties`.
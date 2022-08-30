To set global properties on your Vue 3 application, you must use the `config.globalProperties` attribute.

```javascript
const app = Vue.createApp();

app.config.globalProperties = {
    answer: 42,
    capitalizeFirstLetter(str) {
      if (!str) {
        return '';
      }
      return str.slice(0, 1).toUpperCase() + str.slice(1);
    }
}
```

With this code, you can do `{{answer}}` anywhere in a component's `template` property and 42 will render.
You can also call `capitalizeFirstLetter` in this property by doing `this.capitalizeFirstLetter(arg)` in the JavaScript file and get a capitalized string back.
This is helpful for situations where you have a helper function that all components will need access.
If a component has a naming conflict with `config.globalProperties`, the component has the priority so make sure to keep names and variable unique.
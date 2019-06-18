In Vue, [watchers](https://vuejs.org/v2/guide/computed.html#Watchers) let you watch a value by registering a callback that Vue will call whenever the value changes.

For example, suppose you had a [`select` tag](https://vuejs.org/v2/guide/forms.html#Select) that asked the user to select between options 'A', 'B', and 'C', and you wanted to implement an "Undo" button that would undo the last change the user made. You can do this by registering a watcher on the `value` that the select is bound to using `v-model`.

```javascript
const app = new Vue({
  data: () => ({ value: 'A', oldValue: 'A' }),
  // The `watch` property is a map from watched properties to callbacks
  watch: {
    value: function(newValue, oldValue) {
      console.log('Name changed from', oldValue, 'to', newValue);
      this.oldValue = oldValue;
    }
  },
  template: `
    <div id="rendered-content">
      <select v-model="value">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <button v-on:click="value = oldValue">Undo</button>
    </div>
  `
});
```

[Here's the undo button example in action](/examples/vue/watch-basic).

One common use case for watchers is to persist changes to the server when a value changes. For example, suppose you wanted to send an HTTP request every time the user changes `value`. You could register a watcher on `value`, and send an HTTP request in the `watch` callback as shown below.

```javascript
const app = new Vue({
  data: () => ({ value: 'A', saved: false }),
  watch: {
    value: function() {
      const body = JSON.stringify(this.data);
      fetch('http://httpbin.org/post', { method: 'POST', body }).
        then(() => { this.saved = true; });
    }
  },
  template: `
    <div id="rendered-content">
      <select v-model="value">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <div v-if="saved" id="saved">Saved!</div>
    </div>
  `
});
```

[Here's a live example of the HTTP request watcher](/examples/vue/watch-basic).
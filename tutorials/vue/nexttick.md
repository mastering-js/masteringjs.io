The `nextTick()` function allows you to execute code after you have changed some data and Vue has updated the page to reflect your changes.
Pass a [callback](/tutorials/fundamentals/callbacks) to `nextTick()` and Vue will execute the callback immediately after updating the DOM.

```javascript
const app = new Vue({
  data: () => ({ text: 'First' }),
  template: `<h1>{{text}}</h1>`,
  mounted: function() {
    this.text = 'Second';

    // Prints 'First', because Vue hasn't updated the DOM yet
    console.log(this.$el.textContent);

    this.$nextTick(() => {
      // Prints 'Second', because Vue has updated the DOM
      console.log(this.$el.textContent);
    });
  }
});
```

Alternatively, you can use `Vue.nextTick()`, which is the same thing as `this.$nextTick()`.

```javascript
const app = new Vue({
  data: () => ({ text: 'First' }),
  template: `<h1>{{text}}</h1>`,
  mounted: function() {
    this.text = 'Second';

    // Prints 'First', because Vue hasn't updated the DOM yet
    console.log(this.$el.textContent);

    Vue.nextTick(() => {
      // Prints 'Second', because Vue has updated the DOM
      console.log(this.$el.textContent);
    });
  }
});
```

### With Promises

One neat advantage of Vue's `nextTick()` over the browser's `setTimeout()` function is that `nextTick()` returns a promise, so you can `await` on it.

```javascript
const app = new Vue({
  data: () => ({ text: 'First' }),
  template: `<h1>{{text}}</h1>`,
  mounted: async function() {
    this.text = 'Second';

    // Prints 'First', because Vue hasn't updated the DOM yet
    console.log(this.$el.textContent);

    await Vue.nextTick();
    // Prints 'Second', because Vue has updated the DOM
    console.log(this.$el.textContent);
  }
});
```
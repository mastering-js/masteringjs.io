You can handle scrolling in Vue with [custom directives](https://vuejs.org/v2/cookbook/creating-custom-scroll-directives.html).
Below is a live example of a Vue instance that prints the current value of `window.scrollY`.
Scroll down and the value below should increment.

<div id="app">
  <h1>Scroll and Watch</h1>
  <div v-scroll="handleScroll">
    <p>The value of <code>window.scrollY</code>: {{ value }}!</p>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script> 
Vue.directive('scroll', {
  inserted: function (el, binding) {
    const onScrollCallback = binding.value; 
    window.addEventListener('scroll', () => onScrollCallback());
  }
});
// main app
new Vue({
  el: '#app',
  data: {
    value: 0
  },
  methods: {
    handleScroll: function() {
      this.value = window.scrollY;
    }
  }
});
</script>

Below is the JavaScript code.
Calling `Vue.directive('scroll')` registers a `v-scroll` directive that you can use in your HTML templates.
And `binding.value` contains the computed value of the `v-scroll` attribute.
In the below case, `binding.value` points to the `handleScroll()` method.

```javascript
Vue.directive('scroll', {
  inserted: function (el, binding) {
    const onScrollCallback = binding.value; 
    window.addEventListener('scroll', () => onScrollCallback());
  }
});
// main app
new Vue({
  el: '#app',
  data: {
    value: 0
  },
  methods: {
    handleScroll: function() {
      this.value = window.scrollY;
    }
  }
});
```

Below is the HTML template. Note that `v-scroll` needs to be a function.

```html
<div id="app">
  <h1>Scroll and Watch</h1>
  <div v-scroll="handleScroll">
    <p>The value of <code>window.scrollY</code>: {{ value }}!</p>
  </div>
</div>
```

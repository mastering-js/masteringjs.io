To create a custom scroll event in Vue, you must create a Custom Directive.
Directives must be registered before the Vue instance. If you wish to only
use a directive locally, components accept a `directives` option.
The interesting thing about the `addEventListener` and `removeEventListener`
is that they both must use the same function. Also, they must have two arguments,
so you can write a function that never executes and use that for the second argument
as shown below:

<div id="app">
  <h1>Scroll and Watch</h1>
  <div
    v-scroll="handleScroll"
  >
    <p>The value of the Y axis: {{ value }}!</p>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script> 
Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})
// main app
new Vue({
  el: '#app',
  data: {
    value: 0
  },
  methods: {
    handleScroll: function (evt, el) {
      this.value = window.scrollY
    }
  }
})
</script>

```html
<div id="app">
  <h1>Scroll and Watch</h1>
  <div
    v-scroll="handleScroll"
  >
    <p>The value of the Y axis: {{ value }}!</p>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script> 
Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})
// main app
new Vue({
  el: '#app',
  data: {
    value: 0
  },
  methods: {
    handleScroll: function (evt, el) {
      this.value = window.scrollY
    }
  }
})
</script>
```

To create a custom scroll event in Vue, you must create a Custom Directive.
Directives must be registered before the Vue instance. If you wish to only
use a directive locally, components accept a `directives` option.

<div id="app">
  <h1>Scroll and Watch</h1>
  <div
    v-scroll="handleScroll"
    style="transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1); opacity: 0;"
  >
    <p>Surprise!</p>
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
  methods: {
    handleScroll: function (evt, el) {
      if (window.scrollY > 50) {
        el.setAttribute(
          'style',
          'opacity: 1; transform: translate3d(0, -10px, 0)'
        )
      }
      return window.scrollY > 100
    }
  },
  mounted: function() {
      window.scrollTo(0,0)
  }
})
</script>

```html
<div id="app">
  <h1>Scroll and Watch</h1>
  <div
    v-scroll="handleScroll"
    style="transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1); opacity: 0;"
  >
    <p>Surprise!</p>
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
});
new Vue({
  el: '#app',
  methods: {
    handleScroll: function (evt, el) {
      if (window.scrollY > 50) {
        el.setAttribute(
          'style',
          'opacity: 1; transform: translate3d(0, -10px, 0)'
        )
      }
      return window.scrollY > 100
    }
  }
});
</script>
```

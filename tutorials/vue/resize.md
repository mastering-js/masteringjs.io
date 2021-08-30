To create a resize event, you have a couple options.

## Add an Event Listener

This is the simpler approach of the two. You must utilize the
`created()` and `destroyed()` lifecycle hooks to invoke the `addEventListener()`
and `removeEventListener()` functions respectively.

```javascript
const app = new Vue({
    data: function() {
        return {
            width: 0,
            height: 0
        }
    },
    created() {
        window.addEventListener('resize', this.getDimensions);
    },
    destroyed() {
        window.removeEventListener('resize', this.getDimensions);
    },
    methods: {
        getDimensions() {
            this.width = document.documentElement.clientWidth;
            this.height = document.documentElement.clientHeight;
        }
    }
})
```

The downside is that is would only be local to the component you are using it in. If you need something
that is universally accessible then the next option is for you.

## Create a Vue Directive

Similar to [creating a custom scroll event](/tutorials/vue/scroll), you can create a directive for window resizing.

```javascript
Vue.directive('resize', {
    inserted: function(el, binding) {
        const onResizeCallback = binding.value
        window.addEventListener('resize', () => onResizeCallback());
    }
});

const app = new Vue({
    data: {
        width: 0,
        height: 0
    },
    methods: {
        getDimensions: function() {
            this.width = document.documentElement.clientWidth;
            this.height = document.documentElement.clientHeight;
        }
    }
});
```

Here is a live demonstration using both methods along with the HTML template:

```html
<div id="app">
  <div v-resize="getDimensions">
    <p>the width and height are respectively {{width}}, {{height}} </p>
  </div>
</div>
```

<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<div id="app">
<div v-resize="getDimensions">
<p>the width and height are respectively {{width}}, {{height}} </p>
</div>
</div>
<script>
Vue.directive('resize', {
    inserted: function(el, binding) {
        const onResizeCallback = binding.value
        window.addEventListener('resize', () => onResizeCallback());
    }
});
new Vue({
    el: '#app',
    data: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    },
    methods: {
        getDimensions: function() {
            this.width = document.documentElement.clientWidth;
            this.height = document.documentElement.clientHeight;
        }
    }
});
</script>

```html
<div id="app2">
  <p>The width and height are respectively {{width}}, {{height}}</p>
</div>
```

<div id="app2">
  <p>The width and height are respectively {{width}}, {{height}}</p>
</div>
<script>
new Vue({
    el: '#app2',
    data: function() {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    },
    created() {
        window.addEventListener('resize', this.getDimensions);
    },
    destroyed() {
        window.removeEventListener('resize', this.getDimensions);
    },
    methods: {
        getDimensions() {
            this.width = document.documentElement.clientWidth;
            this.height = document.documentElement.clientHeight;
        }
    }
})
</script>
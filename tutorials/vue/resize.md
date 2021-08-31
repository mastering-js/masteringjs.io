To create a resize event, you have a couple options.

## Add an Event Listener

You should register an event listener for the window `resize` event using `addEventListener()` when
Vue mounts the component. You should also clean up the event listener when the component is unmounted.
Here is a live demonstration with the HTML template:

```javascript
const app = new Vue({
    data: function() {
        return {
            width: 0,
            height: 0
        }
    },
    mounted() {
        window.addEventListener('resize', this.getDimensions);
    },
    unmounted() {
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

```html
<div id="app2">
  <p>The width and height are respectively {{width}}, {{height}}</p>
</div>
```
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
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
    mounted() {
        window.addEventListener('resize', this.getDimensions);
    },
    unmounted() {
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

The downside is that any component that needs to listen to the `resize` event needs to register global events.
That's fine for a one-off, but can get messy if multiple components needs to listen to the `resize` event. Directives
are an alternative approach that enable multiple components to listen to the `resize` event without accessing the window.

## Create a Vue Directive

Similar to [creating a custom scroll event](/tutorials/vue/scroll), you can create a directive for window resizing.

```javascript
Vue.directive('resize', {
    inserted: function(el, binding) {
        const onResizeCallback = binding.value;
        window.addEventListener('resize', () => {
            const width = document.documentElement.clientWidth;
            const height = document.documentElement.clientHeight;
            onResizeCallback({width, height})
        });
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

Here is a live demonstration with the HTML template:

```html
<div id="app">
  <div v-resize>
    <p>the width and height are respectively {{width}}, {{height}} </p>
  </div>
</div>
```


<div id="app">
<div v-resize="getDimensions">
<p>the width and height are respectively {{width}}, {{height}} </p>
</div>
</div>
<script>
Vue.directive('resize', {
    inserted: function(el, binding) {
        const onResizeCallback = binding.value;
          window.addEventListener('resize', () => {onResizeCallback()});
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


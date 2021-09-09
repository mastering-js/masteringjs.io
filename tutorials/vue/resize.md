To handle the [window resize event](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event) in Vue, you have a couple options.

## Add an Event Listener

You can register an event listener for the window `resize` event using `addEventListener()` when Vue mounts the component.
You should also clean up the event listener when the component is unmounted.
Here is a live demonstration with the HTML template:

```javascript
const app = new Vue({
  data: () => ({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  }),
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
  <p>The window width and height are respectively {{width}}, {{height}}</p>
</div>
```

<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<div id="app2" style="padding: 4px; padding-left: 10px; border: 1px solid #ddd">
  <p>The window width and height are respectively {{width}}, {{height}}</p>
</div>
<script>
new Vue({
    el: '#app2',
    data: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
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
      onResizeCallback({ width, height });
    })
  }
});

const app = new Vue({
  data: {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  },
  methods: {
    setDimensions: function({ width, height }) {
      this.width = width;
      this.height = height;
    }
  },
  template: `
    <div id="app">
      <div v-resize="setDimensions">
        <p>the width and height are respectively {{width}}, {{height}} </p>
      </div>
    </div>
  `
});
```

Here is a live demonstration with the HTML template:

```html
<div id="app">
  <div v-resize="setDimensions">
    <p>The window width and height are respectively {{width}}, {{height}} </p>
  </div>
</div>
```


<div id="app" style="padding: 4px; padding-left: 10px; border: 1px solid #ddd">
<div v-resize="setDimensions">
<p>The window width and height are respectively {{width}}, {{height}} </p>
</div>
</div>
<script>
Vue.directive('resize', {
    inserted: function(el, binding) {
        const onResizeCallback = binding.value;
        window.addEventListener('resize', () => {
            const width = document.documentElement.clientWidth;
            const height = document.documentElement.clientHeight;
            onResizeCallback({ width, height });
        })
    }
});
const app = new Vue({
    el: '#app',
    data: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    },
    methods: {
        setDimensions: function({ width, height }) {
            this.width = width;
            this.height = height;
        }
    }
});
</script>

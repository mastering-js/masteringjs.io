You can dynamically control the image an `<img>` tag displays using the `v-bind:src`, or `:src` for short, binding.
This allows you to insert JavaScript in the attribute field.

## methods

Using `:src`, you can set the image's `src` to the result of a Vue method.

```javascript
<script>
  const { createApp } = Vue

  createApp({
    methods: {
      getPhoto() {
        return '../../assets/logo.png';
      }
    },
    template: `
    <img :src="getPhoto()" />
    `
  }).mount('#app');
</script>
```


<script src="https://unpkg.com/vue@3"></script>

<div id="app"></div>

<script>
  const { createApp } = Vue

  createApp({
    methods: {
        getPhoto() {
            return '../../assets/logo.png'
        }
    },
    template: `
    <img style="width:50%; height:50%;" :src="getPhoto()" />
    `
  }).mount('#app')
</script>


## computed

A computed property allows you to have logic that is dependent on reactive data.
In the example below, should `value` change, the logo image will no longer be displayed.

```javascript
<div id="example"></div>

<script>
  const { createApp } = Vue

  createApp({
    data: function() {
      return {
        value: 0
      }
    },
    computed: {
        photo() {
          return this.value == 0 ? '../../assets/logo.png' : 0
        }
    },
    template: `
    <img :src="photo" />
    <div>
      <button @click="value > 0 ? value-- : value++">Click</button>
    </div>
    `
  }).mount('#example');
</script>
```

<div id="example"></div>

<script>
  createApp({
    data: function() {
      return {
        value: 0
      }
    },
    computed: {
        photo() {
          return this.value == 0 ? '../../assets/logo.png' : 0
        }
    },
    template: `
    <img style="width:50%; height:50%;" :src="photo" />
    <div>
    <button @click="value > 0 ? value-- : value++">Click</button>
    </div>
    `
  }).mount('#example');
</script>
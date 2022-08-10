You can dynamically control the image source using the `v-bind:src`, or `:src` for short, binding.
This allows you to insert JavaScript in the attribute field.

## methods

```javascript
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

```javascript
<div id="example"></div>

<script>
  const { createApp } = Vue

  createApp({
    computed: {
        photo() {
            return '../../assets/logo.png'
        }
    },
    template: `
    <img style="width:50%; height:50%;" :src="photo" />
    `
  }).mount('#example');
</script>
```

<div id="example"></div>

<script>

  createApp({
    computed: {
        photo() {
            return '../../assets/logo.png'
        }
    },
    template: `
    <img style="width:50%; height:50%;" :src="photo" />
    `
  }).mount('#example');
</script>
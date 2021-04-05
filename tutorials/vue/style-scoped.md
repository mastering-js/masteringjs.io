Vue 3 has a handy way to locally scope the CSS in your components.
Using `<style scoped>`, you don't need to have a single large CSS
file or multiple CSS files to make your site look pretty. By simply
putting the CSS in the `<style scoped>` tag, the CSS will only be
reflected in that component.

## App.vue

```html
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
  import HelloWorld from "./components/HelloWorld.vue";

  export default {
    name: "App",
    components: {
      HelloWorld,
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
```

## HelloWorld.vue

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p class="text">This text is in a component with a {{ html }}</p>
  </div>
</template>

<script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        html: `<style scoped>`,
      };
    },
    props: {
      msg: String,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .text {
    color: pink;
  }
</style>
```

## Result

<img src = "../../assets/vue-style-scoped.png"/>

Make sure to include class names for your CSS as without it, performance
will be slower.

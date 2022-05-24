To display an image with the `img` tag in vue, you can use`v-bind:src` directive, or `:src`.
Or `:src` for short.
Remember that `:src` expects a [JavaScript expression](/tutorials/fundamentals/expressions), so if you want to use a string literal in `:src` you need to wrap the string in quotes.

Below is an example of using `:src` to display images two different ways: a raw string literal, or a variable in `data`.

```javascript
const app = new Vue({
  data: function() {
    return {
      link: '../../assets/logo.png'
    };
  },
  template: `
    <div>
      <div style="width: 50%">
        <img :src="'../../assets/logo.png'" />
      </div>
      <div style="width: 50%">
        <img :src="link" />
      </div>
  </div>
  `,
});
```

Below is a live example.

<div id="content"></div>
<script src="https://unpkg.com/vue@2"></script>
<script>
  const app = new Vue({
  data: function() {
    return {
      link: '../../assets/logo.png'
    };
  },
  template: `
  <div>
    <div style="width: 50%">
      <img :src="'../../assets/logo.png'" />
    </div>
    <div style="width: 50%">
      <img :src="link" />
    </div>
  </div>
  `,
});
app.$mount("#content");
</script>

## Computed src

You can also pass a [computed property](/tutorials/vue/computed) to `:src`.
Just make sure the computed property returns the 

```javascript
const example = new Vue({
  template: `
    <div style="width: 50%">
      <img :src="photo" />
    </div>
  `,
  computed: {
    photo() {
      return '../../assets/logo.png';
    }
  }
});
```

## Class src

You can set [conditional classes](/tutorials/vue/conditional-class) on an image using `v-bind:class`, or `:class` for short.

```javascript
const decor = new Vue({
  data: () => ({
    active: false
  }),
  template: `
    <div style="width: 50%">
      <img :class="imageClass" :src="photo" />
    </div>
  `,
  computed: {
    photo() {
      return '../../assets/logo.png';
    },
    imageClass() {
      return { active: this.active };
    }
  },
  mounted() {
    this.active = true;
  }
});
```
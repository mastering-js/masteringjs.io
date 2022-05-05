To use the `img` tag in vue, you must use the `v-bind:src` directive or `:src` for short.
Remember that `:src` expects a JavaScript expression, so if you want to use a string in `:src` you need to wrap the string in quotes.

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
  app.$mount("#content");
```

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

You can also pass a computed property to `:src`, but make sure that it returns the path to the image file.


```javascript
<div id="computed"></div>
<script src="https://unpkg.com/vue@2"></script>
<script>
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
  example.$mount("#computed");
</script>
```

<div id="computed"></div>
<script src="https://unpkg.com/vue@2"></script>
<script>
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
  example.$mount("#computed");
</script>

## Class src

You can set a custom class on an image using `v-bind:class` or `:class` for short.

```javascript
<div id="decor"></div>
<script src="https://unpkg.com/vue@2"></script>
<script>
  const decor = new Vue({
    data: () => ({
      active: false,
      result: ''
    }),
    template: `
      <div style="width: 50%">
       <img ref="result" :class="imageClass" :src="photo" />
       <div> classes attached to this image are: {{result}}</div>
      </div>
    `,
    computed: {
      photo() {
        return '../../assets/logo.png';
      },
      imageClass() {
        return {active: this.active};
      }
    },
    mounted() {
      this.active = true;
      this.$nextTick().then(() => {
        this.result = this.$refs.result.className;
      })
    }
  });
  decor.$mount("#decor");
</script>
```

<div id="decor"></div>
<script src="https://unpkg.com/vue@2"></script>
<script>
  const decor = new Vue({
    data: () => ({
      active: false,
      result: ''
    }),
    template: `
      <div style="width: 50%">
       <img ref="result" :class="imageClass" :src="photo" />
       <div> classes attached to this image are: {{result}}</div>
      </div>
    `,
    computed: {
      photo() {
        return '../../assets/logo.png';
      },
      imageClass() {
        return {active: this.active};
      }
    },
    mounted() {
      this.active = true;
      this.$nextTick().then(() => {
        this.result = this.$refs.result.className;
      })
    }
  });
  decor.$mount("#decor");
</script>
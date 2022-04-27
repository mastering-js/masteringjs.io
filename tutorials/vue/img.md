To use the `img` tag in vue, you must use the `v-bind:src` directive or `:src` for short.
Be sure to enclose the image address in single quotes on top of the double quotes.

```javascript
  const app = new Vue({
    template: `
      <div style="width: 50%">
       <img :src="'../../assets/logo.png'" />
      </div>
    `,
  });
  app.$mount("#content");
```

<div id="content"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script>
  const app = new Vue({
    template: `
      <div style="width: 50%">
       <img :src="'../../assets/logo.png'" />
      </div>
    `,
  });
  app.$mount("#content");
</script>

## Computed src

You can also pass a computed property to `:src`, but make sure that it returns the image file location.


```javascript
<div id="computed"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script>
  const example = new Vue({
    template: `
      <div style="width: 50%">
        <img :src="getPhoto" />
      </div>
    `,
    computed: {
      getPhoto() {
        return '../../assets/logo.png';
      }
    }
  });
  example.$mount("#computed");
</script>
```

<div id="computed"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script>
  const example = new Vue({
    template: `
      <div style="width: 50%">
       <img :src="getPhoto" />
      </div>
    `,
    computed: {
      getPhoto() {
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
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script>
  const decor = new Vue({
    data: () => ({
      active: false,
      result: ''
    }),
    template: `
      <div style="width: 50%">
       <img ref="result" :class="getStyle" :src="getPhoto" />
       <div> classes attached to this image are: {{result}}</div>
      </div>
    `,
    computed: {
      getPhoto() {
        return '../../assets/logo.png';
      },
      getStyle() {
        return {active: this.active}
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
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script>
  const decor = new Vue({
    data: () => ({
      active: false,
      result: ''
    }),
    template: `
      <div style="width: 50%">
       <img ref="result" :class="getStyle" :src="getPhoto" />
       <div> classes attached to this image are: {{result}}</div>
      </div>
    `,
    computed: {
      getPhoto() {
        return '../../assets/logo.png';
      },
      getStyle() {
        return {active: this.active}
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
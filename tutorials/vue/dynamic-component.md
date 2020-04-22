[Vue's `component` component](https://vuejs.org/v2/guide/components.html#Dynamic-Components) can dynamically render a different component based on the state of your data. The `is` attribute is how you can tell
`component` what component to render. For example, below is a
simple tab UI:

<div id="vue-tab-example"></div>

<style>
  .buttons button {
    border: 0px;
    background-color: #ddd;
    padding: 5px;
  }
  .buttons button.selected {
    background-color: #F0DB4F;
  }
  .tab-content {
    padding: 5px;
    border: 1px solid #ddd;
  }
</style>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script>
Vue.component('home', {
  template: '<div>This is the home tab</div>'
});
Vue.component('about', {
  template: '<div>This tab talks about us</div>'
});
Vue.component('contact', {
  template: '<div>This tab provides contact info</div>'
});

const app = new Vue({
  data: () => ({ tab: 'home' }),
  methods: {
    selected: function(tab) {
      return tab === this.tab ? 'selected' : '';
    }
  },
  template: `
    <div>
      <div class="buttons">
        <button @click="tab = 'home'" :class="selected('home')">
          Home
        </button>
        <button @click="tab = 'about'" :class="selected('about')">
          About Us
        </button>
        <button @click="tab = 'contact'" :class="selected('contact')">
          Contact Us
        </button>
      </div>
      <component class="tab-content" :is="tab"></component>
    </div>
  `
});
app.$mount('#vue-tab-example');
</script>

The above tabbed UI consists of 3 different [Vue components](/tutorials/vue/components): `home`, `about`, and `contact`.

```javascript
Vue.component('home', {
  template: '<div>This is the home tab</div>'
});
Vue.component('about', {
  template: '<div>This tab talks about us</div>'
});
Vue.component('contact', {
  template: '<div>This tab provides contact info</div>'
});
```

Using `component` and `:is`, Vue can render different components based
on the state of `tab`:

```
<component class="tab-content" :is="tab"></component>
```

Whenever `tab` changes, Vue changes what component is rendered. Below
is the full Vue app that handles the state of `tab`.

```javascript
const app = new Vue({
  data: () => ({ tab: 'home' }),
  methods: {
    selected: function(tab) {
      return tab === this.tab ? 'selected' : '';
    }
  },
  template: `
    <div>
      <div class="buttons">
        <button @click="tab = 'home'" :class="selected('home')">
          Home
        </button>
        <button @click="tab = 'about'" :class="selected('about')">
          About Us
        </button>
        <button @click="tab = 'contact'" :class="selected('contact')">
          Contact Us
        </button>
      </div>
      <component class="tab-content" :is="tab"></component>
    </div>
  `
});
app.$mount('#vue-tab-example');
```
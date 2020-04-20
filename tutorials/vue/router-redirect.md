You can [configure Vue Router to redirect](https://router.vuejs.org/guide/essentials/redirect-and-alias.html#redirect) from one URL to another using
the `redirect` option.

For example, the below tabbed UI has 3 links: one to `/`, one to `/about`,
and one to `/about-us`. The `/about-us` link is configured to redirect
to `/about`.

<div id="vue-redirect-example"></div>

<style>
  .rendered-content a, .rendered-content span {
    border: 0px;
    background-color: #ddd;
    padding: 5px;
    color: #232323;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .rendered-content a.router-link-exact-active {
    background-color: #F0DB4F;
  }
  .tab-content {
    margin-top: 5px;
    padding: 5px;
    border: 1px solid #ddd;
  }
</style>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
<script>
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: { template: '<h1>Home</h1>' }
    },
    {
      path: '/about',
      component: { template: '<h1>About Us</h1>' }
    },
    { path: '/about-us', redirect: '/about' }
  ]
});

const app = new Vue({
  router,
  template: `
    <div class="rendered-content">
      <div>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About Us</router-link>
        <router-link to="/about-us">About Us Alternate</router-link>
      </div>
      <div class="tab-content">
        <router-view></router-view>
      </div>
    </div>
  `
}).$mount('#vue-redirect-example');
</script>

Below is the [Vue Router](/tutorials/vue/router) config. Note the `redirect` on the
`/about-us` path.

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: { template: '<h1>Home</h1>' }
    },
    {
      path: '/about',
      component: { template: '<h1>About Us</h1>' }
    },
    // Note the `redirect` below.
    { path: '/about-us', redirect: '/about' }
  ]
});
```

Below is the actual app. Note that the `router-link` for the "About Us Alternate" tab points to `/about-us`.

```javascript
const app = new Vue({
  router,
  template: `
    <div class="rendered-content">
      <div>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About Us</router-link>
        <router-link to="/about-us">About Us Alternate</router-link>
      </div>
      <div class="tab-content">
        <router-view></router-view>
      </div>
    </div>
  `
}).$mount('#vue-redirect-example');
```

Programmatic Navigation
-----------------------

You can also programatically navigate using the router's [`push()` method](https://router.vuejs.org/guide/essentials/navigation.html). The below
example uses `$router.push()` to send the user to the `/about-us` URL.

<div id="vue-redirect-example-2"></div>

<script>
const router2 = new VueRouter({
  routes: [
    {
      path: '/',
      component: { template: '<h1>Home</h1>' }
    },
    {
      path: '/about',
      component: { template: '<h1>About Us</h1>' }
    },
    { path: '/about-us', redirect: '/about' }
  ]
});

const app2 = new Vue({
  router: router2,
  methods: {
    redirect: function(path) {
      this.$router.push({ path });
    }
  },
  template: `
    <div class="rendered-content">
      <div>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About Us</router-link>
        <span @click="redirect('/about-us')">About Us Alternate</span>
      </div>
      <div class="tab-content">
        <router-view></router-view>
      </div>
    </div>
  `
}).$mount('#vue-redirect-example-2');
</script>

```javascript
const app = new Vue({
  router: router2,
  methods: {
    redirect: function(path) {
      this.$router.push({ path });
    }
  },
  template: `
    <div class="rendered-content">
      <div>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About Us</router-link>
        <span @click="redirect('/about-us')">About Us Alternate</span>
      </div>
      <div class="tab-content">
        <router-view></router-view>
      </div>
    </div>
  `
}).$mount('#vue-redirect-example');
```
[Vue Router's `<router-view>` component](https://router.vuejs.org/api/#router-view) displays the component or template that corresponds to the current URL.

```html
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-router@4"></script>

<div id="app">
  <div>
    <router-link to="/home">Go to Home</router-link> <br />
    <router-link to="/about">Go to About</router-link>
  </div>
  <h1>Observe the Change Below!</h1>
  <router-view></router-view>
</div>
<script>
  const routes = [
    { path: '/home', component: { template: '<div>Home</div>' } },
    { path: '/about', component: { template: '<div>About</div>' } }
  ];
  const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
  });
  const app = Vue.createApp({});
  app.use(router);
  app.mount('#app');
</script>
```

Below is a live example:

<div style="padding: 10px; border: 1px solid #ddd">
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-router@4"></script>

<div id="app">
  <div>
    <router-link to="/home">Go to Home</router-link> <br />
    <router-link to="/about">Go to About</router-link>
  </div>
  <h1>Observe the Change Below!</h1>
  <router-view></router-view>
</div>
<script>
  const routes = [
    { path: '/home', component: { template: '<div>Home</div>' } },
    { path: '/about', component: { template: '<div>About</div>' } }
  ];
  const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
  });
  const app = Vue.createApp({});
  app.use(router);
  app.mount('#app');
</script>
</div>

### Props

Note that `router-view` only takes one prop, [`name`](https://router.vuejs.org/api/#router-view-props).
You cannot use `router-view` to pass props to the rendered component, you need to use the [`props` option for routes](https://router.vuejs.org/api/#routes).

```javascript
const router = VueRouter.createRouter({
  {
    path: '/user/:id',
    component: app.component('user'),
    // Pass the `id` route parameter as the `userId` prop.
    props: (route) => {
      return {
        userId: route.params.id
      };
    }
  }
});
```
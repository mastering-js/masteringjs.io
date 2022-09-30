To pass route parameters as props, you should set the `props` option on your route to `true`.
This will set `route.params` as the component's props.

```javascript
const User = {
  props: ['id'],
  template: '<h1>Your Id is {{id}} </h1>' 
}
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: '/home',
      component: { template: '<h1>Home</h1>' }
    },
    {
      path: '/about',
      component: { template: '<h1>About Us</h1>' }
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User,
      props: true
    }
  ]
});
  
const app = Vue.createApp({
  methods: {
    changeRoute(route) {
      // `route` is either a string or object
      router.push(route);
    }
  },
    template: `
    <div id="rendered-content">
      <div>
        <button @click="changeRoute('home')">Home</button>
        <button @click="changeRoute('about')">About Us</button>
        <button @click="changeRoute({path: '/user/123'})">Get ID</button>
      </div>
      <div>
      <router-view></router-view>
      </div>
    </div>
  `
});
app.use(router);
app.mount('#props')
```

## Function Mode

You can set `props` to a function with Vue Router.
This gives you more fine grained control over what props Vue Router passes to your Vue component.

Vue Router calls your props function with the `route` object as the first parameter.

```javascript
{
  path: '/user/:id',
  name: 'user',
  component: {
    template: `
    <div>
      <h1>id is {{id}}</h1>
      <h1>showProfilePicture is {{showProfilePicture}}</h1>
    </div>
    `
  },
  props: route => ({
    id: route.params.id, // Pull `id` from route params
    showProfilePicture: true // Hard code `showProfilePicture`
  })
}
```


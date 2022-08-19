To pass props to different routes, you must set the `props` option on your route to `true`.
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
This lets you pass different values to the routes as long as the property names are the same.

```javascript
{
    path: '/function',
    name: 'function',
    component: { template: '<h1>the props are {{$route.query}}</h1>'},
    props: route => ({ ...route.params, showProfilePicture: true })
},
```

```html
<button @click="changeRoute({path: '/function', query: {value:'test'}})">Query String</button>
```


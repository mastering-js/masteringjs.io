To pass props to different routes, you must set `props` to true.
This enables `route.params` to be set to the component's props.

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

## Object Mode

Instead of setting `props: true`, you can set props to an object.
This allows for static props to always be present in the route.

```javascript
{
    path: '/name',
    name: 'name',
    component: { 
        template: '<h1>the props are {{$route.matched[0].props.default}}</h1>'
    },
    props: { value: true, navigate: false}
},
```

```html
<button @click="changeRoute({path: '/name'})">Static props</button>      
```

## Function Mode

You can set `props` to a function with vue router.
This lets you pass different values to the routes as long as the property names are the same.

```javascript
{
    path: '/function',
    name: 'function',
    component: { template: '<h1>the props are {{$route.query}}</h1>'},
    props: route => ({ query: route.query.value })
},
```

```html
<button @click="changeRoute({path: '/function', query: {value:'test'}})">Query String</button>
```


Live example can be found [here](/tutorials/vue/router/props.html)

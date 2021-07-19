[Vue Router](https://router.vuejs.org/installation.html) has two approaches to navigating a site,
[declarative navigation](/tutorials/vue/router) and programmatic navigation which is shown below:

```javascript
const router = new VueRouter({
    routes: [
      {
        path: '/home',
        component: { template: '<h1>Home</h1>' }
      },
      {
        path: '/about',
        component: { template: '<h1>About Us</h1>' }
      }
    ]
  });
  
  const app = new Vue({
    router,
    methods: {
        changeRoute(route) {
            router.push(route);
        }
    },
    template: `
      <div id="rendered-content">
        <div>
          <button @click="changeRoute('home')"> Home </button>
          <button @click="changeRoute('about')"> About us </button>
        </div>
        <div>
        <router-view><router-view>
        </div>
      </div>
    `
  }).$mount('#example');
```

```html
<html>
  <head>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no">
    <style>
      button {
        font-size: 1.5em;
        padding: 0.5em;
        margin-right: 2em;
        margin-bottom: 2em;
      }

      body {
        font-family: 'Arial', sans-serif;
      }
    </style>
  </head>

  <body>
    <div id="example"></div>
    <script src="example2.js"></script>
  </body>
</html>
```

You can also pass a location descriptor object like `{path: 'home'}` into the `router.push()` function to achieve the same result.

[Live Demonstration](/tutorials/vue/router/example2)

## Passing Parameters

To pass parameters using `router.push()`, you may do only the following:

```javascript
router.push({ name: 'home', params: {id: 123}});

// or

const id = 123;
router.push({ path: `/home/${id}` });
```

To then access it, use whatever you declared in the router as the object property name.
If the route was `/home/:id` the path would be `router.params.id` or you could access
it as a prop by adding a `props:true` object in the route.

```javascript
    {
        path: '/home/:id',
        component: { template: '<h1>Home</h1>' },
        props:true
    },
```

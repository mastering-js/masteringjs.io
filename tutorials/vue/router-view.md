`<router-view>` displays the component or template that corresponds to the current URL.

```html
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-router@4"></script>

<div id="app">
  <h1>Observe the Change Below!</h1>
  <router-view></router-view>
  <p>
    <router-link to="/home">Go to Home</router-link> <br />
    <router-link to="/about">Go to About</router-link>
  </p>
</div>
<script>
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }
const routes = [
  { path: '/home', component: Home },
  { path: '/about', component: About },
]
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})
const app = Vue.createApp({})
app.use(router)
app.mount('#app')
</script>
```
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-router@4"></script>

<div id="app">
  <h1>Observe the Change Below!</h1>
  <router-view></router-view>
  <p>
    <router-link to="/home">Go to Home</router-link> <br />
    <router-link to="/about">Go to About</router-link>
  </p>
</div>
<script>
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }
const routes = [
  { path: '/home', component: Home },
  { path: '/about', component: About },
]
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})
const app = Vue.createApp({})
app.use(router)
app.mount('#app')
</script>

## Using `<router-view>` in a Component

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: { template: '<h1>This is the Home Page</h1>' }
    },
    {
      path: '/about',
      component: { template: '<h1>About Us</h1>' }
    },
  ]
});
  
const app = Vue.createApp({
  template: `<app-component />`
});

app.component('app-component', {
    template: 
    `
    <div id="rendered-content">
        <div>
          <router-link to="/home"> Go to Home</router-link>
          <router-link to="/about"> Go to About</router-link>
        </div>
        <div>
          <router-view></router-view>
        </div>
    </div>
    `
})

app.mount('#example')
```

[Live example](/tutorials/vue/router/example3.html)
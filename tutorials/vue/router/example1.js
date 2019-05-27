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
  template: `
    <div id="rendered-content">
      <div>
        <router-link to="/home">Home</router-link>
        <router-link to="/about">About Us</router-link>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  `
}).$mount('#content');
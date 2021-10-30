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
    
const app = new Vue({
  router,
  template: `<app-component />`
});

Vue.component('app-component', {
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

app.$mount('#example')
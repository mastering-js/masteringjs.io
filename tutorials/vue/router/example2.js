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
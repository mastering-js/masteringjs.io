

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
      },
      {
        path: '/name',
        name: 'name',
        component: { 
            template: '<h1>the props are {{$route.matched[0].props.default}}</h1>'
        },
        props: { value: true, navigate: false}
      },
      {
        path: '/function',
        name: 'function',
        component: { template: '<h1>the props are {{$route.query}}</h1>'},
        props: route => ({ query: route.query.value })
      },
    ]
  });
    
  const app = Vue.createApp({
    methods: {
      changeRoute(route) {
        router.push(route);
      }
    },
      template: `
      <div id="rendered-content">
        <div>
          <button @click="changeRoute('home')">Home</button>
          <button @click="changeRoute('about')">About Us</button>
          <button @click="changeRoute({path: '/user/123'})">Get ID</button>
          <button @click="changeRoute({path: '/name'})">Static props</button>
          <button @click="changeRoute({path: '/function', query: {value:'test'}})">Query String</button>
        </div>
        <div>
        <router-view></router-view>
        </div>
      </div>
    `
  });
  app.use(router);
  app.mount('#props');
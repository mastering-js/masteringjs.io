[Vue Router](https://router.vuejs.org/) is Vue's official router. The point of a router is to integrate a single page app with browser navigation, like the back button.

Here's how you create a page with 2 links using Vue Router. First, `example1.html`:

```html
<html>
  <head>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
  </head>

  <body>
    <div id="content"></div>
    <script src="example1.js"></script>
  </body>
</html>
```

This script loads `example1.js`. Below is the `example1.js` file:

```javascript
const router = new VueRouter({
  routes: [
    // A route maps paths to components - when the portion of the URL after
    // '#' changes, Vue router changes which component is displayed
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
  // The `router-link` and `router-view` components are from Vue router.
  // `router-link` becomes an <a> that links to the correct path
  // `router-view` is where Vue router renders the component or template
  // that corresponds to the current path.
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
```

[Here's a live example](/tutorials/vue/router/example1.html) of this basic Vue router setup. Below is a video of this code in action.

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/7c851ac804b64b41bcc066d6a68f72d9" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>  

Testing
-------

There's [numerous ways to test Vue apps](https://vue-test-utils.vuejs.org/). One alternative approach is using [Segment's browser automation tool Nightmare](https://www.npmjs.com/package/nightmare). Here's the [Mocha](https://www.npmjs.com/package/mocha) test we use to test the example from this article:

```javascript
  describe('router', function() {
    it('basic example', async function() {
      const nightmare = new Nightmare({ show: false });

      await nightmare.
        goto(`file://${process.cwd()}/tutorials/vue/router/example1.html`).
        wait('#rendered-content');

      await nightmare.click('a[href="#/home"]');
      let res = await nightmare.evaluate(() => document.querySelector('h1').innerHTML);
      assert.equal(res, 'Home');

      await nightmare.click('a[href="#/about"]');
      res = await nightmare.evaluate(() => document.querySelector('h1').innerHTML);
      assert.equal(res, 'About Us');

      await nightmare.end();
    });
  });
```
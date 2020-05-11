The [`router-link` component](https://router.vuejs.org/api/#router-link)
creates an `<a>` tag that's configured to work correctly with
[Vue router](/tutorials/vue/router). For example, given the
below Vue code:

```javascript
const router = new VueRouter({
  routes: [
    { path: '/home', component: { template: '<h1>Home</h1>' } },
    { path: '/about', component: { template: '<h1>About Us</h1>' } }
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
```

Vue will render the below HTML. Note that `<router-link>` becomes
a plain-old `<a>` tag.

```html
<div>
  <a href="#/home" class="">Home</a>
  <a href="#/about" class="">About Us</a>
</div>
<div><!----></div>
```

With the above example, you can write your own `<a>` tags instead
of going through `<router-link>`, but then you would need to
do extra work to support [named routes](https://router.vuejs.org/guide/essentials/named-routes.html) and [HTML5 mode](https://router.vuejs.org/guide/essentials/history-mode.html).

Custom Tags
-----------

The `router-link` component supports a neat [`tag` prop](https://router.vuejs.org/api/#tag)
that lets you specify a custom tag to use for navigation, as
opposed to the default `<a>`. For example, here's how you
can use buttons for navigation instead of `<a>` tags:

```javascript
const app = new Vue({
  router,
  template: `
    <div id="rendered-content">
      <div>
        <router-link to="/home" tag="button">Home</router-link>
        <router-link to="/about" tag="button">About Us</router-link>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  `
}).$mount('#content');
```

Vue would render the below HTML:

```html
<div>
  <button class="">Home</button>
  <button class="">About Us</button>
</div>
<div><!----></div>
```

Looks like the buttons don't do anything, but Vue Router registered
event handlers to make clicking on the buttons trigger navigation
as shown below.

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/0f141a09003d403889cdf1e90f8cbb85" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
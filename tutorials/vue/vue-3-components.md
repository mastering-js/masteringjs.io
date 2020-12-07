[Vue 3](/tutorials/vue/vue-3) has made some slight changes to how [Vue components](/tutorials/vue/components) work. The basic syntax for creating Vue components hasn't changed much, but there's a lot
of new features for you to take advantage of. Here's an overview of how components have changed
in Vue 3.

Components are Scoped to Apps
-----------------------------

If you drop Vue 3 into an existing Vue 2 codebase, odds are the first error you'll see is `TypeError: Vue is not a constructor`. That's because the `Vue` global is now no longer a class. Instead of using
`new Vue()` to create a new app, you should use `Vue.createApp()`. And, instead of registering
components globally using `Vue.component()`, you register components on apps using `app.component()`.

For example, below is a component in Vue 2:

```javascript
[require:Vue.*component.*component state]
```

Below is how you would rewrite it for Vue 3:

```javascript
// Create an app using `createApp()` that uses the `hello` component
const app = Vue.createApp({
  // Displays "Hello, World" initially, changes based on input
  template: '<hello></hello>'
});

// Register the `hello` component
app.component('hello', {
  data: () => ({
    name: 'World'
  }),
  template: `
    <div>
      <div>
        <input v-model="name"></input>
      </div>
      <h1>Hello, {{name}}</h1>
    </div>
  `
});

app.mount('#content');
```

That's it! There are 4 necessary changes:

- Use `createApp()` instead of `new Vue()`
- Use `app.component()` instead of `Vue.component()`
- Switch the order of definition, so you define the `app` before the component
- Use `mount()` instead of `$mount()`

`$emit()` Changes
-----------------

The basics still work: you still define `props` the same way, and you can still `$emit()` events
from your component. The only difference is that you now need to explicitly define what events your
component emits like how you explicitly define a list of `props`.

Below is an example of how you can use `$emit()` with Vue 2:

```javascript
[require:Vue.*component.*emit]
```

Below is how you would change the above example to work with Vue 3. Besides the usual `createApp()`
and `app.component()` changes, this example also adds a list of events the component `emits`.

```javascript
const app = Vue.createApp({
  data: () => ({ name: 'World' }),
  // To listen to the 'update' event, you create the `input-name`
  // component with a `v-on:update` attribute. `$event` contains
  // the value of the 2nd parameter to `$emit()`.
  template: `
    <div>
      <div>
        <input-name v-on:update="setName($event)"></input-name>
      </div>
      <h1>Hello, {{name}}</h1>
    </div>
  `,
  methods: {
    // Define a method that Vue will call to handle the 'update' event.
    setName: function(v) {
      this.name = v;
    }
  }
});

app.component('input-name', {
  data: () => ({ name: 'World' }),
  // New property in Vue 3:
  emits: ['update'],
  // When you click the "Update" button, Vue will emit an event `update`
  // to the parent, with the current state of 'name'.
  template: `
    <div>
      <input type="text" v-model="name">
      <button v-on:click="$emit('update', name)">
        Update
      </button>
    </div>
  `
});

app.mount('#content');
```

The `setup()` Hook
------------------

The [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) is one of the most [touted improvements in Vue 3](https://learnvue.co/2019/12/how-vue3-is-designed-for-both-hobby-devs-and-large-projects/). And the Composition API starts with the `setup()` function, which is [similar to the `created()` hook](https://learnvue.co/2020/03/how-to-use-lifecycle-hooks-in-vue3/), but much more powerful. For example, you can use the Vue global's `onMounted()` function to add a new `mounted()` hook to your component from the `setup()` function:

```javascript
const app = Vue.createApp({
  data: () => ({ to: 'World' }),
  template: '<hello v-bind:to="to"></hello>'
});

// Prints 'Mounted from component!' followed by 'Mounted from setup!'
app.component('hello', {
  props: ['to'],
  template: '<h1>Hello, {{to}}</h1>',
  mounted: function() {
    console.log('Mounted from component!');
  },
  setup: function(props) {
    Vue.onMounted(() => console.log('Mounted from setup!'));
    return {};
  }
});
```

The most interesting part of the composition API is that it lets you [define Vue components without explicitly instantiating a component](https://learnvue.co/2020/03/how-to-use-lifecycle-hooks-in-vue3/) using a syntax reminiscent of React hooks. For example, you can rewrite the above `hello` component using just the `setup()` function:

```javascript
app.component('hello', {
  props: ['to'],
  setup: function() {
    Vue.onMounted(() => console.log('Mounted!'));
    return (props) => Vue.h('h1', 'Hello, ' + props.to);
  }
});
```

Not only can you define hooks in `setup()`, you can also [return a `render()` function](https://composition-api.vuejs.org/api.html#template-refs) and effectively define your template in the `setup()` function as well as shown above.

The neat part of the Composition API is that you don't have to use it. It's just another tool in the
Vue utility belt. For example, we generally don't recommend using JSX-like `render()` functions because
we prefer [plain old HTML templates for portability and versatility](https://www.getrevue.co/profile/masteringjs/issues/building-and-testing-email-templating-using-vue-257729). But, in certain cases,
this pattern can be very useful, like if you're migrating a legacy React app to Vue.
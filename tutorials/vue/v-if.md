[The `v-if` directive](https://vuejs.org/v2/guide/conditional.html#v-if) allows you to conditionally render a block. It differs from [`v-show`](https://vuejs.org/v2/guide/conditional.html#v-if-vs-v-show) in that `v-if` doesn't actually create the element if its expression evaluates to `false`.

```javascript
[require:Vue.*v-if.*basic]
```

`v-else-if` and `v-else`
------------------------

Vue also has [`v-else-if` and `v-else` directives](https://vuejs.org/v2/guide/conditional.html#v-else) that behave like `else if` and `else` in JavaScript.

```javascript
[require:Vue.*v-if.*else]
```

Lifecycle Hooks
---------------

[Vue components have lifecycle hooks](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks), like the `created` hook that gets called when the component gets created, and `mounted` when the component gets mounted.

When Vue renders a component because the `v-if` expression became
truthy, it triggers both the 'created' and 'mounted' hooks. For example,
the below code will print both 'Created!' and 'Mounted!' every time
`display` changes to `true` from `false`.

```javascript
Vue.component('test', {
  created: function() {
    console.log('Created!');
  },
  mounted: function() {
    console.log('Mounted!');
  },
  template: '<h1>Hello World</h1>'
});

const app = new Vue({
  data: () => ({ display: false }),
  template: `
    <div id="rendered-content">
      <test v-if="display"></test>
      <div>
        <button v-on:click="display = !display">Toggle</button>
      </div>
    </div>
  `
});
```
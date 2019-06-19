[Vue props](https://vuejs.org/v2/guide/components-props.html) are a way for a parent [component](/tutorials/vue/components) to pass data to a child component. [Props are used for passing data down the component tree](/tutorials/vue/components#component-props), to pass data up the component tree (from child to parent), you can use [`$emit()`](/tutorials/vue/components#emit) or [Vuex](/tutorials/vue/vuex).

<img src="/assets/vueprops.png" class="inline-image">

Getting Started
---------------

When you [create a component in Vue](/tutorials/vue/components#creating-a-component), you pass a `description` object. The `description.props` field is where you specify what props your component can receive. The easiest way is to list out your `props` as an [array](http://thecodebarbarian.com/the-80-20-guide-to-javascript-arrays.html) of property names.

In the below example, the `greet` component takes in a single prop, `name`. It then uses the `name` prop in its [template](https://vuejs.org/v2/guide/syntax.html).

```javascript
[require:Vue.*props.*basic]
```

In the above example, the Vue app passes the `name` prop to `greet` as a [static prop](https://vuejs.org/v2/guide/components-props.html#Passing-Static-or-Dynamic-Props). In other words, 'World' is a hard coded string. To pass a dynamic prop (a prop bound to a variable) you need to prefix `name` with `v-bind:` when creating the component:

```javascript
[require:Vue.*props.*dynamic]
```

Prop Validation
---------------

[Vue has built-in prop validation](https://vuejs.org/v2/guide/components-props.html#Prop-Validation). That means you can check whether a prop is the right type or whether it is set. Keep in mind prop validation **only works in development mode**. It is excluded from the [minified production version](https://vuejs.org/v2/guide/installation.html#Development-vs-Production-Mode).

Below is an example of using prop validation. Note that Vue only prints a warning, it does **not** throw an error if you pass a non-string `name` prop.

```javascript
[require:Vue.*props.*validation]
```

Change Tracking
---------------

It is important to note that [props are one-way only](https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow). If you change the value of a prop in a child component, those changes will **not** bubble up to the parent component.

For example, suppose you have an `input` in the `greet` component. If the user types in the `input` below, `value` will **not** change.

```javascript
Vue.component('greet', {
  props: ['name'],
  // `name` will be 'World' initially, but changes will **not** affect
  // the parent component.
  template: `
    <div>
      <input v-model="name"></input>
    </div>
  `
});

const app = new Vue({
  data: () => ({ value: 'World' }),
  // `value` will always be 'World', `greet` cannot modify it.
  template: `
    <div id="rendered-content">
      <greet v-bind:name="value"></greet>
      <div>
        Value: {{value}}
      </div>
    </div>
  `
});
```
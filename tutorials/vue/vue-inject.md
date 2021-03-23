Vue's provide/inject API is a neat way to send props directly
to the component you want while avoiding [prop drilling](https://kentcdodds.com/blog/prop-drilling).
To use provide and inject, you declare what variables you will send (provide) in one component,
then each component underneath it can define what variables it will receive (inject).
Below is a live example with code:

<div id = "content"></div>
<script src="https://unpkg.com/vue@next"></script>
<script>
const app = Vue.createApp({
  provide() {
    return { state: 'Hi grandma' };
  },
  template: "<div><child /></div>",
});
app.component("child", {
  template: "<grandchild />",
});
// Displays "Hi grandma", despite the fact that `state` isn't a prop. 
app.component("grandchild", {
  inject: ["state"],
  template: "<h2>{{state}}</h2>",
});
app.mount('#content');
</script>

```javascript
const app = Vue.createApp({
  provide() {
    return { state: 'Hi grandma' };
  },
  template: "<div><child /></div>",
});
app.component("child", {
  template: "<grandchild />",
});
// Displays "Hi grandma", despite the fact that `state` isn't a prop. 
app.component("grandchild", {
  inject: ["state"],
  template: "<h2>{{state}}</h2>",
});
```

# Reactivity

To make your injected property reactive, wrap it
around the `reactive` property. In the `setup` function,
define a variable to store the reactive property and then
use `Vue.provide` to give access to the child components.
Below is a live example with code:

<div id = "example"></div>
<script src="https://unpkg.com/vue@next"></script>
<script>
const example = Vue.createApp({
  setup: function() {
    const state = Vue.reactive({ message: "Row" });
    Vue.provide("state", state);
    return state;
  },
  template: `
  <div>
    <child />
    <button v-on:click="message += ' row'">Add</button>
  </div>
  `
});
example.component("child", {
  template: "<grandchild />"
});
// Will add an extra "row" to "Row your boat" on every button
// click, even though `state` isn't a prop.
example.component("grandchild", {
  inject: ["state"],
  template: "<h2>{{state.message}} your boat</h2>"
});
example.mount('#example');
</script>

```html
<div id="example"></div>
<script src="https://unpkg.com/vue@next"></script>
<script>
  const example = Vue.createApp({
    setup: function() {
      const state = Vue.reactive({ message: "Row" });
      Vue.provide("state", state);
      return state;
    },
    template: `
    <div>
      <child />
      <button v-on:click="message += ' row'">Add</button>
    </div>
    `
  });
  example.component("child", {
    template: "<grandchild />"
  });
  example.component("grandchild", {
    inject: ["state"],
    template: "<h2>{{state.message}} your boat</h2>"
  });
</script>
```

With `inject`, you don't have to explicitly pass a `state` prop
to the child component.

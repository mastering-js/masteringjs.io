Vue's provide/inject API is a neat way to send props directly
to the component you want while avoiding prop drilling.
What you do is you declare what variables you will send, i.e. provide,
in the setup property and then in the component that needs them you use the inject property.
Here is an example below:

<div id = "content"></div>
<script src="https://unpkg.com/vue@next"></script>
<script>
const app = Vue.createApp({
  setup: function() {
      const state = Vue.reactive({message: 'Hi grandma!'});
      Vue.provide('state', state);
      return state;
  },
  template: `<div><child /></div>`
});
app.component('child', {
    template: `<grandchild />`
});
app.component('grandchild', {
    inject: ['state'],
    template: `<h1>{{state.message}}</h1>`
});
app.mount('#content');
</script>

```html
<div id = "content"></div>
<script src="https://unpkg.com/vue@next"></script>
<script>
const app = Vue.createApp({
  setup: function() {
      const state = Vue.reactive({message: 'Hi grandma!'});
      Vue.provide('state', state);
      return state;
  },
  template: `<div><child /></div>`
});
app.component('child', {
    template: `<grandchild />`
});
app.component('grandchild', {
    inject: ['state'],
    template: `<h1>{{state.message}}</h1>`
});
app.mount('#content');
</script>
```
As you can see, we avoided having to put the state property
in the child component and were able to send it directly to
the grandchild component.

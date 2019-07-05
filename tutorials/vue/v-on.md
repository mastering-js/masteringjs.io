In Vue, the [`v-on` directive](https://vuejs.org/v2/guide/events.html) 
is how you run JavaScript in response to DOM events. If you want to
run some code when the user clicks a button, you should use `v-on`.

For example, suppose you want to reset an input field to its default
value every time the user clicks a "Reset" button. The way to execute 
a JavaScript expression when the user clicks a button is using the 
`v-on:click` directive as shown below.

```javascript
const app = new Vue({
  data: () => ({ value: 'Hello, World' }),
  template: `
    <div id="rendered-content">
      <div><input v-model="value"></input></div>
      <button v-on:click="value = 'Hello, World'">
        Reset
      </button>
    </div>
  `
});
```

Everything after `v-on:` is the name of the event Vue will listen to.
So `v-on:click` tells Vue to register a listener for [the native 'click' event](https://www.w3schools.com/js/js_htmldom_eventlistener.asp).

There's nothing special about the 'click' event. You can use `v-on:`
to listen to any native event, like:

- [`v-on:keyup`](https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event)
- [`v-on:mouseenter`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event)
- [`v-on:focus`](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event)
- [`v-on:change`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)

`@` Shorthand
-------------

[Vue has a convenient shorthand for `v-on`](https://vuejs.org/v2/guide/syntax.html#v-on-Shorthand):
the `@` symbol. For example, `@click` is functionally equivalent to 
`v-on:click`. Using `@` saves you a few keystrokes, but `v-on` is more 
readable for people who aren't familiar with Vue.

```javascript
const app = new Vue({
  data: () => ({ value: 'Hello, World' }),
  // Uses `@click` instead of `v-on:click`
  template: `
    <div id="rendered-content">
      <div><input v-model="value"></input></div>
      <button @click="value = 'Hello, World'">
        Reset
      </button>
    </div>
  `
});
```

Many Vue codebases use `@`, so you should be familiar with it. However,
you should prefer to use `v-on` for readability, unless you have a
large codebase that you only expect experienced Vue developers to work
with.

With Custom [Components](/tutorials/vue/components)
----------------------

[Using `$emit` to send events to parent components](/tutorials/vue/components#emit) is a core tenant of data flow in Vue.
Even [`v-model` uses `v-on` under the hood](/tutorials/vue/v-model#custom-inputs).

In Vue methods and expressions, you have access to a `$emit()` function
that lets you emit an event up the component tree to the parent
component. In the below example, the `input-name` component emits a
'update' event. The top-level app listens for 'update' events using
`v-on:update`, and changes the name accordingly.

```javascript
[require:Vue.*component.*emit]
```
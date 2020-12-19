[Components](https://vuejs.org/v2/guide/components.html) are essentially [custom HTML elements](https://v1.vuejs.org/guide/components.html#What-are-Components). They allow you to break your app down into understandable and reusable chunks, rather than having a single monolithic app. In this tutorial, you'll learn:

- How to create a component
- How to manage internal state with a component
- How to pass data into a component via props
- How to pass data from a component to its parent via `$emit()`

Creating a Component
--------------------

To create a component, you should call the [`Vue.component()` function](https://vuejs.org/v2/api/#Vue-component). The `Vue.component()` function takes 2 parameters: a unique string `id` for the component, and the object `definition` of the component.

Suppose you have a component whose id is `hello`. Whenever you include an element `<hello></hello>` in a [Vue template](/tutorials/vue/templates), Vue will replace the element with your component's template. Below is an example of a component `hello` with a template that displays a message in an `<h1>` tag.

```javascript
[require:Vue.*component.*create a component]
```

Internal State With Components
------------------------------

One advantage Vue has over React is [two way data binding on form elements](https://vuejs.org/v2/guide/forms.html). Forms in Vue are trivial using `v-model`, but they require a bit more work with React.

Suppose you wanted to extend the `hello` component with an input, so the user can enter their name. You should add a [`data` function](https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function) to your component `definition` that returns the initial state of the component. Make sure you define an initial state for all the properties you want Vue to watch, even if it is [`null`](/tutorials/fundamentals/null).

```javascript
[require:Vue.*component.*component state]
```

Here's how the component looks in action. You can also see a [live example here](/examples/vue/component-with-data).

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/3075be615722442d89cc780630f92a8e" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Component Props
---------------

Suppose that, instead of having one component that handles both user input and displaying data, you want to have separate components. The top-level `app` template will display the `<input>`, and the `hello` component will be responsible for displaying the value of the `<input>`.

The way to pass data to the `hello` component is using [props](https://vuejs.org/v2/guide/components-props.html). The `v-bind:name="name"` binds the value of `name` in the `hello` component's template to the value of `name` in the top-level app state.

```javascript
[require:Vue.*component.*component props]
```

[Here's a live example of the props-based `hello` component](/examples/vue/component-with-props).

`$emit()`
---------

Props let you pass data into a component from a parent component. The [`$emit()` function](https://vuejs.org/v2/guide/components-custom-events.html) lets you pass data from a component back to its parent, usually in response to an event.

Suppose you wanted to define a separate `input-name` component that allowed the user to input their name. When the user clicks the 'Update' button, your app updates the user's name and updates the `<h1>` tag. Here's how this works in Vue:

```javascript
[require:Vue.*component.*emit]
```

[Here's a live example](/examples/vue/component-with-emit).
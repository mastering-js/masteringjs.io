[Vue's render functions](https://vuejs.org/v2/guide/render-function.html) let you build components using
[JSX](https://reactjs.org/docs/introducing-jsx.html), React's superset of JavaScript.
One of the reasons why Vue is so compelling is that you can build a Vue app
with vanilla JavaScript - you don't necessarily need JSX. But if you're
upgrading from React to Vue, using Vue's render functions can make the
switch more comfortable.

Hello, Render Functions
-----------------------

You can create a Vue component that has a `render` function. When it needs
to render the component, Vue calls the `render()` function with a
single parameter: the `createElement()` function.

```javascript
[require:Vue.*render function.*basic example$]
```

Using JSX
---------

The `createElement()` function is similar to
[React's top-level `createElement()` function](https://reactjs.org/docs/react-api.html#createelement).
That means a transpiler like [Babel](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx
can convert the below JSX Vue instance
to the previous example.

```javascript
/** @jsx createElement */

const app = new Vue({
  data: () => ({ user: 'World' }),
  render: function(createElement) {
    return (<h1>{this.user}</h1>);
  }
});
```

Note that the [`@jsx` pragma comment](https://www.gatsbyjs.org/blog/2019-08-02-what-is-jsx-pragma/)
above **must** line up with the `createElement()` function name.
That comment tells the transpiler what function to use when
transpiling JSX to `createElement()` calls.

Data Input
----------

You can't use built-in Vue directives like `v-for` and
[`v-model` with render functions](https://vuejs.org/v2/guide/render-function.html#v-model).
What you can do is use the 2nd parameter to `createElement()`
to [define `on` handlers](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth).

```javascript
[require:Vue.*render function.*data input$]
```

With the above example, you can click the 'Increment' button to increase
the `count` property.
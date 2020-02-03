The [`$refs` property in Vue](https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements) is used to reference [DOM elements](https://developer.mozilla.org/en-US/docs/Web/API/Element) in the Vue instance's templates.

A common use case for `$refs` is [focusing](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/focus) on a DOM element when a certain event happens. [The `autofocus` property](https://www.w3schools.com/jsref/prop_text_autofocus.asp) works on page loads. But what if you want to give focus back to the `username` input if login failed?

If you give the `username` input a `ref` attribute in your template, you can then access
the `username` input using `this.$refs.username` as shown below. You can then call
the [built-in `Element#focus()` function](https://www.w3schools.com/jsref/met_html_focus.asp) to give focus to the `username` input.

```javascript
[require:Vue refs basic example$]
```

With `v-for`
------------

When you use `ref` with [the `v-for` directive](https://vuejs.org/v2/guide/list.html),
Vue gives you a native [JavaScript array](http://thecodebarbarian.com/the-80-20-guide-to-javascript-arrays.html) of elements, not just a single element.

For example, suppose you have a list of `<input>` tags, and you want users
to be able to navigate between inputs using the up and down arrow keys.
You can access the individual `<input>` elements using `$refs` and call
`focus()` whenever the user presses up or down:

```javascript
[require:Vue refs up down$]
```
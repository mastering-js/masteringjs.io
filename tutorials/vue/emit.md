Vue components have a [`$emit()` function](https://vuejs.org/v2/api/#vm-emit) that allows you to pass [custom events](https://vuejs.org/v2/guide/components-custom-events.html) up the component tree.

```javascript
[require:Vue.*emit.*in a component]
```

All [Vue instances](https://vuejs.org/v2/api/#Instance-Properties) have a `$emit()` function, including both top-level apps and
individual components.

```javascript
[require:Vue.*emit.*in app]
```

Why `$emit()`?
--------------

Generally, you use [`$emit()` to notify the parent component that something changed](https://masteringjs.io/tutorials/vue/components#emit). For example, suppose you have a component `input-name` that takes a [prop](/tutorials/vue/props) called `name`. This component exposes an input form asking the user for their name, and an 'Update' button that updates the name.

<img src="https://codebarbarian-images.s3.amazonaws.com/vue-input.png" class="inline-image" style="width: 300px">

The way to do this is for `input-name` to `$emit()` an event called 'update' when the user clicks the 'Update' button, with the new name.

```javascript
[require:Vue.*component.*emit]
```
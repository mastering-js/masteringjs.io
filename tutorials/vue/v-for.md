The `v-for` directive is the right way to do [list rendering in Vue](https://vuejs.org/v2/guide/list.html). If your Vue instance has an array in `data`, you can
render each element in the array using `v-for`:

```javascript
[require:Vue v-for basic$]
```

Vue also handles [array change detection](https://vuejs.org/v2/guide/list.html#Array-Change-Detection).
If you were to [remove an element from the array using `splice()`](/tutorials/fundamentals/array-splice), Vue would remove an `<li>` from the DOM for you.

```javascript
// Remove "Izzy Stradlin" from the array, and also from the `<ul>`
this.array.splice(2, 1);
```

## With [`v-model`](/tutorials/vue/v-model)

Although you can loop over an array of strings using `v-for`,
it won't work with `v-model`. The `v-model` directive won't
be able to update your array with any changes to the `<input>`.

```javascript
[require:Vue v-for v-model bad$]
```

<div class="image-with-caption">
  <img src="/assets/v-for-model.png" style="width: 50%">
  <div class="caption">Even though the `input` is updated, the array doesn't change!</div>
</div>

The way to work around this is to use an array of objects with `v-for`.
Whenever you use `v-model` with `v-for`, make sure the property you're
binding with `v-model` is an object property.

```javascript
[require:Vue v-for v-model good$]
```

## With Objects

You can also use [`v-for` to loop over the keys of an object](https://vuejs.org/v2/guide/list.html#v-for-with-an-Object) using the `v-for="(value, key) in obj"` syntax.
Note that `v-for` only loops over [own properties](/tutorials/fundamentals/hasownproperty).

```javascript
[require:Vue v-for object$]
```
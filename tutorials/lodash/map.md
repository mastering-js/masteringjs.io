Given an array `arr` and a function `fn`, [Lodash's `map()` function](https://lodash.com/docs/4.17.15#map) returns an array containing the return values of `fn()` on every element in the array.

```javascript
[require:lodash map basic example$]
```

On Arrays of Objects
--------------------

Given an array of objects, you can pass a string as `fn` instead of a function
to get array containing each object's value for the property `fn`.

```javascript
[require:lodash map string$]
```

On Objects
----------

You can also call `_.map()` on an object. `_.map(obj, fn)` behaves like
`_.map(Object.values(obj), fn)`.

```javascript
[require:lodash map object$]
```
Given an array `arr`, [Lodash's `filter()` function](https://lodash.com/docs/4.17.15#filter) returns an array containing all the elements in `arr`
for which the function returned a [truthy](/tutorials/fundamentals/truthy) value.

```javascript
[require:lodash filter basic example$]
```

The function you pass to `filter()` is called the _predicate_. If
the predicate returns a [falsy](/tutorials/fundamentals/falsy) value
(like [`null`](/tutorials/fundamentals/null), `undefined`, `0`, or `''`), Lodash filters that value out.

```javascript
[require:lodash filter arrow and truthy$]
```

On Arrays of Objects
--------------------

The `filter()` function has a couple convenient shorthands for
dealing with arrays of objects. If you pass a string predicate
instead of a function, Lodash will filter by whether that property
is truthy or falsy.

```javascript
[require:lodash filter array of objects with prop name$]
```

If your predicate is an object `obj`, Lodash will filter objects that
[match the given predicate](https://lodash.com/docs/4.17.15#matches).
In other words, Lodash will match objects that have the same value
as `obj` for all properties in `obj`.

```javascript
[require:lodash filter using matches$]
```

On Objects
----------

The `_.filter()` function can also accept an object as a parameter,
rather than an array. Calling `_.filter(obj, fn)` behaves similarly
to `_.filter(Object.values(obj), fn)`.

```javascript
[require:lodash filter collections$]
```
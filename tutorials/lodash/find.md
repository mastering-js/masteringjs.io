[Lodash's `find()` function](https://lodash.com/docs/4.17.15#find) returns
the first element of a collection that matches the given `predicate`.

```javascript
[require:lodash.*find.*basic$]
```

`find()` is different from [Lodash's `filter()` function](/tutorials/lodash/filter) because `filter()` returns _all_ elements that match a condition, whereas `find()` returns the first element that matches a condition.

If `find()` doesn't find an element, it returns [`undefined`](/tutorials/fundamentals/void).

```javascript
[require:lodash.*find.*no result$]
```

The `find()` function operates on a collection, not an array, which means
you can use it on objects too.

```javascript
[require:lodash.*find.*object$]
```

Alternative Syntaxes
--------------------

`find()` supports two alernative syntaxes. If you pass an object as the predicate,
the `find()` function will create a predicate function using the [`matches()` function](https://lodash.com/docs/4.17.15#matches) which performs a partial deep comparison. That means Lodash will find the first object in the collection that has the given properties.

```javascript
[require:lodash.*find.*object comparison$]
```

If you pass a string `str` as the predicate, the `find()` function will return the first object in the array that has a [truthy](/tutorials/fundamentals/truthy) property `str`.

```javascript
[require:lodash.*find.*string comparison$]
```

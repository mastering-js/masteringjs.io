When you [clone an object in JavaScript](https://scotch.io/bar-talk/copying-objects-in-javascript), you can either create a deep copy or a shallow copy. The difference is that a deep copy, like [Lodash's `cloneDeep()` function](https://lodash.com/docs/4.17.15#cloneDeep), recursively clones _all_ nested objects.

For example, the [`Object.assign()` function](/tutorials/fundamentals/assign) lets you shallow clone an object.

```javascript
[require:Fundamentals.*shallow copy.*shallow$]
```

Shallow cloning does **not** copy nested objects. So if `obj` contains an object `name`, `Object.assign()` will keep a reference to the original copy of `name` rather than creating a copy of `name`.

```javascript
[require:Fundamentals.*shallow copy.*shallow limitation]
```

Generally, to deep clone an object, you need a library like Lodash. There is an alternative: serializing the object to JSON using [`JSON.stringify()`](http://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript.html) and then parsing it back using `JSON.parse()`.

```javascript
[require:Fundamentals.*shallow copy.*json stringify]
```

However, this approach only works well if your object only contains strings, numbers, booleans, objects, and arrays. For example, if your object has a property
`date` that is a JavaScript date, the cloned object's `date` property will be a string, because that's how `JSON.stringify()` serializes dates.

```javascript
[require:Fundamentals.*shallow copy.*json stringify date]
```
[JavaScript's `forEach()` function](/tutorials/fundamentals/foreach) takes a callback as a parameter, and calls
that callback for each element of the array.
It calls the callback with the value as the first parameter and the array index as the 2nd parameter.

```javascript
// Prints "0: a, 1: b, 2: c"
['a', 'b', 'c'].forEach(function callback(value, index) {
  console.log(`${index}: ${value}`);
});
```

`forEach()` is a method on JavaScript arrays, **not** objects.
To iterate over an object, you must turn it into an array using [`Object.entries(), Object.keys(), or Object.values()`](/tutorials/fundamentals/foreach-object).
After that, you can then use `forEach()` to iterate through the keys, values, or entries:

```javascript
[require:Fundamentals forEach object using keys$]
```

```javascript
[require:Fundamentals forEach object using values$]
```

```javascript
[require:Fundamentals forEach object using entries$]
```
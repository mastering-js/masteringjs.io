[JavaScript's `forEach()` function](/tutorials/fundamentals/foreach) takes a callback as a parameter, and calls
that callback for each element of the array:

```javascript
// Prints "a, b, c"
['a', 'b', 'c'].forEach(function callback(v) {
  console.log(v);
});
```

The first parameter to the callback is the array value. The 2nd parameter is the array index. That's the current
position in the array the `forEach()` loop is at.

```javascript
// Prints "0: a, 1: b, 2: c"
['a', 'b', 'c'].forEach(function callback(value, index) {
  console.log(`${index}: ${value}`);
});
```
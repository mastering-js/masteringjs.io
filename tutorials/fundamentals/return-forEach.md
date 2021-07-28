You can't make [JavaScript's `forEach()` function](/tutorials/fundamentals/foreach) return a custom value.
Using `return` in a `forEach()` is equivalent to a [`continue`](/tutorials/fundamentals/foreach-continue) in a conventional loop.

```javascript
// Prints "2, 4"
[1, 2, 3, 4, 5].forEach(v => {
  if (v % 2 !== 0) {
    return;
  }
  console.log(v);
});
```

## Variable

You can declare a variable before calling `forEach()` and set the value inside the loop;

```javascript
let array = [1, 2, 3, 4, 5];
let max = 0;
array.forEach((element) => {
  if (element > max) {
    max = v;
  }
});
max; // 5
```

## Using `reduce()`

[JavaScript's `reduce()` function](https://thecodebarbarian.com/javascript-reduce-in-5-examples.html) iterates over the array like `forEach()`, but `reduce()` returns the last value your callback returns.

```javascript
let array = [1, 2, 3, 4, 5];
let initialMax = 0;
const max = array.reduce((element, max) => {
  if (element > max) {
    return element;
  }
  return max;
}, initialMax);
max; // 5
```

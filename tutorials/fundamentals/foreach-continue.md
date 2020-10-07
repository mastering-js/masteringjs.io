[JavaScript's `forEach()` function](/tutorials/fundamentals/foreach) executes a function on every element in an
array. However, since `forEach()` is a function rather than a loop, JavaScript errors out if you try to use `continue`:

```javascript
[1, 2, 3, 4, 5].forEach(v => {
  if (v % 2 !== 0) {
    // SyntaxError: Illegal continue statement: no surrounding iteration statement
    continue;
  }
});
```

[We recommend using `for/of` loops to iterate through an array](/tutorials/fundamentals/array-iterate#summary) unless you have a good reason not to. However, if you find yourself stuck with a `forEach()` and need to skip to the next iteration,
here's two workarounds.

## 1. Use `return`

For practical purposes, `return` in a `forEach()` callback is equivalent to `continue` in a conventional `for` loop.
When you `return`, you skip the rest of the `forEach()` callback and JavaScript goes on to the next iteration of the loop.

```javascript
// Prints "2, 4"
[1, 2, 3, 4, 5].forEach(v => {
  if (v % 2 !== 0) {
    return;
  }
  console.log(v);
});
```

Using `return` is the easiest approach, but it isn't the most idiomatic use of functional programming patterns. Using
`if` and `return` typically means you're better off just using a `for` loop.

## 2. Filter Out Unwanted Values

Instead of thinking about how to skip `forEach()` when a certain condition occurs, functional programming encourages you to instead think about how to `filter()` out values before calling `forEach()`. Using `if` in a `forEach()`
callback makes functional programming purists cringe, because you're missing the key benefit of using functional patterns:
[composition](o/tutorials/fundamentals/map-filter).

Instead of using an `if` statement, just `filter()` out the values you don't want `forEach()` to execute on.

```javascript
// Prints "2, 4"
[1, 2, 3, 4, 5].filter(v => v % 2 === 0).forEach(v => {
  console.log(v);
});
~   
```
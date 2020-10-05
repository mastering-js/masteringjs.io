[JavaScript's `forEach()` function](/tutorials/fundamentals/foreach) executes a function on every element in an
array. However, since `forEach()` is a function rather than a loop, using [the `break` statement](https://www.w3schools.com/js/js_break.asp) is a syntax error:

```javascript
[1, 2, 3, 4, 5].forEach(v => {
  if (v > 3) {
    // SyntaxError: Illegal break statement
    break;
  }
});
```

[We recommend using `for/of` loops to iterate through an array](/tutorials/fundamentals/array-iterate#summary) unless you have a good reason not to. However, if you find yourself stuck with a `forEach()` that needs to stop after a certain point
and refactoring to use `for/of` is not an option, here's three workarounds:

## 1. Use `every()` instead of `forEach()`

The [`every()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) behaves exactly like `forEach()`, except it stops iterating through the array whenever the callback function returns
a [falsy value](/tutorials/fundamentals/falsy).

```javascript
// Prints "1, 2, 3"
[1, 2, 3, 4, 5].every(v => {
  if (v > 3) {
    return false;
  }

  console.log(v);
  // Make sure you return true. If you don't return a value, `every()` will stop.
  return true;
});
```

With `every()`, `return false` is equivalent to a `break`, and `return true` is equivalent to a `continue`.

Another alternative is to use the [`find()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), which is similar but just flips the boolean values. With `find()`, `return true` is equivalent
to `break`, and `return false` is equivalent to `continue`.

## 2. Filter Out The Values You Want to Skip

Instead of thinking about how to `break` out of a `forEach()`, try thinking about how to filter out all the values you
don't want `forEach()` to iterate over. This approach is more in line with functional programming principles.

The [`findIndex()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) takes a callback and returns the first index of the array whose value the callback returns
truthy for. Then the [`slice()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) copies part of the array.

```javascript
// Prints "1, 2, 3"
const arr = [1, 2, 3, 4, 5];

// Instead of trying to `break`, slice out the part of the array that `break`
// would ignore.
arr.slice(0, arr.findIndex(v => v > 3)).forEach(v => {
  console.log(v);
});
```

## 3. Use a `shouldSkip` Local Variable

If you can't use `every()` or `slice()`, you can check a `shouldSkip` flag at the start of your `forEach()` callback. If you
set `shouldSkip` to `true`, the `forEach()` callback returns immediately.

```javascript
// Prints "1, 2, 3"
let shouldSkip = false;
[1, 2, 3, 4, 5].forEach(v => {
  if (shouldSkip) {
    return;
  }
  if (v > 3) {
    shouldSkip = true;
    return;
  }

  console.log(v);
});
```

This approach is clunky and inelegant, but it works with minimum mental overhead. You can use this approach if the
previous approaches seem too clever.
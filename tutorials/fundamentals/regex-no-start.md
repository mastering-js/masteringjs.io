To check if a string does not start with specific characters using a regular expression, use the `test()` function and negate it.
Make sure to also use a `^` character as this signals to only check the start of the string.
Another approach is to also use a `^` inside a set of brackets as this signals to look for characters not present in the provided regular expression while also at the start of the string.


```javascript
function doesNotStartWithA(str) {
  return !/^A/.test(str);
}

// or:
function doesNotStartWithA(str) {
  return /^[^A]/.test(str);
}
```
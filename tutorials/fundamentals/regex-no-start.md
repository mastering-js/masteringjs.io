To check if a string does not start with specific characters using a regular expression, use the `test()` function and negate it.
Make sure your regular expression starts with `^`, which is a special character that represents the start of the string.

```javascript
function doesNotStartWithA(str) {
  return !/^A/.test(str);
}
```

Another approach is to use `[^A]` which means 'match any character other than A'.

```javascript
function doesNotStartWithA(str) {
  return /^[^A]/.test(str);
}
```
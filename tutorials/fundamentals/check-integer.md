To check if a variable is an integer in JavaScript, use `Number.isInteger()`.
`Number.isInteger()` returns `true` or `false` depending on the parameter provided.

```javascript
let example = 12.1;
Number.isInteger(example); // false
example = 12;
Number.isInteger(example); // true
example = Infinity;
Number.isInteger(example); // false
```
The neat thing about `Number.isInteger()` is that you can pass mathmatical expressions which the function will evaluate and return the boolean result.

```javascript
let example = 4/2;
Number.isInteger(example); // true
example = 3/2;
Number.isInteger(example); // false
```

A quirk that `Number.isInteger()` has is that it will round after 15 decimal places.

```javascript
let example = 5.0000000000000001;
Number.isInteger(example); // true
example = 5.0000000000000005;
Number.isInteger(example); // false
```
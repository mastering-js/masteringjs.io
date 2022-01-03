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

Non-numeric values will return false, even if it representing a number.

```javascript
Number.isInteger(null); // false
Number.isInteger('42'); // false
Number.isInteger(new Number(5)); // false
```

Remember that JavaScript can only represent up to [16 decimal places](https://stackoverflow.com/questions/54800022/why-max-digits-with-decimal-in-javascript-are-only-16), so `Number.isInteger()` may return surprising results in cases where JavaScript doesn't have sufficient numeric precision to represent the output.

```javascript
let example = 5.0000000000000001;
Number.isInteger(example); // true
example = 5.0000000000000005;
Number.isInteger(example); // false
```

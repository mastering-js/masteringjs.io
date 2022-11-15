To conditionally add an object to an array in JavaScript, you can use `if` in combination with `push()` or `concat()`.

```javascript
const array = [{ name: 'Test' }, { name: 'John' }];
if (array.length < 5) {
  array.push({ name: 'pass' });
}

let array2 = [{ name: 'Test' }, { name: 'John' }];
if (array2.length < 5) {
  array2 = array2.concat([{ name: 'pass' }]);
}
```

## Immutable Patterns with Spread Operator

If you are using immutable patterns, use the [spread operator](/tutorials/fundamentals/spread) with the ternary operator.

```javascript
let array2 = [{ name: 'Test' }, { name: 'John' }];

array2 = [
  ...array2,
  // If `array2.length < 5`, add element to array. Otherwise add nothing.
  ...(array2.length < 5 ? [{ name: 'pass' }] : [])
];
```

To conditionally add an object to an array in JavaScript, you can use `if()` in combination with `push()` or `concat()`.

```javascript

const array = [{name: 'Test'}, {name: 'John'}];

if (array.length < 5) {
  array.push({ name: 'Pass' });
}

const array2 = [{ name: 'Start of Second Array'}, { name: 'The meaning of life is 42' }];

if (array2.length < 5) {
  array1.concat(array2);
}
```

## Immutable patterns

If you are using immutable patterns, use the `spread` on `ternary` operator.

```javascript
const array = [{name: 'Test'}, {name: 'John'}];

const newArray = [...array, ...(array.length < 5 ? [{ name: 'Pass'}, { name:'Forward' } ] : [])].map(char => char.name.toUpperCase());
```

You can use the [`unshift()`](/tutorials/fundamentals/unshift) function to add elements to the beginning of an array.

```javascript
const array = [1, 2, 3];

array.shift(0); // 0
```

## Immutable Approaches

You can use the `concat()` function to add elements the beginning to the array as follows:

```javascript
const array1 = [4, 5, 6];
const array2 = [1, 2, 3];

array2.concat(array1); // returns [1, 2, 3, 4, 5, 6]

[0].concat(array2); // returns [0, 1, 2, 3]
```

The key point is that `concat()` doesn't modify the original array.
It will instead return a new array which you can use how you deem fit.

### Spread Operator

You can also use the spread operator to create a new array with a new element at the beginning as shown below.

```javascript
const array1 = [1, 2, 3];

[0, ...array1]; // returns [0, 1, 2, 3]
```

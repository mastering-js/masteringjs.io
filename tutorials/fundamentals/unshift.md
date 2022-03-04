The `unshift()` function adds one or more elements to the beginning of the array and returns the new length of the array.

```javascript
const array = [3, 4, 5];
array.unshift(1, 2); // 5
array; // 1, 2, 3, 4, 5
```

### Unshifting an Array

If you want to unshift an array, `unshift([1, 2])` will add `[1, 2]` as the first element of the array.
`unshift()` does **not** flatten arrays.

```javascript
const array = [3, 4, 5];
array.unshift([1, 2]); // 4
array; // [[1,2], 3, 4, 5]
```

If you want to unshift the elements of an array, you should use the [spread operator](/tutorials/fundamentals/spread) as shown below.

```javascript
const array = [3, 4, 5];
const array2 = [1, 2];
array.unshift(...array2); // 5
array; // 1, 2, 3, 4, 5
```

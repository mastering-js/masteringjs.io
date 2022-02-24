The `unshift()` function adds one or more elements to the beginning of the array and returns the new length of the array.

```javascript
const array = [3, 4, 5];
array.unshift(1, 2); // 5
array; // 1, 2, 3, 4, 5
```

## unshifting an array

If you want to unshift an array, simply doing `unshift([1,2])` is incorrect.

```javascript
const array = [3, 4, 5];
array.unshift([1, 2]); // 4
array; // [[1,2], 3, 4, 5]
```

The correct way is to use the spread `...` operator.

```javascript
const array = [3, 4, 5];
const array2 = [1, 2];
array.unshift(...array2); // 5
array; // 1, 2, 3, 4, 5
```

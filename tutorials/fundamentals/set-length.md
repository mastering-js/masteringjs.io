The most common pattern is setting the length of the array to 0. This empties out the array.

```javascript
const array = [1, 2, 3, 4, 5];
array.length = 0;
array; // []
```

## Assigning other values

While the most common pattern is assigning to 0, you can reduce the length of the array to remove elements from the end.

```javascript
const array [1, 2, 3, 4, 5];
array.length = 3;
array; // [1, 2, 3]
```

If you increase the length of the array, you're adding "holes" at the end of the array.

```javascript
const array = [];
array.length = 1;
arr[0]; // undefined
```
The most common pattern is setting the length of the array to 0.
Setting `array.length = 0` [clears the array](/tutorials/fundamentals/clear-array).

```javascript
const array = [1, 2, 3, 4, 5];
array.length = 0;
array; // []
```

## Reducing the Array Length

While the most common pattern is assigning to 0, you can reduce the length of the array to remove elements from the end.
Reducing the array's length is similar to [array `splice()`](/tutorials/fundamentals/array-splice)

```javascript
const array [1, 2, 3, 4, 5];
array.length = 3;
array; // [1, 2, 3]
```

## Increasing the Array Length

If you increase the length of the array, you're adding "holes" at the end of the array.

```javascript
const array = [];
array.length = 1;
array[0]; // undefined
array; // [ <1 empty item> ]
```

This approach isn't commonly used, because array holes are tricky to work with.
However, if you want to add several additional elements to an array, you can use `.fill()` as follows.

```javascript
const array = [3, 2, 1];
array.length = 6;
array.fill(0, 3); // Fill with 0 starting at index 3 until `length`

array; // [3, 2, 1, 0, 0, 0]
```

The above `fill()` approach works, but you should typically use `push()` instead to use simpler syntax.

```javascript
const array = [3, 2, 1];
array.push(...Array(3).fill(0));

array; // [3, 2, 1, 0, 0, 0]
```
Merging 2 arrays in JavaScript means combining the elements from two arrays to create a new, bigger array.
We recommend using the [spread operator](/tutorials/fundamentals/spread) to create a new array with the merged values.

```javascript
const array = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = [...array, ...array2]; // [1, 2, 3, 4, 5, 6]
```

The spread operator can also merge more than two arrays.

```javascript
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = [7, 8, 9];

[...array1, ...array2, ...array3]; // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## In-Place with `push()`

If you want to merge one array into another array in-place, modifying the original array, you can use the [Array `push()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) with the [spread operator](/tutorials/fundamentals/spread) as follows.

```javascript
const array = [1, 2, 3];
const array2 = [4, 5, 6];
array.push(...array2); // [1, 2, 3, 4, 5, 6]
```

**Note:** Be careful: `push()` with spread operator can cause a stack overflow error if `array2` is massive.

```javascript
const array = [];
const array2 = Array(10_000_000).fill(null);

// RangeError: Maximum call stack size exceeded
array.push(...array2);
```

## Using `concat()`

As an alternative to using the spread operator, you can use the [Array `concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) method to merge arrays.
The `concat()` function returns a new array that consists of the first array concatenated with the second.

```javascript
const array = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = array.concat(array2); // [1, 2, 3, 4, 5, 6]

array3 === array; // false
```

Using the spread operator is typically superior to using `concat()`, but `concat()` has better browser support - see [`concat()` browser support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat#browser_compatibility) vs [spread operator browser support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#browser_compatibility).
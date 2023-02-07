To add 2 arrays together in JavaScript, we recommend using the `concat()` function.
The `concat()` function returns a new array that consists of the two given arrays together.

```javascript
const array = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = array.concat(array2); // [1, 2, 3, 4, 5, 6]

array3 === array; // false
```

## push() with spread operator

You can also use the `push()` method with the spread operator.
This approach modifies the array in place instead of creating a new array.

```javascript
const array = [1, 2, 3];
const array2 = [4, 5, 6];
array.push(...array2); // [1, 2, 3, 4, 5, 6]
```

**Note:** Be careful about using this approach with potentially huge arrays. This can cause a stack overflow error if `array2` is massive.

```javascript
const array = [];
const array2 = Array(10_000_000).fill(null);

// RangeError: Maximum call stack size exceeded
array.push(...array2);
```

## Using Immutable Patterns

You can also use the [spread operator](/tutorials/fundamentals/spread) as an alternative to `concat()` to create a new array as follows.
This approach is syntactically neater, and gives you more flexibility in constructing the new array.

```javascript
const array = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = [...array, ...array2]; // [1, 2, 3, 4, 5, 6]
```
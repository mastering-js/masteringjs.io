To get the last element in an array, you get the array's `.length` property and get the element at index `length - 1`.

```javascript
const array = ['a', 'b', 'c'];
array.length; // 5
array[array.length - 1]; // 5
```

JavaScript doesn't throw array out of bounds exceptions, so it is safe to use `array[array.length - 1]` without checking if `array.length === 0`.
JavaScript will return undefined if `array` is empty.

```javascript
const array = [];
array[array.length - 1]; // undefined
```

## Using slice()

You can also use the `slice()` function to get the last element in an array.
The `slice()` method returns a subsection of the array, and supports negative indexes.
That means `slice(-1)` returns a 1 element array with just the last element in the original array.

```javascript
const array = [1, 2, 3, 4, 5];
array.slice(-1); // [5]
```

So to get the last element of an array without referencing the length property using the following:

```javascript
const lastElement = array.slice(-1)[0]; // 5
```

You can also use destructuring if you do not wish to use the syntax from above.

```javascript
const array = [1, 2, 3, 4, 5];
const [last] = array.slice(-1); // returns 5
```

This approach also returns [`undefined`](/tutorials/fundamentals/undefined-check) if `array` is empty.

```javascript
const array = [];
const [last] = array.slice(-1); // undefined
```
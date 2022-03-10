You can use the [`unshift()`](/tutorials/fundamentals/unshift) function to add elements to the beginning of an array.
`unshift()` modifies the array in place, and returns new length of the array.

```javascript
let array = [1, 2, 3];

array.unshift(0); // 4

array; // [0, 1, 2, 3]

array = ['b', 'c'];
array.unshift('a'); // 3
array; // ['a', 'b', 'c']
```

## Immutable Approaches

If you need to create a [shallow copy](/tutorials/fundamentals/shallow-copy) of the array and append a new element at the beginning, you have a couple of options.
You can use the `concat()` method to add elements the beginning to the array as follows:

```javascript
const array1 = [4, 5, 6];
const array2 = [1, 2, 3];

array2.concat(array1); // returns [1, 2, 3, 4, 5, 6]

[0].concat(array2); // returns [0, 1, 2, 3]
```

The key point is that `concat()` doesn't modify the original array.
It will instead return a copy of the array with one or more new elements at the beginning.

### Spread Operator

You can also use the spread operator to create a new array with a new element at the beginning as shown below.
This approach is common in React codebases.

```javascript
const array1 = [1, 2, 3];

[0, ...array1]; // returns [0, 1, 2, 3]
```

The `pop()` functions removes the last element from the array it is called upon and returns the popped element.

```javascript
const array = [1, 2, 3, 4, 5, 6];
array.pop(); // 6;
array; // 1, 2, 3, 4, 5
```

This function shortens the length of the array and returns `undefined` if the array is empty, similarly to [`shift()`](/tutorials/fundamentals/shift).

```javascript
const array = [1, 2, 3, 4, 5, 6];

array.length; // 6
array.pop(); // 6;
array; // 1, 2, 3, 4, 5
array.length; // 5

const emptyArray = [];
emptyArray.pop(); // undefined
emptyArray.length; // 0
```
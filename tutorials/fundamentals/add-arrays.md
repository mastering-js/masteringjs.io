To add 2 arrays together in JavaScript, use the `concat()` function.

```javascript
const array = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = array.concat(array2); // [1, 2, 3, 4, 5, 6]
```

## push() with ... spread operator

Another path you could take is to use the spread operator in combination with the `push()` function.
This would negate the need to create a new variable to store the result.
The downside would be that whatever array you called `push()` on would be changed.

```javascript
const array = [1, 2, 3];
const array2 = [4, 5, 6];
array.push(...array2); // [1, 2, 3, 4, 5, 6]
```
**Note:** Something to be mindful about with this approach is that if the array you are using as an argument to push is too large, it can throw a stack overflow error.

## using immutable patterns

Instead of using `push()` and the spread operator, you can just use the spread operator like so:

```javascript
const array = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = [...array, ...array2]; // [1, 2, 3, 4, 5, 6]
```
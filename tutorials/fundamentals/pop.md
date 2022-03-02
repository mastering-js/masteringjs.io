The `pop()` functions removes the last element from the array and returns the popped element.
This function reduces the length of the array by 1.

```javascript
const array = [1, 2, 3, 4, 5, 6];
array.pop(); // 6;
array; // 1, 2, 3, 4, 5
```

`pop()` returns `undefined` if the array is empty, like [`shift()`](/tutorials/fundamentals/shift).

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

## Using an Array as a Stack

Here's an example of using an array as a stack to reverse an array.

```javascript
const stack = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const OtherStack = [];
while(stack.length) {
    OtherStack.push(stack.pop());
}
OtherStack; // 10, 9, 8, 7, 6, 5, 4, 3, 2, 1



```

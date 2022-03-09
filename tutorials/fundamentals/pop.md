The `pop()` functions removes the last element from the array and returns the popped element.
This function reduces the length of the array by 1, unless the array is empty.

```javascript
const array = [1, 2, 3, 4, 5, 6];
array.pop(); // 6;
array; // 1, 2, 3, 4, 5
```

`pop()` returns `undefined` if the array is empty, like [`shift()`](/tutorials/fundamentals/shift).
If the array is empty, `pop()` does not modify the length of the array.

```javascript
const array = [1, 2, 3, 4, 5, 6];

array.length; // 6
array.pop(); // 6;
array.length; // 5

const emptyArray = [];
emptyArray.pop(); // undefined
emptyArray.length; // 0
```

## Using an Array as a Stack

When used with [`shift()`](/tutorials/fundamentals/push), `pop()` makes it easy to use an array as a [stack](https://en.wikipedia.org/wiki/Stack_\(abstract_data_type\)).
For example, here's how you can use an array as a stack when traversing a binary tree using depth-first search _without_ recursion.

```javascript
const tree = {
  left: {
    left: 'A',
    right: 'B'
  },
  right: {
    left: 'C'
  }
};

function traverse(tree) {
  const stack = [tree];
  let cur = tree;

  while (stack.length > 0) {
    const el = stack.pop();
    if (typeof el !== 'object') {
      if (el != null) {
        console.log(el);
      }
      continue;
    }

    stack.push(el.right);
    stack.push(el.left);
  }
};

// Prints "A B C"
traverse(tree);
```

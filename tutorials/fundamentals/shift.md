The `shift()` function removes the first element from an array and returns the removed element.
As a result, the length of the array changes as well.

```javascript
const array = [1, 2, 3, 4, 5];
array.shift(); // 1
array; // 2,3,4,5
```

If the array is empty, `shift()` will return `undefined` and not modify the array.

```javascript
const array = [];
array.shift(); // undefined
```

`shift()`, in combination with `push()`, can be used to make an array act like a queue as shown below.

```javascript
const array = [];

function next(array) {
  return array.shift();
}

function enqueue(array, val) {
  array.push(val);
}

enqueue('First');
enqueue('Second');

next(); // 'First'
array; // ['Second']
next(); // 'Second'
```

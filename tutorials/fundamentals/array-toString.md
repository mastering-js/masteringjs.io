To [convert an array to a string in JavaScript](/tutorials/fundamentals/array-to-string), you can use the [`toString()`](/tutorials/fundamentals/tostring) method.
The `toString()` method returns the elements of the array as a single string _without_ square brackets `[` and `]`.

```javascript
const array = [1,2,3,4,5];

array.toString(); // "1,2,3,4,5"
```

The `toString()` method works well for arrays of primitives, but doesn't work well for arrays of objects.
By default, `toString()` will convert [POJO](/tutorials/fundamentals/pojo) elements into `[object Object]`.

```javascript
let obj = {a:1, b:2,c:3};
let array = [];

for (let i = 0; i < 3; i++) {
  array.push(obj);
}

array.toString(); // '[object Object],[object Object],[object Object]'
```

However, `toString()` is recursive, so instances of [classes](/tutorials/fundamentals/class) with custom `toString()` methods work.

```javascript
class MyObject {
  toString() {
    return 'test';
  }
}

[new MyObject(), new MyObject()].toString(); // 'test,test'
```

## Printing an Array in Node

In Node.js, you can import the `util` module and use the `inspect()` function.
This function will print the raw array as a string as shown below:

```javascript
const array = [1,2,3,4,5];
const {inspect} = require('util');

inspect(array); // [1,2,3,4,5]

```

When dealing with an array of objects, it prints the result in an easier to read format over `toString()`.

```javascript
const {inspect} = require('util')

let obj = {a:1, b:2,c:3};
let array = [];

for (let i = 0; i < 3; i++) {
  array.push(obj);
}

inspect(array);
/*
[ { a: 1, b: 2, c: 3 },
  { a: 1, b: 2, c: 3 },
  { a: 1, b: 2, c: 3 } ]
  */
```
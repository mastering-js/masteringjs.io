To print an array in JavaScript, you can use the `toString()` method.
The `toString()` method simply prints the elements of the array as a single string.

```javascript
const array = [1,2,3,4,5];

array.toString(); // "1,2,3,4,5"
```

## Printing an Array in Node

When using node.js, you must import the `util` module and use the `inspect()` function.
This function will print the raw array as a string as shown below:

```javascript
const array = [1,2,3,4,5];
const {inspect} = require('util');

inspect(array); // [1,2,3,4,5]
typeof inspect(array); // string

```

## Printing an Array Using JSON.stringify()

An alternative to using the `toString()` method is the `JSON.stringify()` method.
The difference is that it will print the raw array as a string whereas `toString()` will print the contents as a string.

```javascript
const array = [1,2,3,4,5];

JSON.stringify(array); // "[1,2,3,4,5]"
```
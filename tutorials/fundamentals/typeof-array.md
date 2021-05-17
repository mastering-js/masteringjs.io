You shouldn't use the [`typeof` operator](/tutorials/fundamentals/typeof) to check whether a value is an [array](http://thecodebarbarian.com/the-80-20-guide-to-javascript-arrays.html), because `typeof` cannot distinguish between arrays and objects.
Instead you should use `Array.isArray()`, because `typeof` would return `'object'`, not `'array'`.

```javascript
let array = [1,2,3,4];
typeof array; // `object`
```

`Array.isArray()` takes one parameter and will return true only
if the given value is an array. Anything else will return false.
You can also use `instanceof` to determine if a value is an array,
however, `Array.isArray()` is fullproof as `instanceof` will
not return true on an iframe.

```javascript
let array = [1,2,3,4];
Array.isArray(array); // true
```

**Note:** ES6 introduced the ability to [subclass `Array`](http://thecodebarbarian.com/the-80-20-guide-to-javascript-arrays.html#subclassing-the-array-class), like `class CustomArray extends Array {}`.
The good news is that `Array.isArray()` will return `true` for any object that `extends Array`.

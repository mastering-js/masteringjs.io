Arrays are a special case when using the `typeof` operator.
To determine if an array is an array using `typeof`, you don't.
Instead you should use `Array.isArray()`. The reason why is that
if you were to use `typeof`, it would return `'object'`, not `'array'`.

```javascript
let array = [1,2,3,4];
typeof array; // `object`
```

`Array.isArray()` takes one parameter and will return true only
if the given value is an array. Anything else will return false.
You can also use `instanceof` to determine if a value is an array,
however, `Array.isArray()` is more fullproof as `instanceof` will
not return true on an iframe.

```javascript
let array = [1,2,3,4];
Array.isArray(array); // true
```

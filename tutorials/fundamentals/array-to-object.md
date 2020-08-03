In JavaScript, [arrays are technically objects](http://thecodebarbarian.com/the-80-20-guide-to-javascript-arrays.html).

```javascript
const arr = ['hello', 'world'];

arr instanceof Object; // true
```

For example, you can use `Object.keys()` and `Object.entries()` to get all the array's keys.

```javascript
Object.keys(arr); // ['0', '1']
Object.entries(arr); // [ [ '0', 'hello' ], [ '1', 'world' ] ]
```

However, sometimes it is convenient to convert an array into a [POJO](/tutorials/fundamentals/pojo).
The easiest way to do that is using `Object.assign()`:

```javascript
const obj = Object.assign({}, arr);

obj instanceof Object; // true
Array.isArray(obj); // false

obj; // { '0': 'hello', '1': 'world' }
```
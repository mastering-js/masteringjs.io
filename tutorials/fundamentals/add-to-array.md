JavaScript arrays have 3 methods for adding an element to an array:

- [`push()`](https://www.w3schools.com/jsref/jsref_push.asp) adds to the end of the array
- [`unshift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) adds to the beginning of the array
- [`splice()`](/tutorials/fundamentals/array-splice) adds to the middle of the array

Below are examples of using `push()`, `unshift()`, and `splice()`.

```javascript
[require:Fundamentals array append push$]
```

```javascript
[require:Fundamentals array append unshift$]
```

```javascript
[require: Array#splice.*add]
```

These methods modify the array _in place_, which means they modify `arr` rather than creating a [copy of `arr`](/tutorials/fundamentals/copy-array).
You can also use the [spread operator](https://thecodebarbarian.com/object-assign-vs-object-spread.html) and other [immutable methods](/tutorials/fundamentals/array-append#immutable-methods) that create a new array and leave `arr` unmodified.

```javascript
[require:Fundamentals array append concat$]
```

Setting an Index Directly
-------------------------

If you're adding an element to the end of the array, you don't necessarily have to use `push()`.
You can just set the array index, and JavaScript will update the array's length for you.

```javascript
[require:Fundamentals array append direct set]
```

JavaScript does **not** throw an error if you set an out of bounds array index.
For example, if your array has length 3 and you set index `4`, JavaScript will just grow your array by adding a [hole in the array](https://2ality.com/2015/09/holes-arrays-es6.html).

```javascript
const arr = ['a', 'b', 'c'];

arr[4] = 'e';

arr.length; // 5
arr; // [ 'a', 'b', 'c', <1 empty item>, 'e' ]
```

Avoiding Duplicates
-------------------

The easiest way to avoid adding duplicates to an array is to [check if the array contains the given value](/tutorials/fundamentals/includes) before adding it.

```javascript
const arr = ['a', 'b', 'c'];

addWithoutDuplicates(arr, 'a'); // ['a', 'b', 'c']
addWithoutDuplicates(arr, 'd'); // ['a', 'b', 'c', 'd']

function addWithoutDuplicates(arr, el) {
  if (arr.includes(el)) {
    return arr;
  }
  arr.push(el);
  return arr;
}
```

Using `includes()` works, but can cause performance issues because `includes()` scans through the entire array every time you call it.
So the below loop is `O(n^2)`.

```javascript
const arrWithoutDuplicates = [];
for (let i = 0; i < arr.length; ++i) {
  if (arrWithoutDuplicates.includes(arr[i])) {
    continue;
  }
  arrWithoutDuplicates.push(arr[i]);
}
```

Instead, we recommend using a [JavaScript set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) to represent a collection of objects where every element should be unique.

```javascript
const set = new Set(['a', 'b', 'c']);

set.add('a');
set; // Set(3) { 'a', 'b', 'c' }

set.add('d');
set; // Set(4) { 'a', 'b', 'c', 'd' }
```
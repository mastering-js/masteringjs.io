JavaScript arrays have a [`push()` method](https://www.w3schools.com/jsref/jsref_push.asp) that add one or more elements to the end of an array.

```javascript
[require:Fundamentals array append push$]
```

Append to the Beginning
-----------------------

The `push()` function adds a new element to the end of the array. To add elements
to the beginning, you should use the [`unshift()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift).

```javascript
[require:Fundamentals array append unshift$]
```

Append to Middle
----------------

To append an element to somewhere other than the beginning or end of the array,
use the [`splice()` method](/tutorials/fundamentals/array-splice).

```javascript
[require: Array#splice.*add]
```

Immutable Methods
-----------------

Some frontend apps (often apps built with [React](https://reactjs.org/docs/update.html#overview)) rely on immutability for faster comparisons of large objects.
The `push()`, `unshift()`, and `splice()` methods modify the array in place, so
you can't use them in apps where immutability is a concern.

To add elements to the end or beginning of the array, you can use the [`concat()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat):

```javascript
[require:Fundamentals array append concat$]
```

Another common pattern is using the [spread operator](https://thecodebarbarian.com/object-assign-vs-object-spread.html).

```javascript
[require:Fundamentals array append spread$]
```
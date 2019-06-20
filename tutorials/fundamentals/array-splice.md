The [`Array#splice()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) lets you modify an array in-place by adding and removing elements. It is most commonly used to remove elements from an array, but it can also be used to add elements to the middle of an array.

Remove Elements
---------------

The `splice()` function is the **only** native array function that lets you remove elements from the middle of the array without creating a new array. For example, suppose you had an array `['a', 'b', 'c', 'd']`. Here's how you would remove 'c' using `splice()`:

```javascript
[require: Array#splice.*remove]
```

The first 2 parameters to `splice()` are called `start` and `deleteCount`. The `start` parameter tells `splice()` where to start modifying the array. The `deleteCount` parameter tells `splice()` how many elements to delete.

You may see JavaScript projects use [`filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) instead of `splice()` to remove elements from an array. The key difference between these two approaches is that `filter()` creates a new array. This means `filter()` is the better choice for applications that rely on immutability, like [React](https://www.npmjs.com/package/react) apps.

```javascript
[require: Array#splice.*vs filter]
```

Adding Elements to the Middle
-----------------------------

The `splice()` function also lets you add elements to the middle of the array. JavaScript arrays have a [`push()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) that lets you add elements to the end of the array, and an [`unshift()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) that lets you add elements to the beginning of the array. The `splice()` function is the only native array function that lets you add elements to the middle of an array.

For example, suppose you have an array `['a', 'b', 'd']` and you want to add 'c' after 'b'. Every [parameter to `splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice#Parameters) after the `deleteCount` parameter is treated as an element to add to the array at the `startIndex`. So to insert 'c', you call `splice()` with a `deleteCount` of 0 and 'c' as the third parameter.

```javascript
[require: Array#splice.*add]
```
The [`Array#forEach()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) is a common tool tool to iterate through arrays. However, with the help of some other language features, `forEach()` can do a lot more than just print every value in an array. In this tutorial, you'll see 10 examples demonstrating common patterns with `forEach()`.

Example 1: The Basics
---------------------

The `forEach()` function's first parameter is a callback function that JavaScript executes for every element in the array.

```javascript
[require:Fundamentals.*forEach.*example 1]
```

Example 2: Modifying the Array
------------------------------

Generally speaking, you shouldn't modify the array using `forEach()`. If you want to modify the array, you should use [`Array#map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) instead. But it is possible to modify the array using `forEach()`, and you may run into code that does so. Here's an example of converting each array element to upper case using `forEach()`.

```javascript
[require:Fundamentals.*forEach.*example 2]
```

Example 3: Object Keys
----------------------

The [`Object.keys()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) returns an array that contains an object's keys. If you want to iterate through an object's keys using `forEach()`, you should use `Object.keys()`.

```javascript
[require:Fundamentals.*forEach.*example 3]
```

Example 4: Object Keys and Values
---------------------------------

You can iterate through an object's keys using `forEach()` and `Object.keys()`. But what about iterating through both keys and values simultaneously? That's what the [`Object.entries()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) is for. Given an object, `Object.entries()` returns an array of `[key, value]` pairs.

```javascript
[require:Fundamentals.*forEach.*example 4]
```

Example 5: Nested Arrays and `flat()`
----------------------------------------

The `forEach()` function will iterate through the top-level array. If you have arrays of arrays, you need to use [`Array#flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) to flatten nested arrays first.

```javascript
[require:Fundamentals.*forEach.*example 5]
```

Example 6: Adding Elements to the Array
---------------------------------------

The `forEach()` function sets the elements that will be called before calling your callback for the first time. In other words, if you add elements to the array in your `forEach()` callback, JavaScript will **not** call your callback on the new elements. No need to worry about causing an infinite loop by adding elements to your array in your `forEach()` callback.

```javascript
[require:Fundamentals.*forEach.*example 6]
```

Example 7: `thisArg`
--------------------

The `forEach()` function actually takes 2 parameters, `callback` and `thisArg`. The `thisArg` function lets you set the value of `this` in your `callback`. The `thisArg` argument is handy for functions that rely on `this`, like the `Stack` class in the below example.

```javascript
[require:Fundamentals.*forEach.*example 7]
```

Example 8: Array Holes
----------------------

JavaScript arrays have some quirks. Specifically, the array `['a',, 'c']` is different than the array `['a', undefined, 'c']`, even though `arr[1] === undefined` in both cases. In `['a',, 'c']`, `arr[1]` is called an ["array hole"](http://2ality.com/2015/09/holes-arrays-es6.html).

The `forEach()` function skips array holes. To get `forEach()` to treat array holes as `undefined`, you first need to [get rid of array holes using `Array.from()`](http://2ality.com/2015/09/holes-arrays-es6.html#arrayfrom).

```javascript
[require:Fundamentals.*forEach.*example 8]
```

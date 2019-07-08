Given a [JavaScript array](http://thecodebarbarian.com/the-80-20-guide-to-javascript-arrays.html), there are two built-in array methods you can use to determine whether the array contains a given element. Suppose you have a simple array with 3 elements:

```javascript
const arr = ['A', 'B', 'C'];
```

To determine whether `arr` contains the string `'B'`, you can use [`Array#includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) or [`Array#indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf).

`includes()`
------------

The `Array#includes()` function was [introduced in ECMAScript 2016](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Specifications). It takes a parameter `valueToFind`, and returns `true` if some element in the array is equal to `valueToFind`.

```javascript
[require:Array#includes.*basic example]
```

The `Array#includes()` function checks for equality using the same 
semantics as the `===` operator (no type coercion), with the exception
of `NaN`. The `Array#includes()` function will find `NaN` in an array. The technical term for this equality check is [`sameValueZero`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Same-value-zero_equality).

```javascript
[require:Array#includes.*NaN]
```

`indexOf()`
-----------

The [`Array#indexOf()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) is a common alternative to `includes()`. The `indexOf()` function returns the first index in the array at which it found `valueToFind`, or `-1` otherwise.

```javascript
[require:Array#indexOf.*basic example]
```

To check whether `arr` contains `v`, you would use `arr.indexOf(v) !== -1`. In
some codebases, you may see `~arr.indexOf(v)` instead, where `~` is the
[JavaScript bitwise NOT operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#\(Bitwise_NOT\)).

Given an integer `v`, `~v === -(v + 1)`, so `~v === 0` only if `v === -1`. This is a handy trick to avoid having to write out `!== -1`.
However, using bitwise NOT is generally bad practice because it sacrifices
readability to save 4 characters.

```javascript
[require:Array#indexOf.*bitwise NOT]
```

Unlike `Array#includes()`, `Array#indexOf()` uses the same semantics as the `===`
operator to check for equality. In other words, `Array#indexOf()` cannot find
`NaN` in an array.

```javascript
[require:Array#indexOf.*NaN]
```

`Array#includes()` is generally the better choice, because you don't need to type out `!== -1` and because it has slightly better equality semantics. But since `Array#includes()` was introduced in ES2016, it is [not supported in any version of Internet Explorer](https://caniuse.com/#feat=array-includes) or Node.js versions before 6.0.0. If you use `Array#includes()`, make sure you add a [polyfill for older browsers](https://www.npmjs.com/package/array-includes).
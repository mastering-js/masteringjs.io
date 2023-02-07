Converting a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) to an [Array](https://thecodebarbarian.com/the-80-20-guide-to-javascript-arrays.html) is convenient for using array methods that aren't on sets, like [`filter()`](/tutorials/fundamentals/filter) or [`reduce()`](https://thecodebarbarian.com/javascript-reduce-in-5-examples.html).
The most concise way to convert a Set to an array is using the [spread operator](/tutorials/fundamentals/spread) as follows.

```javascript
const set = new Set(['a', 'b', 'c']);

[...set]; // ['a', 'b', 'c']

[...set].map(c => c.toUpperCase()); // ['A', 'B', 'C']
```

You Usually Don't Need to Convert a Set to an Array
-----------------------------------

You may convert sets to arrays for helpers like `filter()` and `map()`.
But keep in mind that `for/of`, which [we recommend for iterating over an array](/tutorials/fundamentals/array-iterate), also works with sets.

```javascript
const set = new Set(['a', 'b', 'c']);

for (const char of set) {
  console.log(char); // Prints "a", "b", "c"
}
```

Alternative: Use `Array.from()`
----------------

The [spread operator has pretty good browser compability](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#browser_compatibility).
However, if you need to support older browsers, you may consider using the [`Array.from()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from), which is easier to polyfill.

```javascript
const set = new Set(['a', 'b', 'c']);

Array.from(set); // ['a', 'b', 'c']

Array.from(set).map(c => c.toUpperCase()); // ['A', 'B', 'C']
```
The [`flatMap()` method on JavaScript arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) combines [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and [`flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) into one call.

`flatMap()` takes a `callback` parameter and calls `callback()` on every element in the array.
If `callback` returns some value that is not an array, then `flatMap()` behaves identically to `map()`, adding the returned value to the result array.

```javascript
const arr = ['a', 'b', 'c'];

arr.flatMap(function callback(el) {
  return el.toUpperCase();
}); // ['A', 'B', 'C']
```

If `callback` returns an array, then `flatMap()` "flattens" that array and adds each element from the returned value to the result array.

```javascript
const arr = [
  { title: 'Intro to JavaScript Arrays', tags: ['fundamentals', 'arrays'] },
  { title: 'Intro to Mongoose Arrays', tags: ['mongoose', 'arrays'] }
];

arr.flatMap(el => el.tags); // ['fundamentals', 'arrays', 'mongoose', 'arrays']
```

In the above example, `flatMap()` would be useful for [removing duplicates from an array of arrays](/tutorials/fundamentals/distinct-values-in-array-javascript):

```javascript
const arr = [
  { title: 'Intro to JavaScript Arrays', tags: ['fundamentals', 'arrays'] },
  { title: 'Intro to Mongoose Arrays', tags: ['mongoose', 'arrays'] }
];

// Remove duplicate `tags` entries
[...new Set(arr.flatMap(el => el.tags)]; // ['fundamentals', 'arrays', 'mongoose']
```

Combining `map()` and `filter()`
-----------------------------------

Another neat trick with `flatMap()` is you can [combine `map()` and `filter()`](/tutorials/fundamentals/map-filter) into one function call.
If your `flatMap()` callback returns an empty array, `flatMap()` won't add anything to the result array.

```javascript
const numbers = [1, 2, 3, 4, 5];

// [1, 3, 5]
arr.flatMap(function filterEvenNumbers(num) {
  if (num % 2 === 0) {
    // returning empty array means `flatMap()` will skip this value
    return [];
  }
  return num;
});
```
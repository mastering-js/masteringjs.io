Suppose you have an array with duplicate values:

```javascript
const arr = ['a', 'b', 'c', 'c', 'b'];
```

To get an array that contains just the distinct values in `arr`, you can first convert `arr` to a `Set` and then [convert that Set to an array](/tutorials/fundamentals/set-to-array).

```javascript
const deduped = [...new Set(arr)]; // ['a', 'b', 'c']
```

Note that JavaScript Sets check for equality based on [SameValueZero equality](/tutorials/fundamentals/equality).
So using the `new Set()` approach will only work for arrays of primitive values, not arrays of objects.

Deduping Arrays of Arrays
-----------------------

Suppose you have an array of objects which contain some arrays.

```javascript
const blogPosts = [
  {
    title: 'Distinct Array Values in JavaScript',
    tags: ['fundamentals', 'arrays']
  },
  {
    title: 'Arrays in Mongoose',
    tags: ['arrays', 'mongoose']
  }
];
```

How do you get all distinct values of `tags`?
Turns out you can use the above `Set` approach, combined with [JavaScript's built-in array `flatMap()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap).
`flatMap()` behaves like `map()`, but it also "flattens" out any arrays that your function returns.

```javascript
const tags = [...new Set(blogPosts.flatMap(blogPost => blogPost.tags))];
tags; // ['fundamentals', 'arrays', 'mongoose']

// ['fundamentals', 'arrays', 'arrays', 'mongoose']
blogPosts.flatMap(blogPost => blogPost.tags);
```
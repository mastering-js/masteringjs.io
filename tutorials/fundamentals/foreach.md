JavaScript's [`Array#forEach()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) is one of several ways to [iterate through a JavaScript array](/tutorials/fundamentals/array-iterate). It is generally considered one of the ["functional programming" methods](https://www.telerik.com/blogs/functional-programming-with-javascript-object-arrays) along with [`filter()`](/tutorials/fundamentals/filter), `map()`, and [`reduce()`](http://thecodebarbarian.com/javascript-reduce-in-5-examples.html).

Getting Started
---------------

The `forEach()` method takes a parameter `callback`, which is a function
that JavaScript will execute on every element in the array.

```javascript
[require:Fundamentals.*forEach.*example 1]
```

JavaScript calls your `callback` with 3 parameters: `currentValue`, `index`, and
`array`. The `index` parameter is how you get the [current array index with `forEach()`](/tutorials/fundamentals/foreach-index).

```javascript
// Prints "0: a, 1: b, 2: c"
['a', 'b', 'c'].forEach(function callback(value, index) {
  console.log(`${index}: ${value}`);
});
```

Caveats
-------

There are some common gotchas when working with `forEach()`. Here's a few of them:

### 1. With Async/Await

You should **not** use async/await within a `forEach()` callback. Because a `forEach()`
callback is a separate function, you can't use `await` without making the callback
`async`.

```javascript
async function test(arr) {
  arr.forEach(val => {
    // Syntax error because you're using `await` within a synchronous function.
    await val;
  });
}
```

You might be tempted to make your `forEach()` callback async. But that would be
a mistake, because then you'll get unhandled promise rejections because there's
no way to handle errors.

```javascript
async function test(arr) {
  try {
    arr.forEach(async (val) => {
      await new Promise(resolve => setTimeout(resolve, 0));
      // Unhandled promise rejection because `forEach()` doesn't return
      // a promise, so there's no way to `await`.
      throw new Error('Oops!');
    });
  } catch (err) {
    // Does not execute
  }
}
```

### 2. Doesn't Work on `arguments` or Iterables

`forEach()` is a method on JavaScript arrays, so you can't use it with array-like
values, like [function arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) or [iterables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators).

If you want to use `forEach()` with `arguments` or iterables, use `Array.from()`
to convert to a fully fledged array first.

```javascript
[require:Fundamentals forEach with arguments and iterators$]
```

### 3. Can't use `break` or `continue`

The `forEach()` method is a plain old JavaScript function, which means you
can't use looping constructs like [`break`](/tutorials/fundamentals/foreach-break) or [`continue`](/tutorials/fundamentals/foreach-continue).

There are workarounds, but
we recommend using `slice()` and `filter()` to filter out values you don't want
`forEach()` to execute on. Filtering out unwanted elements is more idiomatic
functional programming because it enables easier [composition](/fundamentals/map-filter) and minimizes [branching](https://stackoverflow.com/questions/35034977/what-is-a-branch-in-code-coverage-for-javascript-unit-testing).

```javascript
// Prints "1, 2, 3"
const arr = [1, 2, 3, 4, 5];

// Instead of trying to `break`, slice out the part of the array that `break`
// would ignore.
arr.slice(0, arr.findIndex(v => v > 3)).forEach(v => {
  console.log(v);
});
```

```javascript
// Instead of trying to `continue`, filter out unwanted elements
[1, 2, 3, 4, 5].filter(v => v % 2 === 0).forEach(v => {
  console.log(v);
});
```
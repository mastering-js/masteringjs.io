You should **not** make the callback function parameter in `forEach()` an async function because there's no way to handle errors.

```javascript
// Unhandled promise rejection!
[1, 2, 3].forEach(async() => {
  await new Promise(resolve => setTimeout(resolve, 10));
  throw new Error('Oops!');
});
```

Instead of using `arr.forEach(myAsyncFunction)`, you should use `Promise.all(arr.map(myAsyncFunction))`, which lets you catch errors.

```javascript
Promise.
  all([1, 2, 3].map(async() => {
    await new Promise(resolve => setTimeout(resolve, 10));
    throw new Error('Oops!');
  })).
  catch(err => {
    err.message; // Oops!
  });
```

## Parallel vs Series

Using `Promise.all(arr.map(myAsyncFunction))` executes `myAsyncFunction` on all elements of `arr` in _parallel_ rather than in _series_.
To execute `myAsyncFunction` on all elements of `arr` in series, you should use a `for/of` loop.
[We recommend using `for/of` rather than `forEach()` for iterating over arrays in general](/tutorials/fundamentals/array-iterate).

```javascript
for (const el of arr) {
  await myAsyncFunction(el);
}
```

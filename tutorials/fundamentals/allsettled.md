`Promise.allSettled()` is similar to `Promise.all()` with two key differences:

- `allSettled()` will resolve regardless of whether one of the promises was rejected
- `allSettled()` will return an array of objects, as opposed to an array, that contain the `{status, value, reason}` that describes
whether each promise was fulfilled or rejected.

## Return Value

`allSettled()` will contain an array of objects that contain either `{status, value}` on a success or `{status, reason}` on a rejection.

```javascript
await Promise.allSettled([Promise.resolve('Hello World'), Promise.reject('fail')]);
// [{ status: "fulfilled", value: "Hello World" }, Object { status: "rejected", reason: "fail" }]
```

## Browser Support

`allSettled()` is not supported in Internet Explorer and Node.js versions below 12.9.
However, you can use `Promise.all()` for environments that do not support `allSettled()` as shown below:

```javascript
function allSettled(promises) {
  return Promise.all(promises.map(p => p.then(value => ({ status: 'fulfilled', value })).catch(reason => ({ status: 'rejected', reason })));
}
```

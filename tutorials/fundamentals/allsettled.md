`Promise.allSettled()` is similar to `Promise.all()` with two key differences:

- `allSettled()` will resolve regardless if one of the promises threw an error
- `allSettled()` will return an array of objects, as opposed to an array, that contain the `{status, value, reason}` that describes
whether each promise was fulfilled or rejected so long as it is not given an empty iterable, in which case it returns a `Promise` object that has already been resolved as an empty array.

## Return Value

`allSettled()` will contain an array of objects that contain either `{status, value}` on a success or `{status, reason}` on a rejection.

```javascript
Promise.allSettled([Promise.resolve('Hello World'), Promise.reject('fail')]);
// [{ status: "fulfilled", value: "Hello World" }, Object { status: "rejected", reason: "fail" }]
```

## Browser Support
`allSettled()` is not supported in Internet Explorer and Node.js versions below 12.9.

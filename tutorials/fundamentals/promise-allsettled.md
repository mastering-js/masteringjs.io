[`Promise.allSettled()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) is similar to [`Promise.all()`](/tutorials/fundamentals/promise-all) with two key differences:

- `allSettled()` will resolve regardless of whether one of the promises was rejected
- `allSettled()` will return an array of objects, as opposed to an array, that contain the `{status, value, reason}` that describes whether each promise was fulfilled or rejected.

Recall that a [promise is a state machine with 3 states](/tutorials/fundamentals/promise#promises-as-state-machines):

1. **Pending** The operation is in progress.
2. **Fulfilled** The operation completed successfully.
3. **Rejected** The operation experienced an error.

<img src="https://codebarbarian-images.s3.amazonaws.com/promise.png" class="inline-image" style="width: 400px">

"Settled" means the promise is either fulfilled or rejected, so you can think of `allSettled()` as waiting for all the promises in the array to become settled.

## Return Value

`allSettled()` will contain an array of objects that contain either `{status: 'fulfilled', value}` if the promise was fulfilled or `{status: 'rejected', reason}` if the promise was rejected.

```javascript
// [{ status: "fulfilled", value: "Hello World" }, { status: "rejected", reason: "fail" }]
const res = await Promise.allSettled([Promise.resolve('Hello World'), Promise.reject('fail')]);
```

To check if any promise was rejected, you can use the [`Array#find()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find):

```javascript
res.find(({ status }) => status === 'rejected');
```

## Browser Support

`allSettled()` is not supported in Internet Explorer and Node.js versions below 12.9.
However, you can use `Promise.all()` for environments that do not support `allSettled()` as shown below:

```javascript
function allSettled(promises) {
  const _promises = promises.map(p => {
    return p.
      then(value => ({ status: 'fulfilled', value })).
      catch(reason => ({ status: 'rejected', reason });
  });
  return Promise.all(_promises);
}
```

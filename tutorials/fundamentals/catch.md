[Promises in JavaScript](/tutorials/fundamentals/promise) are an object
representation of an asynchronous operation. Promises are like
a placeholder for some value that may not have been computed yet.
If the async operation failed, JavaScript will [reject the promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject). The `catch()` function tells JavaScript what function to call if the promise is rejected:

```javascript
[require:Fundamentals Promise catch basic example$]
```

With Promise Chaining
---------------------

The major benefit of `.catch()` is that you can catch errors that
occurred anywhere in a [promise chain](/tutorials/fundamentals/then#chaining).

```javascript
[require:Fundamentals Promise catch with chain$]
```

This means you only need one `catch()` at the end of a promise chain
to handle any errors that occur in the promise chain!

Rethrow Errors
--------------

You can rethrow errors in `.catch()`, similar to [rethrowing with `try/catch`](https://www.webucator.com/how-to/how-rethrow-an-exception-java.cfm).

```javascript
[require:Fundamentals Promise catch rethrow$]
```

This also means you should be very careful about uncaught errors in your
`.catch()` error handlers. If the function you pass to `.catch()` throws
and you don't have another `.catch()` afterward, you'll get an [unhandled promise rejection](https://thecodebarbarian.com/unhandled-promise-rejections-in-node.js.html).

Unwrapping Errors
-----------------

If your `.catch()` returns a value, you can "unwrap" that value with
`await` or `then()`.

```javascript
[require:Fundamentals Promise catch unwrap$]
```

In other words, you can handle [async errors in JavaScript using Golang-like syntax](http://thecodebarbarian.com/async-await-error-handling-in-javascript.html#golang-in-js).

```javascript
[require:Fundamentals Promise catch golang in js$]
```

Versus `then()`
---------------

The `catch()` function is just a thin layer of syntactic sugar on
top of the [Promise `then()` function](/tutorials/fundamentals/then).
Recall that `then()` takes 2 parameters:

- `onFulfilled()`: JavaScript will call this function if the underlying async operation succeeded.
- `onRejected()`: JavaScript will call this function if the underlying async operation failed.

So `.catch(fn)` is the same thing as `.then(null, fn)`. In other words, below is a one-line polyfill for `catch()`:

```javascript
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};
```

That means you can handle promise errors with `.then()` as well:

```javascript
[require:Fundamentals Promise catch with then$]
```
[Promises in JavaScript](/tutorials/fundamentals/promise) are an object
representation of an asynchronous computation. You can think of a promise as
a placeholder for a value that hasn't been computed yet. However, there's no way
to get a promise's value from the promise directly - you need to call the
`then()` function to register a [callback](/tutorials/fundamentals/callbacks)
that JavaScript will call when the value is computed.

```javascript
[require:Fundamentals.*Promise.*associated value$]
```

The `then()` Function's Parameters
----------------------------------

The `then()` function takes 2 callback function parameters:

- `onFulfilled()`: JavaScript will call this function if the underlying async operation succeeded.
- `onRejected()`: JavaScript will call this function if the underlying async operation failed.

Recall that a [promise is a state machine with 3 states](/tutorials/fundamentals/promise#promises-as-state-machines):

1. **Pending** The operation is in progress.
2. **Fulfilled** The operation completed successfully.
3. **Rejected** The operation experienced an error.

<img src="https://codebarbarian-images.s3.amazonaws.com/promise.png" class="inline-image" style="width: 400px">

A promise always starts out in the pending state. If the promise transitions
to the fulfilled state, JavaScript calls the `onFulfilled()` function. If you
call `then()` on a promise that is already fulfilled, JavaScript will
immediately call `onFulfilled()`.

```javascript
[require:Fundamentals.*Promise.*constructor$]
```

If the promise transitions to the rejected state, or if you call `then()` on
a promise that is already rejected, JavaScript calls `onRejected()`.

```javascript
[require:Fundamentals.*Promise.*associated error$]
```

Both `onFulfilled()` and `onRejected()` are optional. If `onFulfilled()` is
[`null`](/tutorials/fundamentals/null) like in the above example, JavaScript will do nothing if the promise is
fulfilled. If you call `.then()` without an `onRejected()` function and the
promise rejects, that will lead to an [unhandled rejection error message](https://thecodebarbarian.com/unhandled-promise-rejections-in-node.js.html).

`then()` vs `catch()`
---------------------

[The `Promise#catch()` function in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) is a convenient shorthand for `.then()`. Calling `.catch(onRejected)` is
syntactic sugar for `.then(null, onRejected)`.

```javascript
[require:Fundamentals.*Promise.*catch$]
```

Although `.catch()` isn't complicated under the hood, the name `catch` is
valuable because you can think of `.catch()` as the promise analog to the
[`catch` part of `try/catch`](https://www.w3schools.com/js/js_errors.asp).
When you're scanning promise based code, seeing `.catch()` makes it easy to
identify error handling.

Chaining
--------

Promise chaining is one of the key reasons why promises are so useful. The
`then()` function returns a promise `p`, and if your `onFulfilled()` function
returns a promise `q`, `p` will [_adopt_](https://promisesaplus.com/#point-49)
the state of `q`.

```javascript
[require:Fundamentals.*Promise.*catch$]
```

Because of promise chaining, you don't need to catch errors in each individual
`then()`. If you put `catch()` at the end of your promise chain, any errors
in the promise chain will bypass the rest of the promise chain and go straight
to your `catch()` error handler.

```javascript
[require:Fundamentals.*Promise.*catch chain$]
```
In JavaScript, a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
is an object that represents an asynchronous operation. Promises have several
methods that let you register a [callback](/tutorials/fundamentals/callbacks)
that the JavaScript runtime will call when the operation succeeds or fails.

In the below example, the [Axios HTTP library](https://www.npmjs.com/package/axios) returns a promise. You can then use the [`then()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) to register a callback that JavaScript will call when the request succeeds.

```javascript
[require:Fundamentals.*Promise.*basic example$]
```

Promises as State Machines
--------------------------

You can think of a promise as a [state machine](https://en.wikipedia.org/wiki/Finite-state_machine) with 3 states:

1. **Pending** The operation is in progress.
2. **Fulfilled** The operation completed successfully.
3. **Rejected** The operation experienced an error.

<img src="https://codebarbarian-images.s3.amazonaws.com/promise.png" class="inline-image" style="width: 400px">

When a promise is created, it is always _pending_. Once a promise is fulfilled
or rejected, the promise is considered _settled_, and can no longer change state. The promise's state is a private property: given a promise, there is no 
easy way to tell what the promise's state currently is.

When a promise becomes settled, the JavaScript runtime calls any handler
functions that you registered using `.then()`. The `then()` function takes
2 parameters: `onFulfilled` and `onRejected`. JavaScript calls `onFulfilled()`
if the promise is fulfilled, or `onRejected()` if the promise is rejected.

```javascript
[require:Fundamentals.*Promise.*onFulfilled and onRejected$]
```

Values and Errors
-----------------

When a promise is fulfilled, JavaScript sets an associated value. The promise's 
value is also a private property. The only way to access it is via the `.then()` function.

```javascript
[require:Fundamentals.*Promise.*associated value$]
```

When a promise is rejected, JavaScript sets an associated error. The promise's
associated error is also a private property.

```javascript
[require:Fundamentals.*Promise.*associated error$]
```

You can learn more by [writing your own promise library from scratch](https://thecodebarbarian.com/write-your-own-node-js-promise-library-from-scratch.html).

The Promise Constructor
-----------------------

`Promise` is a built-in class in JavaScript. That means you can instantiate
a promise using `new Promise()`.

The promise constructor takes 1 parameter: a function called `executor`. The
`executor` function takes two parameters: callback functions `resolve()` and
`reject()`. As someone creating a new promise, you're responsible for writing
the `executor` function, and the JavaScript runtime is responsible for passing
you `resolve()` and `reject()`.

```javascript
[require:Fundamentals.*Promise.*constructor$]
```
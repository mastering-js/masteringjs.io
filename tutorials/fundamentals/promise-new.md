The [Promise constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) takes a single parameter, an `executor` function.
JavaScript then executes your `executor` function with 2
arguments: `resolve()` and `reject()`.

```javascript
function executor(resolve, reject) {
  typeof resolve; // 'function'
  typeof reject; // 'function'
}

new Promise(executor);
```

Your executor function is responsible for calling `resolve()` to mark
the promise as [_fulfilled_](/tutorials/fundamentals/promise#promises-as-state-machines) (successful) or _rejected_ (failed).

```javascript
[require:Fundamentals new Promise basic example$]
```

You can register an event listener for when a promise is fulfilled
or rejected using the [`then()` function](/tutorials/fundamentals/then).

```javascript
[require:Fundamentals new Promise with then$]
```

Using Promises for Timeouts
---------------------------

You don't need to create new promises very often. Usually, libraries like
[Axios](http://npmjs.com/package/axios) or [Mongoose](https://www.npmjs.com/package/mongoose) create promises internally and return them, so you can use
`then()` or `await`.

However, not all APIs support promises. For example, [the `setTimeout()` function](https://www.w3schools.com/jsref/met_win_settimeout.asp) only accepts callbacks.
In order to create a promise that waits for 100ms before resolving, you
should wrap a `setTimeout()` call in a `new Promise`:

```javascript
[require:Fundamentals new Promise timeout$]
```

Wrapping Node-Style Callbacks
-----------------------------

Some async Node.js APIs, like [`fs.readFile()`](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback), don't return promises.
You also need to wrap `fs.readFile()` in a `new Promise` in order
to use it with async/await.

Make sure you handle errors! [Node-style callbacks](/tutorials/fundamentals/callbacks#node-style-callbacks) take 2 parameters: an `error` and a `result`.
If `error` is not [nullish](/tutorials/fundamentals/falsy#nullish-values), you should reject the promise.

```javascript
[require:Fundamentals new Promise fs$]
```

Async Executor Functions
------------------------

A common mistake is making the executor an [async function](https://thecodebarbarian.com/async-functions-in-javascript.html).

```javascript
[require:Fundamentals new Promise async executor$]
```

The above code works fine, but it creates an unnecessary promise
(remember that async functions always return a promise!) and
looks clumsy. Since async functions always return promises,
you can always replace an async executor function with a vanilla
async function call:

```javascript
async function test() {
  await new Promise(resolve => setTimeout(resolve, 100));
  return 'OK';
}

const p = test();
```

The key takeaway is that you should never make an executor function
async. There's no need.
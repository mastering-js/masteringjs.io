In general, there are 4 ways to create a new promise in JavaScript:

- Using [the `Promise` constructor](https://masteringjs.io/tutorials/fundamentals/promise-new)
- Using the static helpers [`Promise.resolve()`](/tutorials/fundamentals/promise-resolve) and [`Promise.reject()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)
- Chaining with the [`then()` function](/tutorials/fundamentals/then) or [`catch()` function](/tutorials/fundamentals/catch)
- Call an [async function](https://thecodebarbarian.com/async-functions-in-javascript.html)

Using the Promise Constructor
-------------------------

The [Promise constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) takes a single parameter, an `executor` function.
When you call `new Promise(executor)`, JavaScript immediately executes your `executor` function with 2
arguments: `resolve()` and `reject()`.

```javascript
function executor(resolve, reject) {
  typeof resolve; // 'function'
  typeof reject; // 'function'
}

new Promise(executor);
```

The `executor()` function is then responsible for calling `resolve()` to mark
the promise as [_fulfilled_](/tutorials/fundamentals/promise#promises-as-state-machines) (successful) or _rejected_ (failed).

```javascript
[require:Fundamentals new Promise basic example$]
```

Using Static Helpers
--------------------

The `Promise.resolve()` function lets you create a new promise that
is immediately fulfilled.

```javascript
const p = Promise.resolve(42);
p.then(v => {
  v; // 42
});
```

You can think of `Promise.resolve(v)` as short for `new Promise(resolve => resolve(v))`.

Similarly, the `Promise.reject()` function lets you create a new promise that is immediately rejected.

```javascript
const p = Promise.reject(new Error('Oops!'));
p.catch(err => {
  err.message; // 'Oops!'
});
```

Be careful with `Promise.reject()`: if you don't immediately add a `.catch()` handler to your new promise, you'll get an [unhandled promise rejection](https://thecodebarbarian.com/unhandled-promise-rejections-in-node.js.html).

`then()` and `catch()`
----------------------

When you call `.then()` or `.catch()`, JavaScript creates a new promise.

```javascript
const p = Promise.resolve('Hello');

const p2 = p.then(str => `${str} World`);

p2 instanceof Promise; // true
p2 === p; // false
```

Async Functions
---------------

When you call an async function, JavaScript returns a new promise. No matter what you `return`
from an async function, JavaScript always returns a promise, so make sure you [`await`](/tutorials/fundamentals/async-await) on
async function calls!

```javascript
async function test() {
  return 42;
}

test() instanceof Promise; // true
```

Without Executing
-----------------

[JavaScript promises](/tutorials/fundamentals/promise) are ["hot"](https://staltz.com/cold-and-hot-callbacks.html) in the sense that JavaScript executes the executor function immediately.

If you find yourself wanting a "cold" promise in the sense that your
promise doesn't execute until you `await` on it, you should just use an
async function. Calling an async function returns a new promise every time.

```javascript
async function getAnswer() {
  return 42;
}

const p1 = getAnswer();
p1 instanceof Promise; // true

const p2 = getAnswer();
p2 instanceof Promise; // true
p2 === p1; // false
```

Another common alternative is the [deferred pattern](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred), where you create a promise that has `resolve()` and `reject()` functions that you can call outside the `executor()` function.

```javascript
Promise.deferred = function() {
  let resolve = null;
  let reject = null;
  const p = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return Object.assign(p, { resolve, reject });
};

const p = Promise.deferred();

p.then(v => {
  v; // 42
});

p.resolve(42);
```

However, [the deferred pattern is considered an antipattern](https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns#the-deferred-anti-pattern). That's because synchronous errors that occur outside the executor function won't reject the promise!

```javascript
// JavaScript catches any errors that occur in the promise executor
// and treats them as a promise rejection.
const p1 = new Promise(() => { throw new Error('Oops!'); });
p1.catch(err => {
  err.message; // 'Oops!'
});

// With `deferred`, you're responsible for handling errors that
// occur outside the executor. If you forget, your promise will
// be pending forever like `p2` below.
const p2 = Promise.deferred();
throw new Error('Oops!');
```

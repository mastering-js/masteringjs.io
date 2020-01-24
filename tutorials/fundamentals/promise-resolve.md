The [`Promise.resolve()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) is the most concise way to
create a [fulfilled promise](/tutorials/fundamentals/promise#promises-as-state-machines) that contains the given value. For example,
suppose you wanted to create a promise that is fulfilled with the string 'Hello, World':

```javascript
[require:Fundamentals Promise resolve basic example$]
```

Resolved is _Not_ the Same as Fulfilled
----------------------------------------

Explaining the difference between a promise that is _resolved_ and
a promise that is _fulfilled_ is a common JavaScript interview question.
The difference is subtle, but important.

The key difference is what happens when a promise is resolved with
another promise. When you call `Promise.resolve(p)`, where `p` is a
promise, you create a new promise that is tied to `p`. If `p` is
fulfilled, the returned promise is fulfilled with the same value.
If `p` is rejected, the returned promise is rejected with the same value.
The [Promises/A+ spec calls this process "assimilation"](https://promisesaplus.com/#the-promise-resolution-procedure).

```javascript
[require:Fundamentals Promise resolve another promise$]
```

A promise that is resolved to another promise is still pending.
In particular, a promise that is resolved can still become rejected!

```javascript
[require:Fundamentals Promise resolve reject$]
```

Resolved is not a [promise state](/tutorials/fundamentals/promise#promises-as-state-machines). On the other hand, fulfilled is
one of 3 states a promise can be in, and once a promise transitions
to fulfilled, JavaScript executes any `onFulfilled` callbacks you passed to the [`then()` function](/tutorials/fundamentals/then).

With the Promise Constructor
----------------------------

When you create a promise using `new`, you call the [Promise constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
The Promise constructor takes a single parameter, an `executor` function.
The Promise constructor then executes the `executor` function with 2
arguments: `resolve()` and `reject()`.

```javascript
function executor(resolve, reject) {
  typeof resolve; // 'function'
  typeof reject; // 'function'
}

new Promise(executor);
```

Note that the first parameter is typically called `resolve()`, **not** `fulfill`.
That's because the `resolve()` function in the promise constructor behaves
much like `Promise.resolve()`. When you call `resolve()` with a promise,
you "assimilate" the value of that promise.

```javascript
[require:Fundamentals Promise resolve constructor$]
```
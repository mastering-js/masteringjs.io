The [`Promise.all()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) converts an array of
promises into a single promise that [fulfills](/tutorials/fundamentals/promise#promises-as-state-machines) when all the promises
in the original array fulfill.

Here's an example of using `Promise.all()` to wrap an array of promises:

```javascript
[require:Fundamentals Promise.all basic example$]
```

Parallel Execution of Async Functions
-------------------------------------

When used with [async functions](https://thecodebarbarian.com/async-functions-in-javascript.html), `Promise.all()` lets you execute code in parallel. Pass an array of `async` function calls to `Promise.all()`, and
JavaScript will execute the async functions in parallel.

Suppose you have two async functions `getName()` and `getAge()`. Here's
how you can use `Promise.all()` to execute them in parallel:

```javascript
[require:Fundamentals Promise.all async functions$]
```

Error Case
----------

If one of the promises rejects, the promise returned by `Promise.all()`
rejects immediately with the same error.

```javascript
[require:Fundamentals Promise.all error$]
```

Note that, since promises are not cancellable, each individual promise
continues execution, even if one of them errors out. If you pass an
array of async functions and one of the async functions throws an
error, `Promise.all()` will reject immediately with that error.
But the other functions will continue executing.

```javascript
[require:Fundamentals Promise.all execution after error$]
```

Getting Fancy with [Generators](https://thecodebarbarian.com/introducing-80-20-guide-to-es2015-generators)
-------------------------------------

The `Promise.all()` function doesn't limit you to arrays, the first parameter
can be [any JavaScript iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all#Syntax). Arrays are iterables,
and so are generator functions. Which means you can pass in a generator
that yields promises, and `Promise.all()` will bundle all the yielded
promises into a single promise.

```javascript
[require:Fundamentals Promise.all generator$]
```
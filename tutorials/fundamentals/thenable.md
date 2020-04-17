In JavaScript, a _thenable_ is an object that has a [`then()` function](/tutorials/fundamentals/then). All promises are thenables, but not
all thenables are promises.

Many promise patterns, like [chaining](/tutorials/fundamentals/promise-chaining)
and [async/await](/tutorials/fundamentals/async-await), work with any
thenable. For example, you can use thenables in a promise chain:

```javascript
[require:Fundamentals Thenable with chaining$]
```

You can also use thenables with `await`:

```javascript
[require:Fundamentals Thenable with await$]
```

Thenables in the Wild
---------------------

Many libraries implement thenables to enable async/await support.
For example, [Mongoose queries](/tutorials/mongoose/query) are
thenables, although they also have an `exec()` function that returns
a promise. [Superagent](https://visionmedia.github.io/superagent/) is
a popular HTTP client that also uses thenables. However, neither
Mongoose queries nor Superagent requests are actually promises.

Other libraries use promises directly. For example, [Axios requests are promises](/tutorials/axios/then) in the sense that they are `instanceof Promise`.

You can convert an arbitrary thenable to a promise using `Promise.resolve()`:

```javascript
[require:Fundamentals Thenable with resolve$]
```
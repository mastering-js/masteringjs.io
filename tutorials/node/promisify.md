Node.js' built-in `util` package has a [`promisify()` function](https://nodejs.org/api/util.html#util_util_promisify_original) that converts [callback](/tutorials/fundamentals/callbacks#node-style-callbacks)-based functions to [promise](/tutorials/fundamentals/promise)-based functions. This lets you use [promise chaining](/tutorials/fundamentals/then#chaining) and [async/await](/tutorials/fundamentals/async-await) with callback-based APIs.

For example, Node.js' [`fs` package](https://nodejs.org/api/fs.html) uses callbacks. Normally, to read a file, you would need to use callbacks:

```javascript
[require:Node promisify fs with callbacks$]
```

You can use `util.promisify()` to convert the `fs.readFile()` function
to a function that returns a callback:

```javascript
[require:Node promisify fs with promisify$]
```

Assumptions
-----------

How does `util.promisify()` work under the hood? There's a [polyfill on npm](https://www.npmjs.com/package/util.promisify), you can read the [full implementation here](https://github.com/ljharb/util.promisify/blob/master/implementation.js).

The key idea behind `util.promisify()` is that it [adds a callback function to the parameters you passed in](https://github.com/ljharb/util.promisify/blob/40a839a8db3d79699688d27f6613a827056428c8/implementation.js#L58-L59). That callback function resolves or rejects the promise the promisified function returns.

That's a bit of a mouthful, so here's a very simplified example of a custom implementation of `util.promisify()`.

```javascript
[require:Node promisify custom promisify$]
```

So what does this mean? First, `util.promisify()` adds 1 extra argument
to the arguments you passed in, and then calls the original function with
those new arguments. That means the underlying function needs to support
that number of arguments. So if you're calling a promisified function
`myFn()` with 2 parameters of types `[String, Object]`, make sure the
original function supports a call signature of `[String, Object, Function]`.

Secondly, `util.promisify()` has implications for [function context](/tutorials/fundamentals/this).

Losing Context
--------------

[Losing context](/tutorials/fundamentals/this) means that a function
call ends up with the wrong value of `this`. Losing context is a common
problem for transformed functions:

```javascript
[require:Node promisify losing context$]
```

Remember that _`this` contains whatever object the function was a property of when it was called._ So you can retain context by setting the promisified
function as a property of the same object:

```javascript
[require:Node promisify correct context$]
```
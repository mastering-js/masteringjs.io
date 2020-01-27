[Async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) lets you write async code in a way that looks like sync code. You can
use `if` statements, `for` loops, and `try/catch` in async functions!

## Async

The `async` keyword marks a function as an [async function](https://thecodebarbarian.com/async-functions-in-javascript.html). In the below example, `test()` is an
async function.

```javascript
async function test() {
  return 42;
}
```

You can also define an async arrow function:

```javascript
const test = async () => 42;
```

## Await

The special thing about async functions is that you can use the `await`
keyword. If you `await` on a promise, the `await` keyword _pauses_ execution of
the surrounding async function until the promise [fulfills or rejects](/tutorials/fundamentals/promise#promises-as-state-machines). `await` also _unwraps_ the promise: it
gives you the fulfilled value of the promise.

```javascript
[require:Fundamentals async await basic await$]
```

In the above example, the [`Promise.resolve()` function](/tutorials/fundamentals/promise-resolve) means the promise is fulfilled immediately. In the below example,
`await` pauses execution of `test()` for 100 ms:
`
```javascript
[require:Fundamentals async await await pause$]
```

`await` is just a plain old JavaScript keyword. That means you can use it within
`if` statements, `for` loops, and `try/catch`.

```javascript
[require:Fundamentals async await await loop$]
```

## Return Value

Another special property of async functions is that they always return a promise.
Even if you return a primitive value from an async function, JavaScript will
wrap that value in a promise.

```javascript
async function test() {
  return 42;
}

const p = test();
p instanceof Promise; // true
p.then(v => {
  v; // 42
});
```

That means can use `await` on an async function call:

```javascript
async function test() {
  return 42;
}

async function main() {
  const val = await test();
  val; // 42
}
```

## Error Handling

[Error handling with async/await](http://thecodebarbarian.com/async-await-error-handling-in-javascript.html) is a complex topic. But, at a high level,
there are two patterns for handling errors.

When you `await` on a promise and that promise rejects, `await` throws an
error that you can `try/catch`:

```javascript
[require:Fundamentals async await try catch$]
```

You can also use [the `Promise#catch()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) to unwrap the promise's error:

```javascript
[require:Fundamentals async await promise catch$]
```
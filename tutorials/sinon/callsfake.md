[Sinon stubs](/tutorials/sinon/stub) have a [`callsFake()` function](https://sinonjs.org/releases/latest/stubs/#stubcallsfakefakefunction) that tells Sinon what function to call instead of the stubbed function.
For example, you can replace the [`axios.get()` function](/tutorials/axios/get) with a fake function as follows.

```javascript
const axios = require('axios');
const assert = require('assert');

const stub = sinon.stub(axios, 'get').
  callsFake(() => Promise.resolve({ status: 200 }));
// Calls the fake `axios.get()`
const test = await axios.get('https://httpbin.org/get');

test.status; // 200
test.data; // undefined
```

The `callsFake()` function is handy for testing, because you can configure the behavior of any function call to handle hard-to-test code paths.

For Async Functions
-------------------

To stub [async functions](/tutorials/fundamentals/async-await), we typically recommend making your fake function return a promise using [`Promise.resolve()`](/tutorials/fundamentals/promise-resolve).
Making sure your fake function returns a promise is especially important if you are using [promise chaining](/tutorials/fundamentals/promise-chaining), because otherwise you won't be able to call [`then()`](/tutorials/fundamentals/then).

```javascript
const stub = sinon.stub(axios, 'get').
  callsFake(() => Promise.resolve({ status: 200 }));
```

You can also pass an async function to `callsFake()`.
However, that can be indicative of a code smell, because fake functions typically should **not** do anything besides returning a pre-defined value.
Multi-line fake functions are typically unnecessary.
However, you may use the following syntax instead of `Promise.resolve()` because the following is more concise.

```javascript
const stub = sinon.stub(axios, 'get').
  callsFake(async () => ({ status: 200 }));
```

For Errors
----------

You can also make your fake functions throw errors for testing error cases.
For example, you can make a stub return a [rejected promise](/tutorials/fundamentals/promise-reject) as follows.

```javascript
const axios = require('axios');
const assert = require('assert');

const stub = sinon.stub(axios, 'get').
  callsFake(() => Promise.reject(new Error('Oops!')));

// Calls the fake `axios.get()`
try {
  await axios.get('https://httpbin.org/get');
} catch (err) {
  err.message; // Oops!
}
```

You can also throw an error from the fake function body.
Just make sure you're consistent about async functions vs sync functions: if you're stubbing an async function, make sure you either return a promise or use an async fake function!

```javascript
// Good: fake returns a promise
sinon.stub(axios, 'get').
  callsFake(() => Promise.reject(new Error('Oops!')));

// Good: fake is async
sinon.stub(axios, 'get').
  callsFake(async () => { throw new Error('Oops!'); });

// Bad: fake throws sync error, even though axios.get() never does
sinon.stub(axios, 'get').
  callsFake(() => { throw new Error('Oops!'); });
```
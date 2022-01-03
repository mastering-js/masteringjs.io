With the `stub()` function, you can swap out a function for a fake version of that function with pre-determined behavior.
This is helpful for testing edge cases, like what happens when an HTTP request fails.

The `sinon.stub()` substitutes the real function and returns a stub object that you can configure using methods like `callsFake()`.
Stubs also have a `callCount` property that tells you how many times the stub was called.
For example, the below code _stubs out_ `axios.get()` for a function that always returns `{ status: 200 }` and asserts that `axios.get()` was called once.

```javascript
const axios = require('axios');
const sinon = require('sinon');
const assert = require('assert');

const stub = sinon.stub(axios, 'get').callsFake(() => Promise.resolve({ status: 200 }));
// Calls the fake `axios.get()`
const test = await axios.get('https://httpbin.org/get');

assert.deepEqual(test, { status:200 }); // passes
assert.strictEqual(stub.callCount, 1); // passes
```

## Using `getCall()`

Stubs also have a `getCall()` function that returns data on a particular function call.
For example, `stub.getCall(0)` returns an object that contains data on the first time the stub was called, including `arguments` and `returnValue`:

```javascript
const call = stub.getCall(0);

call.args; // ['https://httpbin.org/get']
call.returnValue; // Promise { { status: 200 } }
```
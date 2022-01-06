There are several ways to check what arguments a stub was called with in Sinon.
Our recommended approaches are `calledWith()` and related helpers, and `getCall()`.

## calledWith()

`calledWith` will return true if the stub was called at least once with the provided arguments.
The function can also return true if the stubbed function had more arguments than it should have, but are correctly positioned.

```javascript
const sinon = require('sinon');

const math = {
  add: (a, b) => { return a + b; }
};

let stub = sinon.stub(math, 'add');

math.add(1, 2);

stub.calledWith(1, 2); // true
stub.calledWith(0, 5); // false

// Reset the stub
sinon.restore();
stub = sinon.stub(math, 'add');

math.add(1, 2, 3, 4, 5); // Called with 3 extra args
stub.calledWith(1, 2); // true, because 1 and 2 are in the same position as the stub call
```

#### calledOnceWith() and alwaysCalledWith()

`calledOnceWith()` will return true if the stub was called exactly once _and_ that one call's arguments match using the same semantics as `calledWith()`.
`alwaysCalledWith()` returns true if every time the stub was called, the arguments match.

```javascript
const sinon = require('sinon');

const math = {
  add: (a, b) => { return a + b; }
};

let stub = sinon.stub(math, 'add');

math.add(1,2);
stub.calledOnceWith(1,2); // true

math.add(1,2);
stub.calledOnceWith(1, 2); // false, as add() has been called twice now.
stub.alwaysCalledWith(1, 2); // true

math.add(3, 4);
stub.alwaysCalledWith(1, 2); // false
```

## getCall().args

The [`getCall()` function](https://sinonjs.org/releases/latest/spy-call/) returns information about a given call to the stub.
`getCall(i)` returns an object containing the `args`, `returnValue`, etc. of the i-th time the stub was called.
`getCall()` uses 0 based indexing, meaning to access the first call you use `getCall(0)`.

```javascript
const sinon = require('sinon');

const math = {
  add: (a, b) => { return a + b; }
};

let stub = sinon.stub(math, 'add');

math.add(1, 2);
math.add(3, 4);

stub.getCall(0).args; // [1, 2]
stub.getCall(1).args; // [3, 4]
```

Since `getCall().args` returns the arguments as a JavaScript array, you can then compare the calls using the usual methods of [comparing arrays in JavaScript](/tutorials/fundamentals/compare-arrays):

```javascript
// Using vanilla JavaScript
function argsEqual(call, arr) {
  return call.args.every((el, i) => el === arr[i]);l
}

argsEqual(stub.getCall(0), [1, 2]); // true
argsEqual(stub.getCall(1), [1, 2]); // false

// Using Node.js' assert lib:
assert.deepEqual(stub.getCall(0).args, [1, 2]);
```
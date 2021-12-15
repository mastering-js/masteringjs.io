To check what arguments a stub was called with, you have several options as stubs are treated as spies in sinon.js.


## calledWith()

`calledWith` will return true if the stub was called at least once with the provided arguments.
The function can also return true if the stubbed function had more arguments than it should have, but are correctly positioned.

```javascript
const sinon = require('sinon');

module.exports = {
    add: (a,b) => {
        return a+b;
    }
};
async function run() {
const stub = sinon.stub(module.exports, 'add');
module.exports.add(1,2);
stub.calledWith(1,2); // true
stub.calledWith(0,5); // false
module.exports.add(1,2,3,4,5); // 3 arguments too many
stub.calledWith(1,2); // true, because 1 and 2 are in the same position as the stub call
}

run();
```

## calledOnceWith()

`calledOnceWith()` will return true if the stub was called exactly once and in that one call had the correct arguments.

```javascript
const sinon = require('sinon');

module.exports = {
    add: (a,b) => {
        return a+b;
    }
};
async function run() {
const stub = sinon.stub(module.exports, 'add');
module.exports.add(1,2);
stub.calledOnceWith(1,2); // true
module.exports.add(1,2);
stub.calledOnceWith(1,2); // false, as add() has been called twice now.
}

run();
```

## alwaysCalledWith()

`alwaysCalledWith()` returns true if every time the stub was called it contained the arguments provided and they were in the same position.

```javascript
const sinon = require('sinon');

module.exports = {
    add: (a,b) => {
        return a+b;
    }
};
async function run() {
const stub = sinon.stub(module.exports, 'add');
module.exports.add(1,2);
stub.alwaysCalledWith(1,2); // true
module.exports.add(3,4);
stub.alwaysCalledWith(1,2); // false
}

run();
```

## getCall().args

`getCall()` uses 0 based indexing, meaning to access the first element you start at 0.
`getCall()` returns an object with several properties like `firstArg` and `lastArg`, but in this case we only care about the `args` property which contains an array of the arguments passed to the stub on that call.

```javascript
const sinon = require('sinon');

module.exports = {
    add: (a,b) => {
        return a+b;
    }
};
async function run() {
const stub = sinon.stub(module.exports, 'add');
module.exports.add(1,2);
module.exports.add(3,4);
stub.getCall(0).args; // [1,2]
}
run();
```
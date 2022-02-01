Sinon spies are used to record information about function calls.
Unlike mocks or [stubs](/tutorials/sinon/stub), spies do **not** replace the function being called.
Spies just record what parameters the function was called with, what value it returned, and other information about the function execution.

```javascript
const sinon = require('sinon');
const assert = require('assert');

let calls = 0;
let obj = {
  myFunction: function(data) {
    return ++calls;
  }
};

const spy = sinon.spy(obj, 'myFunction');

obj.myFunction('test');

assert.equal(spy.getCall(0).args[0], 'test');

// Returns 1, which means the real `myFunction()` was called,
// rather than a stub.
assert.equal(spy.getCall(0).returnValue, 1);
```

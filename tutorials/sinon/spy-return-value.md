By design, [sinon spies](/tutorials/sinon/spy) do not replace the function being called.
They just record information about how the function is called, like which parameters the function was called with.
If you want to make a spy return a value, you should use a [Sinon stub](/tutorials/sinon/stub) and `callsFake()` instead.

```javascript
const sinon = require('sinon');
const assert = require('assert');

const obj = {
  spyMethod() {
    return 'original spyMethod';
  },
  stubMethod() {
    return 'original stubMethod';
  }
}

// Create a sinon spy to record information about a function call
sinon.spy(obj, 'spyMethod');
obj.spyMethod(); // 'original spyMethod'

// Create a sinon stub to replace a function and return a pre-determined value
// Sinon spies don't have a `callsFake()` method
sinon.stub(obj, 'stubMethod').callsFake(() => 'wrapped stubMethod');
obj.stubMethod(); // 'wrapped stubMethod'
```
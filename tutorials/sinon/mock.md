Mocks allow you to create a fake function that passes or fails depending on your needs.
You can ensure it was called with certain arguments, or check how many times it was called.
You must call `mock()` on an object.
To complete the test, you must call the `verify()` function to check that all the mock's expectations were met.

```javascript
const sinon = require('sinon');
const obj = {
  method: function() {
    console.log('Hello World')
  }
};
const mock = sinon.mock(obj);
mock.expects('method').once();

// 'Hello World' will not print since 'method' is stubbed out
obj.method();

// Succeeds
mock.verify();
```

## using verify()

The `verify()` function will throw an error if the expectations are not met, or return true otherwise.
You must define the expectations before calling `verify()`.

```javascript
const sinon = require('sinon');
const obj = {
  method: function() {
    console.log('Hello World');
  }
};
const mock = sinon.mock(obj);
mock.expects('method').once();
obj.method();
mock.verify(); // true
```

## using mock.restore()

The `restore()` function returns the mocked functions back to their original state, meaning that they will now execute whatever lines of code you had written.

```javascript
const sinon = require('sinon');
const obj = {
  method: function() {
    console.log('Hello World');
  }
};
const mock = sinon.mock(obj);
mock.expects('method').once();
obj.method();
mock.verify(); // true

mock.restore();
obj.method(); // Hello World
```

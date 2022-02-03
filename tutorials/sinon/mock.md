Mocks allow you to create a fake function that passes or fails depending on your needs.
You can ensure it was called with certain arguments, or check how many times it was called.
You must call `mock()` on an object.
To complete the test, you must use the `verify()` function that checks if the mock did what you indicated.
If not, it will throw an error.

```javascript
const sinon = require('sinon');
const obj = { method: function() {console.log('Hello World')}};
const mock = sinon.mock(obj);
mock.expects("method").once();
obj.method(); // 'Hello World' will not print
mock.verify();
```

## using verify()

The `verify()` function will throw an error if the expectations are not met, or return true otherwise. You must define the expectations first thing before calling `verify()`. A side effect of calling `verify()` is that it will `restore()` all functions to their original state.
Read more about `restore()` in the next section.

```javascript
const sinon = require('sinon');
const obj = { method: function() {console.log('Hello World')}};
const mock = sinon.mock(obj);
mock.expects("method").once();
obj.method(); // 'Hello World' will not print
mock.verify(); // true
```

## using mock.restore()

The `restore()` function returns the mocked functions back to their original state, meaning that they will now execute whatever lines of code you had written.

```javascript
const sinon = require('sinon');
const obj = { method: function() {console.log('Hello World')}};
const mock = sinon.mock(obj);
mock.expects("method").once();
obj.method(); // 'Hello World' will not print
mock.verify();
mock.restore();
obj.method(); // Hello World
```

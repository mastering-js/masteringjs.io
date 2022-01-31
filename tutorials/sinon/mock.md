Mocks allow you to create a fake function that passes or fails depending on your needs.
You can ensure it was called with certain arguments, or check how many times it was called.
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
With the `stub()` function, you can make testing difficult parts of your code easy.
`stub()` substitutes the real function and returns a value you can define using `callsfake()`.
All stubs are spies in sinon.js, therefore, you can access the `callCount` property and see how
many times your stub was called.

```javascript
const axios = require('axios');
const sinon = require('sinon');
const assert = require('assert');
const stub = sinon.stub(axios, 'get').callsFake(() => Promise.resolve({status: 200}));
const test = await axios.get('https://httpbin.org/get');
assert(test, {status:200}); // passes
assert(test.callCount, 1); // passes
```

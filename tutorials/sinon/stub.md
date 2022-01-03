With the `stub()` function, you can make testing difficult parts of your code easy.
`stub()` substitutes the real function with a stub, and returns the stub object.

```javascript
const axios = require('axios');
const sinon = require('sinon');
const stub = sinon.stub(axios, 'get');
console.log(stub);
```

You can define what value to return using the `callsfake()` function.
Stubs can access the `callCount` property which allows you to see how many times your stub was called.

```javascript
const axios = require('axios');
const sinon = require('sinon');
const assert = require('assert');
const stub = sinon.stub(axios, 'get').callsFake(() => Promise.resolve({status: 200}));
const test = await axios.get('https://httpbin.org/get');
assert(test, {status:200}); // passes
assert(test.callCount, 1); // passes
```

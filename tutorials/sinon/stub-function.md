The `stub()` function substitutes the passed function with a fake that returns a predetermined value.
Chain it with other [Sinon](/sinon) functions like `callsFake()` and `yieldsTo()` to configure what value the stubbed function returns.

For example, below is how you can stub out [Axios' `get()` function](/tutorials/axios/get) so it always returns an HTTP 200.

```javascript
const axios = require('axios');
const sinon = require('sinon');
const assert = require('assert');

const stub = sinon.stub(axios, 'get').callsFake(() => Promise.resolve({ status: 200 }));
// Calls the fake `axios.get()`
const test = await axios.get('https://httpbin.org/get');

assert.deepEqual(test.data, { status:200 }); // passes
```

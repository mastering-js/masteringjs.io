The `stub()` function substitutes the passed function with a fake that returns a predetermined value.
Chain it with other sinon functions like `callsFake()` and `yieldsTo()` to provide it with the desired process.

```javascript
const axios = require('axios');
const sinon = require('sinon');
const assert = require('assert');

const stub = sinon.stub(axios, 'get').callsFake(() => Promise.resolve({ status: 200 }));
// Calls the fake `axios.get()`
const test = await axios.get('https://httpbin.org/get');

assert.deepEqual(test.data, { status:200 }); // passes
```

```javascript
const sinon = require('sinon');


const obj = { 
    method: function(data) {
        console.log('data in method function', data)
    }
}

const stub = sinon.stub(obj, 'method').yieldsTo('test', [1,2,3])
obj.method({test: function(data) {
    console.log('data in parameter test', data);
}})

```

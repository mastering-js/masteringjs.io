A spy in sinon is used to offer more information than standard about function calls.
It does not affect the behavior, however.
Spies are good for checking aspects of how, when and with what a function was called.


```javascript
const sinon = require('sinon');
const assert = require('assert');
let obj = {
    myFunction: function(data) {
        data += data;
    }
};

const Bond = sinon.spy(obj, 'myFunction');

obj.myFunction(' Echo ');

assert(Bond.calledOnce); // true
```

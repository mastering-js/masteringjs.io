To remove a `null` from an object with lodash, you can use the `omitBy()` function in combination with the `.isNull` check.

```javascript
const _ = require('lodash');

const obj = {a: null, b: 'Hello', c: 3, d: undefined};

const result = _.omitBy(obj, _.isNull); // {b: 'Hello', c: 3}
```

If you want to remove a `NaN`, you need to use `.isNan`.

```javascript
const _ = require('lodash');

const obj = {a: null, b: 'Hello', c: 3, d: undefined, e: NaN};

const result = _.omitBy(obj, _.overSome([ _.isNull, _.isNaN ])); // {b: 'Hello', c: 3}
```

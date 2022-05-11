To remove a `null` from an object with lodash, you can use the `omitBy()` function.

```javascript
const _ = require('lodash');

const obj = {a: null, b: 'Hello', c: 3, d: undefined};

const result = _.omitBy(obj, v => v === null); // {b: 'Hello', c: 3, d: undefined}
```

If you want to remove both `null` and `undefined`, you can use `.isNull` or non-strict equality.

```javascript
const _ = require('lodash');

const obj = {a: null, b: 'Hello', c: 3, d: undefined};

const result = _.omitBy(obj, _.isNull); // {b: 'Hello', c: 3}

const other = _.omitBy(obj, v => v == null); // {b: 'Hello', c: 3}
```

## Using Vanilla JavaScript

You can use vanilla JavaScript to remove `null`s from objects, however, it requires many function calls.

```javascript
const obj = {a: null, b: 'Hello', c: 3, d: undefined, e: null};

Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== null)); // { b: "Hello", c: 3, d: undefined }
```

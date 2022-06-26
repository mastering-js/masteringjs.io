To remove a null from an array, you should use lodash's `filter` function.
It takes two arguments:

- `collection`: the object or array to iterate over.
- `predicate`: the function invoked per iteration.

The `filter()` function returns a new array containing all elements `predicate` returned a truthy value for.
To remove [`null`](/tutorials/fundamentals/null), you can call `filter()` with `v => v !== null` as the `predicate`.

```javascript
const _ = require('lodash');

const arr = ['a', true, null, undefined, 42];

_.filter(arr, v => v !== null); // ['a', true, undefined, 42]
```

To remove  `null` using `filter`, you can use the `_.isNull` function as the `predicate`.
Simply add a negate in front of the `isNull` and all `null` values will be filtered out.

```javascript
const _ = require('lodash');

const array = ['a', true, null, undefined, 42]; // ['a', true, undefined, 42]

_.filter(array, el => !_.isNull(el));
```

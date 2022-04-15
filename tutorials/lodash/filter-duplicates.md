To filter duplicates from an array, use Lodash's `uniq()` functio.
This function will remove any duplicate values from the provided array.

```javascript
const _ = require('lodash');
const array = [1, 2, 3, 4, 5, 5, 6, 7, 7];
_.uniq(array); // returns [1, 2, 3, 4, 5, 6, 7]
```

## uniqBy()

The `_.uniq()` function compares values using [SameValueZero](/tutorials/fundamentals/equality) comparison.
SameValueZero works well for primitive values, but not for objects.

The `uniqBy()` function is similar to the `uniq()` function, with the key difference that it allows you to pass in a function that returns the value you want to compare by.
For example, below is how you filter duplicate objects by `name` property.

```javascript
const array = [
  { name: 'Badger' },
  { name: 'Badger' },
  { name: 'Badger' },
  { name: 'Mushroom' },
  { name: 'Mushroom' }
];
_.uniqBy(array, obj => obj.name); // returns [{ name: 'Badger' }, { name: 'Mushroom' }]
```

## uniqWith()

The `uniqWith()` function takes a comparator function, which should return `true` if the two values should be considered equal.
For example, below is how you filter out duplicate objects in an array using [Lodash's `isEqual()` function](/tutorials/lodash/compare-objects)

```javascript
const array = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 1, y: 2 }
];
_.uniqWith(array, _.isEqual); // returns [{ x: 1, y: 2 }, { x: 2, y: 1 }]
```

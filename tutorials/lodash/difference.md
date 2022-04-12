The `difference()` function in Lodash takes two arrays, and returns an array containing all the values in the first array that are not in the second array.

```javascript
const _ = require('lodash');
const array = [1, 2, 3, 4, 5];
const values = [1, 2, 3];
_.difference(array, values); // returns [4, 5]
```

The `difference()` function also supports passing in multiple arrays.
If you pass in 3 or more arrays, Lodash returns an array containing all values that are in the first array, but not in _any_ of the subsequent arrays.

```javascript
_.difference([1, 2, 3, 4, 5], [1, 3], [2, 4]); // [5]
```

## differenceBy()

The `differenceBy()` function accepts a third argument, a callback function that transforms each element before calculating the difference.
For example, below is how you can calculate the difference between two sets of numbers by their `Math.floor()` value.

```javascript
const _ = require('lodash');
const array = [1.1, 1.2, 2.1, 2.2, 3.3, 4, 5];
const values = [1.4, 2.3, 3.2];
_.differenceBy(array, values, Math.floor); // returns [4, 5]
```

You can also use this function with arrays of objects.

```javascript
const _ = require('lodash');
const array = [{property: 1, property: 2}];
const values = [{property: 1}];
_.differenceBy(array, values, 'property'); // returns [{property: 2}]
```

You can even use it to convert values to strings.
This is convenient for calculating the difference between arrays of [Mongoose ObjectIds](/tutorials/mongoose/objectid).

```javascript
const mongoose = require('mongoose');
const _ = require('lodash');

const oids1 = [
  mongoose.Types.ObjectId('123456789012'),
  mongoose.Types.ObjectId('123456789013'), 
  mongoose.Types.ObjectId('123456789014')
];
const oids2 = [
  mongoose.Types.ObjectId('123456789013'),
  mongoose.Types.ObjectId('123456789014')
];

// Doesn't work! Returns all elements of `oids1`, because ObjectIds
// are objects.
_.difference(oids1, oids2);

// Works! Diffs ObjectIds by their string values.
_.differenceBy(oids1, oids2, id => id.toString()); // [mongoose.Types.ObjectId('123456789012')]
```

## differenceWith()

The `differenceWith()` function takes a comparator function as a third parameter.
The comparator should accept two values, and return true if the values should be considered equal.
The `differenceWith()` function is often used to calculate the difference between arrays of objects using Lodash's deep equality check to [compare JavaScript objects](/tutorials/fundamentals/compare-objects).

```javascript
const _ = require('lodash');
const array = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];
const values = [{ x: 2, y: 1 }];
_.differenceWith(array, values, _.isEqual) // returns [{x: 1, y: 2}]
```

The `difference()` function in Lodash takes two arrays, and returns an array containing all the values in the first array that are not in the second array.

```javascript
const _ = require('lodash');
const array = [1, 2, 3, 4, 5];
const values = [1, 2, 3];
_.difference(array, values); // returns [4, 5]
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

```javascript
const mongoose = require('mongoose');
const _ = require('lodash');

const oids1 = [mongoose.Types.ObjectId('123456789012'), mongoose.Types.ObjectId('123456789013'), mongoose.Types.ObjectId('123456789014')];
const oids2 = [mongoose.Types.ObjectId('123456789013'), mongoose.Types.ObjectId('123456789014')];
_.differenceBy(oids1, oids2, id => id.toString()); // returns [mongoose.Types.ObjectId('123456789012')]
```

## differenceWith()

The `differenceWith()` function takes a comparator function as a third parameter. The comparator should accept two values, and retrun true if the values are equal.
The result will vary depending on the order of items in the array so be sure to sort before calling this function.

```javascript
const _ = require('lodash');
const array = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];
const values = [{ x: 2, y: 1 }];
_.differenceWith(array, values, _.isEqual) // returns [{x: 1, y: 2}]
```

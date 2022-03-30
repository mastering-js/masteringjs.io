The `difference()` function in lodash takes two arguments, the array in question and an array of values to compare against, and returns a new array.

```javascript
const _ = require('lodash');
const array = [1, 2, 3, 4, 5];
const values = [1, 2, 3];
_.difference(array, values); // returns [4, 5]
```

## differenceBy()

The `differenceBy()` function behaves similarly to the `difference()` function with the addition of a third argument that transforms each element before comparison.

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

## differenceWith()

The `differenceWith()` function behaves similarly to the `differenceBy()` function with its third argument being a comparator as opposed to a transformer.
The result will vary depending on the order of items in the array so be sure to sort before calling this function.

```javascript
const _ = require('lodash');
const array = [1, 2, 3, 4, 5];
const values = [1, 2, 3];
_.differenceWith(array, values, function(arrVal, othVal) {
    if(arrVal === othVal) return true;
    return false;
}); // returns [4, 5]
```

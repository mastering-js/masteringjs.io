To remove duplicates from an array, use the `uniq()` function provided by lodash.
This function will remove any duplicate values from the provided array.

```javascript
const _ = require('lodash');
const array = [1, 2, 3, 4, 5, 5, 6, 7, 7];
_.uniq(array); // returns [1, 2, 3, 4, 5, 6, 7]
```

## uniqBy()

The `uniqBy()` function is similar to the `uniq()` function with the key difference of specifying a function to generate the criteria for uniqueness.

```javascript
const _ = require('lodash');
const array = [2.1, 2.3, 2.5, 3.2, 3.3, 4];
_.uniqBy(array, Math.floor); // returns [2.1, 3.2, 4]
```

If it is an array of objects, you can specify which object property to inspect.

```javascript
const _ = require('lodash');
const array = [{property: 1}, {property: 1}, {property: 2}];
_.uniqBy(array, 'property'); // returns [{property: 1}, {property: 2}]
```

## uniqWith()

The `uniqWith()` function accepts a comparator function as its second argument to use in determining uniqueness within the array.
The order of result values is determined by the order they occur in the array so, if possible, sort the array before hand.

```javascript
const _ = require('lodash');
const array = [1, 2, 3, 4, 5, 5, 6, 7, 7];
_.uniqWith(array, function(arrVal, othVal) {
    if (arrVal === othVal) return true;
    return false;
}); // returns [1, 2, 3, 4, 5, 6, 7]
```

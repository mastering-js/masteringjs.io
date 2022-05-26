To remove a null from an array, you should use lodash's `filter` function.
It takes two arguments:

- Collection, the object or array to iterate over.
- Predicate, the function invoked per iteration.

It returns the new filtered array.

```javascript
const _ = require('lodash');

const obj = [{
    name: {
        first: 'Test',
        last: 'Testerson',
        age: 2
    },
    location: 'Florida'
},{
    name: {
        first: 'Jesus',
        last: 'Christ',
        age: Infinity
    },
    location: 'Florida'
}, {
    name: {
        first: 'Masteringjs',
        last: '.io',
        age: 5
    },
    location: 'Florida'
}, {
    name: {
        first: 'White',
        last: 'House',
        age: undefined
    },
    location: 'Washington'
}, {
    name: {
        first: 'Speaker',
        last: 'House',
        age: undefined
    },
    location: 'Washington'
} ];


let result = _.filter(obj, function(element) { return element.location == 'Washington'});

result; // [{name: { first: 'White', last: 'House', age: undefined },location: 'Washington'},{name: { first: 'Speaker', last: 'House', age: undefined },location: 'Washington'}]
```

To remove a `null` using `filter`, you can use the `isNull` function.

```javascript
const _ = require('lodash');

const array = [null, 0, null, 1, 2, 3, 4, null, null, null, 5, 6, 7, 8, null, 9, null, 10, null];

let result = _.filter(array, element => !_.isNull(element));

result; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

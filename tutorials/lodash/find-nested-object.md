If you need to search for a nested object, you can use Lodash's `.find()` function.
It takes three arguments:

- Collection, which can be either an array or object.
- Predicate, the function invoked per iteration.
- fromIndex, the index to search from with the default being 0.

It will either return the element you were searching for, or `undefined` if it did not find it.

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
} ]

let result = _.find(obj, function(element) {return element.name.first == 'Jesus'});

result; // { name: { first: 'Jesus', last: 'Christ', age: Infinity }, location: 'Florida' }

result = _.find(obj, function(element) {return element.name.first == 'Eugene'});

result; // undefined
```

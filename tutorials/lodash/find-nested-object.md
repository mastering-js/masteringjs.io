If you need to search for a nested object, you can use Lodash's `.find()` function.
It takes three arguments:

- `collection`: which can be either an array or object.
- `predicate`: the callback function that Lodash calls on every element in the array.
- `fromIndex`: the index to search from. Defaults to 0.

Lodash will return the first element for which `predicate` returns a truthy value, or `undefined` if there's no such element.

```javascript
const _ = require('lodash');

const obj = [
  {
    name: {
        first: 'Test',
        last: 'Testerson',
        age: 2
    },
    location: 'Florida'
},{
    name: {
        first: 'Obi-wan',
        last: 'Kenobi',
        age: 45
    },
    location: 'Tatooine'
},{
    name: {
        first: 'Masteringjs',
        last: '.io',
        age: 5
    },
    location: 'Florida'
} ]

let result = _.find(obj, function(element) {return element.name.first == 'Test'});

result; // { name: { first: 'Test', last: 'Testerson', age: 2 }, location: 'Florida' }

result = _.find(obj, function(element) {return element.name.first == 'Eugene'});

result; // undefined
```

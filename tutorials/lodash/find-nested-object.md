If you need to search for a nested object, you can use Lodash's `.find()` function.
It takes three arguments:

- `collection`: which can be either an array or object.
- `predicate`: the [callback](/tutorials/fundamentals/callbacks) function that Lodash calls on every element in the array.
- `fromIndex`: the index to search from. Defaults to 0.

Lodash will return the first element for which `predicate` returns a truthy value, or `undefined` if there's no such element.
You can write a `predicate` that checks whether an element has a certain nested property.
The following code finds objects by the `name.first` property.

```javascript
const _ = require('lodash');

const obj = [
  {
    name: {
        first: 'Test',
        last: 'Testerson'
    },
    age: 2,
    location: 'Florida'
  },
  {
    name: {
        first: 'Obi-wan',
        last: 'Kenobi'
    },
    age: 45,
    location: 'Tatooine'
  },
  {
    name: {
        first: 'Masteringjs',
        last: '.io'
    },
    age: 5,
    location: 'Florida'
  }
];

let result = _.find(obj, el => el.name.first === 'Test');

result; // { name: { first: 'Test', last: 'Testerson', age: 2 }, location: 'Florida' }

result = _.find(obj, el => el.name.first === 'something else');

result; // undefined
```

To avoid cases where `el.name` is [`null`](/tutorials/fundamentals/null) or `undefined`, you can use optional chaining `?.`, or [Lodash's `get()` function](/tutorials/lodash/get).

```javascript
let result = _.find(obj, el => el?.name?.first === 'Test');

// Equivalent:
result = _.find(obj, el => _.get(el, 'name.first') === 'Test');
```

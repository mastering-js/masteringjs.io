If you want to capitalize the first letter of every word in a string, you can use lodash's `startCase()` function.

```javascript
const _ = require('lodash');

_.startCase('hello world, today is a beautiful day'); // Hello World, Today Is A Beautiful Day
```

If you want to capitalize only the first letter of the first word in the string, you can use lodash's `capitalize()` function.

```javascript
const example = 'hello world, today is a beautiful day';

_.capitalize(example); // Hello world, today is a beautiful day.
```

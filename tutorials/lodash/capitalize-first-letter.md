If you want to capitalize the first letter of every word in a string, you can use Lodash's `startCase()` function.

```javascript
const _ = require('lodash');

_.startCase('hello world, today is a beautiful day'); // Hello World, Today Is A Beautiful Day
```

If you want to capitalize only the first letter in the string, you can use Lodash's `capitalize()` function.

```javascript
const example = 'hello world, today is a beautiful day';

_.capitalize(example); // Hello world, today is a beautiful day.
```

## Vanilla JavaScript Alternative

You don't need Lodash to [capitalize the first letter of a string in JavaScript](/tutorials/fundamentals/capitalize-first-letter).
For example, below is how you can capitalize the first letter of a string in vanilla JavaScript.

```javascript
[require:Fundamentals capitalize first letter works$]
```

You can also capitalize the first letter of each word as follows.

```javascript
[require:Fundamentals capitalize first letter all words$]
```
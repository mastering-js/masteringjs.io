If you want to capitalize the first letter of every word in a string, you can use lodash's `capitalize()` function.

```javascript
const _ = require('lodash');

_.capitalize('hello world, today is a beautiful day'); // Hello World, Today Is A Beautiful Day
```

If you want to capitalize only the first letter of the first word in the string, you must use a combination of the `charAt()` function and `toUpperCase()` function.

```javascript
const example = 'hello world, today is a beautiful day';

capitalizeFirstWord(example); // Hello world, today is a beautiful day.

function capitalizeFirstWord(sentence); {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
```

Note that this does not handle [internationalization](https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript/53930826#53930826) well.

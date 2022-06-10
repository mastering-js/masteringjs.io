The `truncate` function allows you to shorten a string if it is longer than a specifed length.
It will shorten the string and replace the last characters of the shortened string with the characters you specify, or the default `...`.
It takes three parameters:

- length (number), the maximum length of the string.
- omission (string), the string to indicate text is omitted.
- separator (RegExp | string), the separator pattern to truncate to.


```javascript
const _ = require('lodash');

const example = 'Masteringjs.io is a great website to learn JavaScript fundamentals, Mongoose, Vue, and other JavaScript libraries.';

const result = _.truncate(example, {
  length: 39
});

result; // Masteringjs.io is a great website to...
```

```javascript
const close = _.truncate(example, {
  length: 36,
  omission: '.',
});

close; // Masteringjs.io is a great website.
```

## Separator

The `separator` argument is handy for preventing JavaScript from breaking words when truncating. If you pass a `separator`, JavaScript will truncate at the last instance of `separator` before length.

```javascript
const _ = require('lodash');

const example = 'Masteringjs.io is a great website to learn JavaScript fundamentals, mongoose, vue, and other fun JavaScript libraries.';

const short = _.truncate(example, {
  length: 23, // 'Masteringjs.io is a gre'.length
  separator: ' '
});

short; // Masteringjs.io is a...
```

Because `' '` is the separator, Lodash backtracked and cut off the string at the last space before index 23. Even though index 23 is halfway through "great", `truncate()` avoided breaking up words.
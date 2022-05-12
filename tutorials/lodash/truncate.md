The `truncate` function allows you to shorten a string if it is longer than a specifed length.
It will shorten the string and replace the last characters of the shortened string with the characters you specify, or the default `...`.
It takes three options:

- length (number), the maximum length of the string.
- omission (string), the string to indicate text is omitted.


```javascript
const _ = require('lodash');

const example = 'Masteringjs.io is a great website to learn JavaScript fundamentals, mongoose, vue, and other fun JavaScript libraries.';

const result = _.truncate(example, {
    length: 39,
});

result; // Masteringjs.io is a great website to...

const close = _.truncate(example, {
    length: 36,
    omisssion: '.',
});

close; // Masteringjs.io is a great website.
```

## Separator

The `separator` argument is a RegExp or string that indicates where to truncate the string if it matches the indicated pattern, and also exceeds the length option.

```javascript
const _ = require('lodash');

const example = 'Masteringjs.io is a great website to learn JavaScript fundamentals, mongoose, vue, and other fun JavaScript libraries.';

const short = _.truncate(example, {
    length: 42,
    separator: 'website'
});

short; // Masteringjs.io is a great ...
```

You can see that although it should have ended at `learn`, it back tracked and cut off at `website` because the `separator` option indicated so.
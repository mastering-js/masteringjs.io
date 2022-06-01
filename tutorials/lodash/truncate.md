The `truncate` function allows you to shorten a string if it is longer than a specifed length.
It will shorten the string and replace the last characters of the shortened string with the characters you specify, or the default `...`.
It takes three parameters:

- length (number), the maximum length of the string.
- omission (string), the string to indicate text is omitted.
- separator (RegExp | string), the separator pattern to truncate to.


```javascript
const _ = require('lodash');

const example = 'Masteringjs.io is a great website to learn JavaScript fundamentals, mongoose, vue, and other fun JavaScript libraries.';

const result = _.truncate(example, {
    length: 39,
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
    length: 23,
    separator: ' '
});

short; // Masteringjs.io is a...
```

You can see that although it should have ended halfway through `great`, it back tracked and cut off at `a` because the `separator` parameter indicated so.
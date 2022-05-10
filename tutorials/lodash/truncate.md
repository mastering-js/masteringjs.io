The `truncate` function allows you to shorten a string if it is longer than a specifed length.
It will shorten the string and replace the last characters of the shortened string with the characters you specify, or the default `...`.
It takes three options:

- length (number), the maximum length of the string.
- omission (string), the string to indicate text is omitted.
- separator (RegExp | string), the separator pattern to truncate to. 
Meaning that it will cut the string at the indicated pattern/string if the max length is smaller than the string but greater than the position of the indicated pattern/string.

```javascript
const _ = require('lodash');

const example = 'Masteringjs.io is a great website to learn JavaScript fundamentals, mongoose, vue, and other fun JavaScript libraries.';

const result = _.truncate(example, {
    length: 40,
    omisssion: '.',
    separator: 'website'
});

result; // Masteringjs.io is a great ...

const close = _.truncate(example, {
    length: 34,
    omisssion: '.',
    separator: 'website'
});

close; // Masteringjs.io is a great websi...

const short = _.truncate(example, {
    length: 20,
    omisssion: '.',
    separator: 'website'
});

short; // Masteringjs.io is...
```

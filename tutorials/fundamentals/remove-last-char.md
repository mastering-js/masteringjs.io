To remove the last character from a string in JavaScript, you should use the `slice()` method.
It takes two arguments: the start index and the end index.
`slice()` supports negative indexing, which means that `slice(0, -1)` is equivalent to `slice(0, str.length - 1)`.

```javascript
let str = 'Masteringjs.ioF';
str.slice(0, -1); // Masteringjs.io
```

## Alternative Methods

`slice()` is generally easier, however other methods available are [`substring()` and `replace()`](/tutorials/fundamentals/substring).
`substring()` does not have negative indexing, so be sure to use `str.length - 1` when removing the last character from the string.
`replace()` takes either a string or a regular expression as its `pattern` argument.
Using `/.$/` as the regular expression argument matches the last character of the string, so `.replace(/.$/, '')` replaces the last character of the string with an empty string.

```javascript
let str = 'Masteringjs.ioF';
str.substring(0, str.length - 1); // Masteringjs.io
str.substr(0, str.length - 1); // Masteringjs.io
str.replace(/.$/, ''); // Masteringjs.io
```

## Advanced Features

With `replace()`, you can specify if the last character should be removed depending on what it is with a regular expression.
For example, suppose you want to remove the last character only if the last character is a number.
You can use `.replace(/\d$/, '')` as shown below.

```javascript
// For a number, use \d$.
let str = 'Masteringjs.io0';
str.replace(/\d$/, ''); // Masteringjs.io

let str2 = 'Masteringjs.io0F';
// If the last character is not a number, it will not replace.
str.replace(/\d$/, ''); // Masteringjs.io0F;
```
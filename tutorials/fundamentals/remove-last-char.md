To remove the last charcter from a string in JavaScript, you should use the `slice()` method.
It takes two arguments, what index to start and what index to end.
`slice()` has negative indexing, which means that you could do `slice(0, -1)` and it would be equivalent to `slice(0, str.length - 1)`.

```javascript
let str = 'Masteringjs.ioF';
str.slice(0, -1); // Masteringjs.io
```

## Alternative Methods

`slice()` is generally easier, however other methods available are `substring()` and `replace()`.
`substring()` does not have negative indexing, so be sure to use `str.length - 1` when removing the last character from the string.
`replace()` takes either a string or a regular expression as its `pattern` argument but if it is a string, it only replaces the first instance.

```javascript
let str = 'Masteringjs.ioF';
str.substring(0, str.length - 1); // Masteringjs.io
str.replace(/.$/, ''); // Masteringjs.io
```

## Be More Precise

With `replace()`, you can specify if the last character should be removed depening on what it is with a regular expression.

```javascript
// For a number, use \d$.
let str = 'Masteringjs.io0';
str.replace(/\d$/, ''); // Masteringjs.io
let str2 = 'Masteringjs.io0F';
// If the last character is not a number, it will not replace.
str.replace(/\d$/, ''); // Masteringjs.io0F;
```
If you want to remove leading whitespace from a JavaScript string, the [`trimStart()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart) is what you're looking for.
Equivalently, you can call `trimLeft()`, which is an alias for `trimStart();

```javascript
let example = '        Hello World';
example.trimStart(); // 'Hello World'
example.trimLeft(); // 'Hello World'
```

The `trimStart()` function is a relatively recent addition to JavaScript, so you need a [polyfill](https://github.com/es-shims/String.prototype.trimStart) if you want to use `trimStart()` in Internet Explorer or Node.js < 10.0.0.
An alternative is to use the [string `replace()` function](/tutorials/fundamentals/string-replace) with a regular expression.

```javascript
// \s is a metacharacter representing any whitespace character
// See https://www.w3schools.com/jsref/jsref_regexp_whitespace.asp
example.replace(/^\s+/, ''); // 'Hello World'
```

### Trimming Other Characters

You can also use `replace()` to remove any other set of characters from the beginning of the string.
For example, suppose you want to remove any leading 'Na ' strings.
You can use the regular expression `/^(Na )+/`.
The `^` means at the beginning of the string, `(Na)` means the group `Na`, and `+` means one or more.

```javascript
let example = 'Na Na Na Na Na Na Na Na Na Na Na Na Na Na Na Na BATMAN!';
example.replace(/^(Na )+/, ''); // 'BATMAN!'
```

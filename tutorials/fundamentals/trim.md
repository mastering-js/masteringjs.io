To trim leading and trailing whitespace from a string in JavaScript, you should use the [`String.prototype.trim()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim).
The `trim()` method removes leading and trailing whitespace characters, including tabs and newlines.

```javascript
'\t  Hello, World\t   \n\n'.trim(); // 'Hello, World'
```

The `trim()` method is especially useful with template strings, because template strings end up with leading and trailing newlines if you put ` on a separate line.

```javascript
const code = `
console.log('Hello, World!);
`;

code; // "\nconsole.log('Hello, World!);\n"
code.trim(); // "console.log('Hello, World!)"
```

### Trim Arbitrary Characters

To trim arbitrary characters, you should use the `replace()` function.
`replace()` takes two arguments:

- a regular expression denoting what to take out
- a string denoting what to put in

By using `^` (start of string) and `$` (end of string), you can create two `replace()` calls that replace leading and trailing instances of a character as shown below.

```javascript
let example = 'aaaaaaaaaaaaaaaaaaaaBBBaaaaaaaaaaaaaaaaaaaa';
example.replace(/^a+/, '').replace(/a+$/, ''); // BBB
```


## Trim Multiple Characters

To trim multiple characters, broaden the search of the regular expression.

```javascript
let example = '1234567890 Mastering JS 1234567890';
example.replace(/^[0-9]+/, '').replace(/[0-9]+$/, ''); // Mastering JS
example.replace(/[0-9]+/, ''); // Mastering JS
```

## `trimStart()` and `trimEnd()`

JavaScript strings also have [`trimStart()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart) and [`trimEnd()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd) methods.
The `trimStart()` function removes all leading whitespace, and `trimEnd()` removes all trailing whitespace.
In other words, `str.trimStart().trimEnd()` is equivalent to `str.trim()`.

```javascript
[require:Fundamentals trim trimStart and trimEnd$]
```

Keep in mind that `trimStart()` and `trimEnd()` are relatively new additions to JavaScript, introduced in ES2019.
They are not supported in Node.js before v10.x, and they are not supported in any version of
Internet Explorer.
While they are safe to use in Node.js, you may want to add a polyfill for browser apps if you need to support IE.
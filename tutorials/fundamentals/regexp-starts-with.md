To check the beginning of a string using a regular expression in JavaScript, use the `test()` function and a regular expression that starts with `^`.
The `^` character is a special character that represents the start of the string.
The `test()` function will search the string and return `true` if the string contains a match.

```javascript
/^A/.test('A beautiful day for a walk, no?'); // true
/^A/.test('What a beautiful day'); // false
```

You can also turn a string into a regular expression by using the `new RegExp()` constructor.

```javascript
const string = '^Hello';
regex = new RegExp(string);
regex.test('Hello World'); // true
regex.test('Hi There'); // false
```
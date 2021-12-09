To check the beginning of a string using a regular expression in JavaScript, use the `test()` function.
The `test()` function will search the string and check whether it contains a match for the regular expression.
A regular expression is enclosed by `/` character on each end.

```javascript
/^A/.test('A beautiful day for a walk, no?'); // true
```

You can also turn a string into a regular expression by using the `new RegExp()` constructor.

```javascript
const string = '^Hello';
regex = new RegExp(string);
regex.test('Hello World'); // true
```
To check the beginning of a string using a regular expression in JavaScript, use the `test()` function and a regular expression that starts with `^`.
The `^` character is a [special character](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions#types) that represents the start of the string.
The `test()` function will search the string and return `true` if the string contains a match.

```javascript
/^A/.test('A beautiful day for a walk, no?'); // true
/^A/.test('What a beautiful day'); // false
```

You can also turn a string into a regular expression by using the `new RegExp()` constructor.

```javascript
const string = '^Hello';
const regexp = new RegExp(string);

regexp.test('Hello World'); // true
regexp.test('Hi There'); // false
```

## Case Insensitive Search

The `i` flag makes a regular expression case insensitive.

```javascript
/^A/i.test('ABC'); // true
/^A/i.test('abc'); // true

/^A/i.test('bac'); // false

// Or using RegExp constructor
const regexp = new RegExp('^A', 'i');

regexp.test('ABC'); // true
regexp.test('abc'); // true

regexp.test('bac'); // false
```
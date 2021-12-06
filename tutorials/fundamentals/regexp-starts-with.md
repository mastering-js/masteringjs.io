To check if a string starts with a regular expression, use the `startsWith()` function.
Regular expressions begin and end with a `/` but can have different characters in between, like `^`.

```javascript
let reg = '/ab+c/';
reg.startsWith('/'); // true
```

You can also specify the position to start checking for the regular expression to catch a regular expression in the middle of a string.

```javascript
let mid = '/Today is a /ab+c/ day';
mid.startsWith('/', 12); // true
```
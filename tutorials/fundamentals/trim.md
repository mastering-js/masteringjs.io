To trim characters from a string in JavaScript, you must utilize the `replace()` function.
`trim()` is only useful for removing whitespace characters which is why `replace()` needs to be used instead.
`replace()` takes two arguments:
- a regular expression denoting what to take out
- a string denoting what to put in.
```javascript
let example = 'aaaaaaaaaaaaaaaaaaaaBBBaaaaaaaaaaaaaaaaaaaa';
example.replace(/^a+/, 'f').replace(/a+$/, 'g'); // fBBBg
```

You could also do this using a single `replace()` function if you wanted the same character before and after the middle part.

```javascript
let example = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaBBBaaaaaaaaaaaaaaaaaaaaaa';
example.replace(/a+/,'B'); // BBBBB
```

## Trim Multiple Characters

To trim multiple characters, broaden the search of the regular expression.

```javascript
let example = '1234567890MasteringJavaScript1234567890'
example.replace(/^[0-9]+/, '!').replace(/[0-9]+$/, '!'); // !MasteringJavaScript!
example.replace(/[0-9]+/, '!'); // !MasteringJavaScript!
```
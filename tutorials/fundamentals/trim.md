To trim leading and trailing characters from a string in JavaScript, you should use the `replace()` function.
`trim()` is only useful for removing whitespace characters which is why you should use `replace()`.
`replace()` takes two arguments:
- a regular expression denoting what to take out
- a string denoting what to put in

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
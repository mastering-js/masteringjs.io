To format a date to YYYY MM DD in JavaScript, you can use the `toLocaleDateString()` function in combination with the `split()`, `reverse()`, and `join()` functions.
You can take advantage of the European style date format, which puts day first, as opposed to the US format which puts month first.

```javascript
const date = new Date();

date.toLocaleDateString('en-GB').split('/').reverse().join(''); // 20211124
```

## Using String Math

A more interesting approach is to use string math, which concatenates strings.

```javascript
const date = new Date();
const year = date.getFullYear() * 1e4; // 1e4 gives us the the other digits to be filled later, so 20210000.
const month = (date.getMonth() + 1) * 100; // months are numbered 0-11 in JavaScript, * 100 to move two digits to the left. 20210011 => 20211100
const day =  date.getDate(); // 24
const result = year + month + day + '' // +'' to convert to string from number, 20211100 => "20211124"

// in one line
date.getFullYear() * 1e4 + (date.getMonth()+1) * 100 + date.getDate() + ''; // "20211124"

```
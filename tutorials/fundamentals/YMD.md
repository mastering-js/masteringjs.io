To format a date to YYYYMMDD in JavaScript, you can use the `toLocaleDateString()` function in combination with the `split()`, `reverse()`, and `join()` functions.
The trick is that, in the UK, dates are formatted in DD/MM/YYYY format, with two digit month and day.
So format the date using the `en-GB` locale to get two digit month and day, and then split, reverse, and join back together.

```javascript
const date = new Date();

date.toLocaleDateString('en-GB').split('/').reverse().join(''); // '20211124'
```

## Using [String Concatenation](/tutorials/fundamentals/string-concat)

The above approach is concise, but not very readable.
The `en-GB` trick is a bit too clever for many codebases.
Here's an alternative approach that's easier to read.

```javascript
const date = new Date();
const year = date.getFullYear() * 1e4; // 1e4 gives us the the other digits to be filled later, so 20210000.
const month = (date.getMonth() + 1) * 100; // months are numbered 0-11 in JavaScript, * 100 to move two digits to the left. 20210011 => 20211100
const day = date.getDate(); // 20211100 => 20211124
const result = year + month + day + '' // `+ ''` to convert to string from number, 20211124 => "20211124"

// in one line
date.getFullYear() * 1e4 + (date.getMonth() + 1) * 100 + date.getDate() + ''; // "20211124"
```
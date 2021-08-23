JavaScript's string `substring()` and `slice()` functions behave similarly but have a few key differences.
With `substring()`, the two arguments are swapped if the first argument is greater than the second argument, and
negative and `NaN` values are treated as 0. With `slice()`, you can enter a negative value as an argument and
the function interprets it as counting from the end of the string. It also treats a `NaN` as 0 however.

```javascript
const sentence = 'Masteringjs is a very helpful website'
sentence.substring(10, 0); // Masteringjs
sentence.slice(0, 10) // Masteringjs

```
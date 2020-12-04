To compare two dates, ignoring differences in hours, minutes, or seconds, you can use the
[`toDateString()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toDateString) and [compare the strings](/tutorials/fundamentals/compare-strings):

```javascript
[require:Fundamentals compare dates without time$]
```

The more nuanced question is which timezone you want to compare the dates in. The `toDateString()`
function calculates the date in the server's local timezone. In order to compare dates in UTC time
as opposed to server local time, you can use the [`toUTCString()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString) and [`slice()`](/tutorials/fundamentals/substring#stringslice) the result to just compare the date portion:

```javascript
[require:Fundamentals compare dates with UTC$]
```
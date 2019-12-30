[JavaScript's built-in `Date` class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) has a getter and setter function
for the current date of the month. The [`Date#getDate()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate) returns the current date of the month:

```javascript
[require:Fundamentals.*tomorrow.*getDate$]
```

The [`Date#setDate()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate) sets the date of the month.

```javascript
[require:Fundamentals.*tomorrow.*setDate$]
```

See [Format Dates Using Vanilla JavaScript](https://masteringjs.io/tutorials/fundamentals/date_format).

So to get tomorrow's date, you need to `setDate()` the current date, plus one.

```javascript
[require:Fundamentals.*tomorrow.*tomorrow$]
```

JavaScript is smart enough to deal with month rollovers on its own, so even
if today is June 30, the `date.getDate() + 1` approach works:

```javascript
[require:Fundamentals.*tomorrow.*rollover$]
```

Using [Moment.js](https://momentjs.com/)
---------------

Moment has a handy `.add()` function that lets you easily add 1 day to
the current moment.

```javascript
[require:Fundamentals.*tomorrow.*moment$]
```
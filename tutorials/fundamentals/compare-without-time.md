If you want to compare two dates in JavaScript without using the time aspect, you should use
the `toDateString()` method. It returns the date portion of the `Date` object as a string. From there,
you can compare the two strings:

```javascript
const date1 = new Date().toDateString();
const date2 = new Date(2000, 6, 25, 14, 39, 7).toDateString();

date1 > date2 // true
```

## Handling Time Zones

`toDateString()` does not take time zones into account. Using `toDateString()` without accounting for the coordinated universal time can create problems.
Also, using `toUTCString()` without an inital check could produce misleading results.
You should do an inital check to ensure that the two dates are on the same date in UTC before using `toUTCString()`.

```javascript
const date1 = new Date(2017, 5, 14, 5, 0, 0);
const date2 = new Date('14 Jun 2017 18:00:00 PDT');

date1 > date2; // false
// check that the two dates are on the same year, the same month, and on the same day
// returns false
date1.getUTCFullYear() === date2.getUTCFullYear() && // true
date1.getUTCMonth() === date2.getUTCMonth() && // true
date1.getUTCDate() === date2.getUTCDate(); // false

date1.toUTCString() > date2.toUTCString(); // true
```
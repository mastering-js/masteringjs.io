[JavaScript Dates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) have a `setDate()` function that sets the current date of the month.
This function handles rolling over months, so `setDate(32)` will increment the date's month and set the correct date.
For example, here's how you can add 30 days to June 1, 2022.

```javascript
const date = new Date('2022-06-01'); // June 1, 2022 UTC time

date.setDate(date.getDate() + 30); // Add 30 days
date; // July 1, 2022 UTC time
```

The `setDate()` function modifies the `date` object in-place and returns the new [Unix timestamp](/tutorials/fundamentals/timestamps) as a number.
So if you want to immediately use the date with a given number of days added, you can do the following:

```javascript
const date = new Date('2022-06-01'); // June 1, 2022 UTC time

new Date(
  date.setDate(date.getDate() + 37)
); // July 8, 2022 UTC time
```

If you want to add days to the current day, and zero out the time components, you can use the [`setHours()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours), which also allows you to modify the date's `minutes`, `seconds`, and `milliseconds` components.

```javascript
const now = new Date();
// Add 37 days to now, and zero out hours, minutes, seconds, milliseconds
now.setDate(now.getDate() + 37);
now.setHours(0, 0, 0, 0);
```

Working with JavaScript dates can be inelegant because most date methods return timestamps, not dates, so chaining isn't possible.
That's what common libraries, like [date-fns](https://date-fns.org/) and [Luxon](https://www.npmjs.com/package/luxon) are for.

With date-fns
-------------

Date-fns has a neat `add()` function that lets you add dates to the current date.

```javascript
const add = require('date-fns/add');

// Returns a date instance representing July 8, 2022 UTC time.
add(new Date('2022-06-01'), { days: 37 });
```

With Luxon
----------

```javascript
const { DateTime } = require('luxon');

// Returns a date instance representing July 8, 2022 UTC time.
DateTime.fromJSDate(new Date('2022-06-01')).plus({ days: 37 }).toJSDate();
```
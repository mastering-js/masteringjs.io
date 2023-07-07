[JavaScript Dates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) have a `setMonth()` function that sets the current month.
You can use `setMonth()` with `getMonth()` to increment your date's current month by 1 as follows:

```javascript
const date = new Date('2022-06-04');
date.setMonth(date.getMonth() + 1);

date.toISOString(); // '2022-07-04T00:00:00.000Z'
```

`setMonth()` will keep the current day of the month, so `date.setMonth(date.getMonth() + 1)` will skip to the same day next month.
`setMonth()` also takes into account months with different amounts of days, and rolling over years.

```javascript
const shortMonth = new Date('2022-02-04');
shortMonth.setMonth(shortMonth.getMonth() + 1);
shortMonth.toISOString(); // '2022-03-04T00:00:00.000Z'

const rolloverYear = new Date('2022-12-06');
rolloverYear.setMonth(rolloverYear.getMonth() + 1);
rolloverYear.toISOString(); // '2023-01-06T00:00:00.000Z'
```

Remember that months are 0-indexed in JavaScript dates; `getMonth()` returns `0` for January, `1` for February, etc.

```javascript
const rolloverYear = new Date('2022-12-06');
rolloverYear.getMonth(); // 11
```

While we recommend using vanilla JavaScript dates for simple operations like adding a month, we understand that many developers use date helper libraries.
With that in mind, here's examples using [date-fns](https://date-fns.org/) and [Luxon](https://moment.github.io/luxon/api-docs/index.html).

## Using date-fns

Date-fns has a neat `add()` function that lets you add months to the current date.

```javascript
const add = require('date-fns/add');

// Returns a date instance representing July 4, 2022 UTC time.
add(new Date('2022-06-04'), { months: 1 });
```

## Using Luxon

[Luxon's `plus()` method](https://moment.github.io/luxon/api-docs/index.html) is roughly equivalent to date-fns' `add()`.
You can use `plus()` to add months to a Luxon DateTime as follows.

```javascript
const { DateTime } = require('luxon');

// Returns a date instance representing July 4, 2022 UTC time.
DateTime.fromJSDate(new Date('2022-06-04')).plus({ months: 1 }).toJSDate();
```
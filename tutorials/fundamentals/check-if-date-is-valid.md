In JavaScript, a date is invalid if its `valueOf()` is [NaN](/tutorials/fundamentals/check-nan).

```javascript
const date = new Date(NaN);
date.toString(); // 'Invalid Date'
```

This is tricky because `date` still looks like a valid date: it is still `instanceof Date`, etc.
One way to check for an "Invalid Date" is to check if the date's `valueOf()` is `NaN`:

```javascript
Number.isNaN(date.valueOf()); // true

const validDate = new Date('2022-06-01');
Number.isNaN(validDate.valueOf()); // false
```

## Debugging Why a Date is Invalid

There are two common reasons for an "Invalid Date".
The first is passing a value that JavaScript can't interpret as a date to the `new Date()` constructor as follows.

```javascript
const badDate = new Date('foobar');
badDate.valueOf(); // NaN
badDate.toString(); // 'Invalid Date'
```

Invalid date strings aren't the only potential cause: passing in a numeric calculation that adds up to `NaN` also causes "Invalid Date".

```javascript
const obj = {};

// 3 * obj.nonexistentProperty === undefined
const badDate2 = new Date(3 * obj.nonexistentProperty);
badDate2.valueOf(); // NaN
badDate2.toString(); // 'Invalid Date'
```

A valid date can become an invalid date due to date manipulation methods like `setDate()` and `setHours()`. For example:

```javascript
const obj = {};

const badDate3 = new Date('2023-06-01');
// 3 * obj.nonexistentProperty === undefined
badDate3.setHours(3 * obj.nonexistentProperty);
badDate3.valueOf(); // NaN
badDate3.toString(); // 'Invalid Date'
```
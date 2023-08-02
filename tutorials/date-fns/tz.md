[Date-fns](https://date-fns.org/) has a sibling library [date-fns-tz](https://www.npmjs.com/package/date-fns-tz) that helps you work with timezones in JavaScript, including formatting dates in a specific timezone.

For example, the following is how you can format a given date in [Tahiti time](https://www.zeitverschiebung.net/en/timezone/pacific--tahiti) with date-fns-tz:

```javascript
// 12pm UTC on August 8, 2023
const date = new Date('2023-08-02T12:00:00.000Z');

const { formatInTimeZone } = require('date-fns-tz');
// "2023-08-02 02:00AM", 10 hours behind UTC
formatInTimeZone(date, 'Pacific/Tahiti', 'yyyy-MM-dd HH:mma');
```

## Converting to Different Timezones

Date-fns-tz also has a `utcToZonedTime()` helper that converts a date that would render as the correct time when printed in JavaScript.

```javascript
const date = new Date('2023-08-02T12:00:00.000Z');

const { utcToZonedTime } = require('date-fns-tz');
// Returns a date where the current `getHours()` is 2 to line up
// with Tahiti time:
// "Wed Aug 02 2023 02:00:00 GMT-0400 (Eastern Daylight Time)"
utcToZonedTime(date, 'Pacific/Tahiti').toString();
```

However, we strongly advise **against** using `utcToZonedTime()`.
Notice that `utcToZonedTime()` doesn't change the date's timezone, in the above example JavaScript still prints out "Eastern Daylight Time", which is the timezone my computer was in when I ran the above example.
So while you'll get the correct `getHours()`, look at what happens when you use `toISOString()`:

```javascript
// "2023-08-02T06:00:00.000Z"
utcToZonedTime(date, 'Pacific/Tahiti').toISOString();
```

The actual underlying time is different.
So if you use `utcToZonedTime()`, you need to be extremely careful to not pass the converted date via JSON, because you'll end up serializing the wrong time.

```javascript
// {"date":"2023-08-02T06:00:00.000Z"}
JSON.stringify({ date: utcToZonedTime(date, 'Pacific/Tahiti') })
```

Instead of using `utcToZonedTime()`, store the time and the timezone you want to display, and use `formatInTimeZone()`. 

## Vanilla JS Alternatives

While we often use date-fns for convenience, you don't **need** date-fns to do basic tasks like formatting dates in common timezones.
In modern JavaScript runtimes, dates have a [`toLocaleString()` function](/tutorials/fundamentals/date_format#timezones) that has good support for timezones.
While there is no formal specification for which timezones each runtime supports, we haven't run into a case where a JavaScript runtime doesn't support a timezone that we want to use.

For example, the following displays a given date in [Ulaanbataar time](https://www.zeitverschiebung.net/en/timezone/asia--ulaanbaatar).

```javascript
// 8am UTC on August 8, 2023
const date = new Date('2023-08-02T08:00:00.000Z');

// "8/2/2023, 4:00:00 PM", 8 hours ahead of UTC
date.toLocaleString('en-US', { timeZone: 'Asia/Ulaanbaatar' });
```
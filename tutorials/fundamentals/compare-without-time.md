If you want to compare two dates in JavaScript without using the time aspect, you should use
the `toDateString()` method. It returns the date portion of the `Date` object as a string. From there,
you can compare the two strings:

```javascript
const date1 = new Date('2000-06-25');
const date2 = new Date('2000-06-25');

date1 === date2 // false
date1.toDateString() === date2.toDateString() // true
```

## Handling Time Zones
If you want to determine if two dates are on the same day in a specific timezone, you should use `toLocaleDateString()` for better timezone support. Make
sure to specify the `locales` and `options` argument, as the default is implementation dependent.



```javascript
const date1 = new Date('14 Jun 2017 23:00:00 PDT');
const date2 = new Date('14 Jun 2017 18:00:00 PDT');

// The default for this implementation converts to Eastern Standard Time

date1.toLocaleDateString() === date2.toLocaleDateString(); // false; 6/15/2017  != 6/14/2017

date1.toLocaleDateString("en-US", {timeZone: 'America/Los_Angeles'}) === date2.toLocaleDateString("en-US", {timeZone: 'America/Los_Angeles'}) ; // 6/14/2017 === 6/14/2017


```
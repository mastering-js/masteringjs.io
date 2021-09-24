If you want to compare two dates in JavaScript without using the time aspect, you should use the `toDateString()` method.
It returns the date portion of the `Date` object as a string. 
From there, you can compare the two strings:

```javascript
const date1 = new Date('2000-06-25');
const date2 = new Date('2000-06-25');

date1 === date2; // false
date1.toDateString() === date2.toDateString(); // true
```

## Handling Time Zones
If you want to determine if two dates are on the same day in a specific timezone, you should use `toLocaleDateString()` for better timezone support. 
Make sure to set the `timeZone` option so JavaScript knows what time zone to use when converting the date to a string, as the default is implementation dependent.
When specifying the `timeZone` option, you cannot leave the `locales` argument blank.
Either put in your preferred locale or put in `undefined`, as `undefined` is the default argument when you omit all arguments to the function.



```javascript
const date1 = new Date('14 Jun 2017 23:00:00 PDT');
const date2 = new Date('14 Jun 2017 18:00:00 PDT');

date1.toLocaleDateString(undefined, {timeZone: 'America/New_York'}) === date2.toLocaleDateString(undefined, {timeZone: 'America/New_York'})); // false; 6/15/2017  != 6/14/2017

date1.toLocaleDateString("en-US", {timeZone: 'America/Los_Angeles'}) === date2.toLocaleDateString("en-US", {timeZone: 'America/Los_Angeles'}) ; // true; 6/14/2017 === 6/14/2017

```
To sort an array of dates, you can subtract the timestamps as the result will be the difference in milliseconds. To do so,
use the `getTime()` function which returns the time in milliseconds.

```javascript
const dates = [
    new Date('July 20, 2021 20:17:40'),
    new Date('August 19, 2021 23:15:30'),
    new Date('March 13, 2021 04:20'),
    new Date('October 2, 2021 11:05'),
    new Date()
];

dates.sort((date1,date2) => date1.getTime() - date2.getTime());

dates.toString();
/*
Sat Mar 13 2021 04:20:00 GMT-0500 (Eastern Standard Time),
Tue Jul 20 2021 16:17:40 GMT-0400 (Eastern Daylight Time),
Thu Aug 19 2021 23:15:30 GMT-0400 (Eastern Daylight Time),
Sat Oct 02 2021 11:05:00 GMT-0400 (Eastern Daylight Time),
Mon Oct 04 2021 11:10:10 GMT-0400 (Eastern Daylight Time)"
*/
```

## Sort Without The Time

You could also sort without using the timestamps. First you must convert the dates to a string by using the `toJSON()` function.
Then you may call the `sort()` function and convert the entries to a date string using `toDateString()`. `toJSON()` converts the dates
into a year-month-day-time format, making it so the sorting algorithm sorts how you intended versus how it would have otherwise.

```javascript
const dates = [
    new Date('July 20, 2021 20:17:40'),
    new Date('August 19, 2021 23:15:30'),
    new Date('March 13, 2021 04:20'),
    new Date('October 2, 2021 11:05'),
    new Date()
];
for (let i = 0; i < dates.length; i++) {
dates[i] = dates[i].toJSON();
}

dates.sort();

for (let i = 0; i < dates.length; i++) {
dates[i] = new Date(dates[i]).toDateString();
}
dates; 
/*
Sat Mar 13 2021,
Tue Jul 20 2021,
Thu Aug 19 2021,
Sat Oct 02 2021,
Mon Oct 04 2021
*/
```

Sorting an array of dates is a convenient one-liner, because [comparing dates in JavaScript](/tutorials/fundamentals/compare-dates) is easy: subtracting 2 dates returns the difference between the two dates in milliseconds.
Just subtract the two dates in the `sort()` [callback](/tutorials/fundamentals/callbacks).

```javascript
const dates = [
  new Date('July 20, 2021 20:17:40'),
  new Date('August 19, 2021 23:15:30'),
  new Date('March 13, 2021 04:20'),
  new Date('October 2, 2021 11:05')
];

dates.sort((date1, date2) => date1 - date2);

/*
[
  2021-03-13T09:20:00.000Z,
  2021-07-21T00:17:40.000Z,
  2021-08-20T03:15:30.000Z,
  2021-10-02T15:05:00.000Z
]
*/
dates;
```

## Sorting an Array of Objects by a Date Property

Similarly, [sorting an array of objects](/tutorials/fundamentals/sort-array-of-objects) by a date property is easy.
Just subtract the two date properties in the `sort()` callback.
For example, here's how you can sort an array of objects by the `createdAt` property.

```javascript
const d1 = new Date('2019-06-01');
const d2 = new Date('2018-06-01');
const d3 = new Date('2019-06-01');

const objects = [
  { createdAt: d1, name: 'Test 1' },
  { createdAt: d2, name: 'Test 2' },
  { createdAt: d3, name: 'Test 3' }
];

objects.sort((a, b) => a.createdAt - b.createdAt);

// [ 'Test 2', 'Test 1', 'Test 3' ]
console.log(objects.map(o => o.name));
```

## Sort Without The Time

You could also sort without using the time portion of the date.
There are a couple of options, but one approach is to clone the dates and zero out the hours, minutes, seconds, and milliseconds using the [`setHours()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours).

```javascript
const dates = [
  new Date('July 20, 2021 20:17:40'),
  new Date('August 19, 2021 23:15:30'),
  new Date('July 20, 2021 23:15:30'),
  new Date('August 19, 2021 20:17:40')
];

// `setHours(0, 0, 0, 0)` zeroes out hours, minutes, seconds, and milliseconds
dates.sort((date1, date2) => new Date(date1).setHours(0, 0, 0, 0) - new Date(date2).setHours(0, 0, 0, 0));

/*
[
  2021-07-21T00:17:40.000Z,
  2021-07-21T03:15:30.000Z,
  2021-08-20T03:15:30.000Z,
  2021-08-20T00:17:40.000Z
]
*/
dates;
```

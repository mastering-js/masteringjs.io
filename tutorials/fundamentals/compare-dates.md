Suppose you have two [JavaScript `Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects:

```javascript
const d1 = new Date('2019-06-01');
const d2 = new Date('2018-06-01');
const d3 = new Date('2019-06-01');
```

How do you compare if two dates are equal? Surprisingly, both [triple equals and double equals](/tutorials/fundamentals/equals) don't work when comparing two dates.

```javascript
[require:Fundamentals compare dates comparison operators$]
```

To compare two dates, you can use either `toString()` or [`valueOf()`](/tutorials/fundamentals/valueof).
The `toString()` method converts the date into an ISO date string, and the
`valueOf()` method converts the date into [milliseconds since the epoch](https://currentmillis.com/).

```javascript
[require:Fundamentals compare dates convert then compare$]
```

Before and After
----------------

Although neither `==` nor `===` can compare whether two dates are equal,
surprisingly both `<` and `>` work fine for comparing dates:

```javascript
d1 < d2; // false
d1 < d3; // false

d2 < d1; // true
```

So to check if date `a` is before date `b`, you can just check `a < b`.

Another neat trick: you can subtract dates in JavaScript. Subtracting
`a - b` gives you the difference between two dates in milliseconds.

```javascript
[require:Fundamentals compare dates subtraction$]
```

In other words, you can compare two dates `a` and `b` by using `a - b`.
If `b` is after `a`, then `a - b < 0`.

Sorting
-------

Sorting an array of dates in JavaScript doesn't work as you might expect.
The below `sort()` call gives you the dates in reverse order.

```javascript
[require:Fundamentals compare dates sort$]
```

Why is that? Because [JavaScript's sort function](/tutorials/fundamentals/array-sort)
implicitly converts all values in the array into strings before sorting.
So the above `sort()` is actually sorting based on the below string values:

```
[ 'Fri May 31 2019 20:00:00 GMT-0400 (Eastern Daylight Time)',
  'Thu May 31 2018 20:00:00 GMT-0400 (Eastern Daylight Time)',
  'Wed May 31 2017 20:00:00 GMT-0400 (Eastern Daylight Time)' ]
```

In other words, JavaScript implicitly sorts arrays of dates based on the
day of the week by default.

To sort dates based on which date happened first,
you need to pass a `compare()` [callback](/tutorials/fundamentals/callbacks)
to the `sort()` function. The `compare()` function should return:

* `0` if `a` and `b` are equal
* A positive number if `a > b`
* A negative number if `a < b`

Since JavaScript lets you subtract dates, you can just use `a - b` as
your comparison function:

```javascript
[require:Fundamentals compare dates correct sort$]
```
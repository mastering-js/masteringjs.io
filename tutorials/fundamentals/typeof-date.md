JavaScript dates are considered objects. The
[`typeof` operator](/tutorials/fundamentals/typeof) returns
`'object'` for dates, so you can't use `typeof` to distinguish whether
a value is a date. You should use [`instanceof`](/tutorials/fundamentals/instanceof) instead.

```javascript
let x = new Date();
if (x instanceof Date) {
  // will execute
}
```

## Object.prototype.toString.call()

A longer alternative is the `Object.prototype.toString.call(variableToCheck)` method.
It returns the internal class property of an object in a string of format `'[object Type]'`,
so a date would be `'[object Date]'`.

```javascript
let x = new Date();
if (Object.prototype.toString.call(x) === "[object Date]") {
  // will execute
}
```

## Check for validity

Now that you know how to check if the variable is a date,
you need to check if it is a **valid** date. You can use the
[`!isNaN()`](/tutorials/fundamentals/check-nan) function to check whether a date is valid.

```javascript
let x = new Date("Bad String");
if (x instanceof Date) {
  // executes, because `x` is technically a date object
}
if (x instanceof Date && !isNaN(x)) {
  // will not execute
}
```

If `x` is a Date, `isNaN(x)` is equivalent to `Number.isNaN(x.valueOf())`.
Dates have a [`valueOf()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/valueOf) that returns a numeric representation of the date as milliseconds since the [Unix epoch](https://en.wikipedia.org/wiki/Unix_time).

```javascript
// 86400000, or 24 * 60 * 60 * 1000
new Date('1970-01-02T00:00:00.000Z').valueOf();
```

Another common trick you might see is using the `>` operator. Remember that you can use `<` and `>` to [compare dates in JavaScript](/tutorials/fundamentals/compare-dates) as shown below, so `d > 0` will return `true` if `d` is a date with a positive, non-NaN `valueOf()`.

```javascript
const validDate = new Date('2021-01-01');
const zeroDate = new Date(0);
const invalidDate = new Date('fail');

validDate > 0; // true
zeroDate > 0; // false
invalidDate > 0; // false

validDate >= 0; // true
zeroDate >= 0; // true
invalidDate >= 0; // false
```
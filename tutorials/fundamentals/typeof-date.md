JavaScript dates are considered objects. The
[`typeof` operator](/tutorials/fundamentals/typeof) returns
`'object'` for dates, so you can't use `typeof` to distinguish whether
a value is a date. You should use [`instanceof`](/tutorials/fundamentals/instanceof).

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
you need to check if it is a **valid** date. Thankfully, there is
[`!isNan()`](/tutorials/fundamentals/check-nan).

```javascript
let x = new Date("Bad String");
if (
  Object.prototype.toString.call(x) === "[object Date]" ||
  x instanceof Date
) {
  // will execute but should not
}
if (
  (Object.prototype.toString.call(x) === "[object Date]" ||
    x instanceof Date) &&
  !isNaN(x)
) {
  // will not execute
}
```

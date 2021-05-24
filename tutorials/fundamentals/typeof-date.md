JavaScript date's are considered objects. As a result,
using `typeof` would result in it returing a string, `'object'`.
The problem with this however, is that objects and nulls would pass
any checks as well. To perform a more exact check, you should instead use
the `Object.prototype.toString.call(variableToCheck)` method. It returns the internal class
property of an object in a string of format `'[object Type]'`, so a date would be
`'[object Date]'`.

```javascript
let x = new Date();
if (Object.prototype.toString.call(x) === '[object Date]') {
    // will execute
}
```

Now that you know how to check if the variable is a date,
you need to check if it is a **valid** date. Thankfully, there is
the [`!isNan()`](/tutorials/fundamentals/check-nan) function.

```javascript
let x = new Date('Bad String');
if (Object.prototype.toString.call(x) === '[object Date]') {
    // will execute but should not
}
if (Object.prototype.toString.call(x) === '[object Date]' && !isNaN(x)) {
    // will not execute
}
```

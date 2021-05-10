Objects can be a bit frustrating when using the `typeof` operator
as `null` and `[]` will return `'object'`. To handle these cases,
you have a couple options. The first options is to hardcode an `if`
statement as follows:

```javascript
let test = {firstName: 'Masteringjs', lastName: 'io'};
if (typeof test == 'object' && !Array.isArray(test) && test != null) {
    // do some really cool stuff
}
```

If you consider objects created using `Object.create(null)` to be an object,
an alternative is to write a function that gets a little more involved. You
would want to use the `Object.getPrototypeOf()` function to compare the object's
prototype as follows:

```javascript
function isPOJO(arg) {
  if (arg == null || typeof arg !== 'object') {
    return false;
  }
  const proto = Object.getPrototypeOf(arg);
  if (proto == null) {
    return true; // `Object.create(null)`
  }
  return proto === Object.prototype;
}

isPOJO({}); // true
isPOJO(Object.create(null)); // true
isPOJO(null); // false
isPOJO(new Number(42)); // false
```

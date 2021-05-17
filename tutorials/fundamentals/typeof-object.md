Objects can be a bit frustrating when using the [`typeof` operator](/tutorials/fundamentals/typeof) because `typeof` returns 'object' for both `null` and `[]`.
To handle these cases, you have a couple options.
The first option is to hardcode an `if` statement as follows:

```javascript
let test = { firstName: 'Masteringjs', lastName: 'io' };
if (typeof test === 'object' && !Array.isArray(test) && test != null) {
  // do some really cool stuff
}
```

Whether you use the `Array.isArray()` check depends on your use case.
There are cases where you want to treat arrays as objects, and cases where you don't.

This check will allow any object through, including objects that are instances of classes.
If you need a more rigorous check as to check whether an object is a plain old JavaScript object (or [POJO](/tutorials/fundamentals/pojo) for short), you can use the below function.

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

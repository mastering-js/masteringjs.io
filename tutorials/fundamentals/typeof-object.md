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

Another edge case is that `typeof` returns 'function' for functions, but functions are technically objects.
There is no [JavaScript primitive](/tutorials/fundamentals/primitives) for functions, functions are objects that inherit from the global `Function` class.
To check if a value is an object, including functions, you can use the [`instanceof` operator](/tutorials/fundamentals/instanceof) as shown below.

```javascript
const fn = () => {};

typeof fn; // 'function'
fn instanceof Object; // true
```

### Checking for POJOs

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

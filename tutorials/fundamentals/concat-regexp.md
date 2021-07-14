To concatenate a regular expression in JavaScript, you can use a combination of the `+` operator and the `RegExp()` class as shown below.
You need to combine both the RegExp _source_ (the string representation of the RegExp) and _flags_ (options for the RegExp).

```javascript
let reg = /mastering/g;
let exp = /js/i;
let pattern = concatRegexp(reg, exp);
let string = 'masteringjs';
pattern.test('masteringjs'); // true

function concatRegexp(reg, exp) {
  let flags = reg.flags + exp.flags;
  flags = Array.from(new Set(flags.split(''))).join();
  return new RegExp(reg.source + exp.source, flags);
}
```

You are responsible for removing duplicate flags.
If you pass a duplicate flag to `new RegExp()`, JavaScript will throw a `SyntaxError: Invalid flags`.

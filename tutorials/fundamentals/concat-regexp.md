To concatenate a regular expression in JavaScript, you can use a combination
of the `+` operator, and the `new RegExp()` class:

```javascript
let reg = /mastering/g;
let exp = /js/i;
let pattern = concatRegexp(reg, exp);
let string = 'masteringjs';
string.search(pattern); // returns 0

function concatRegexp(reg, exp) {

let flags = reg.flags + exp.flags;
flags = Array.from(new Set(flags.split(''))).toString();
return new RegExp(reg.source + exp.source, flags);

}

```

You are responsible for removing duplicate flags.
If you pass a duplicate flag to `new RegExp()`, JavaScript will throw
a `SyntaxError: Invalid flags`.

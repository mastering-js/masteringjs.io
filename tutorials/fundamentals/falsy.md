In JavaScript, a value is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
if JavaScript's built-in type coercion converts it to `false`. For example,
consider the below `if` statement:

```javascript
if (v) {
  console.log('v is not falsy');
}
```

The `console.log()` will only run if `v` is **not** one of the below values:

- `false`
- `0`
- `0n`: 0 as a [BigInt](http://thecodebarbarian.com/an-overview-of-bigint-in-node-js.html)
- `''`: Empty string
- `null`
- `undefined`
- `NaN`

These 7 values are the only falsy values in JavaScript. Any value that is not falsy is [truthy](https://developer.mozilla.org/en-US/docs/Glossary/truthy). 

In particular, a non-null [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) is always truthy, even if its [`valueOf()` function](/tutorials/fundamentals/valueof) returns a falsy value.

```javascript
function isFalsy(v) {
  return !v;
}

// `false`. The object form of `0` is truthy, even though 0 is falsy.
isFalsy(new Number(0));
```

Recommendations
---------------

Using truthy/falsy for implicit type coercions in `if` statements is
typically messy. It is rare to find a case that the 7 falsy values are exactly
the set of values that you want to look out for.

For example, suppose you're implementing a function that checks that a string
is shorter than 25 characters.

```javascript
function checkLength(v) {
  if (!v) {
    throw new Error('Must provide a string!');
  }
  return v.length < 25;
}
```

Unfortunately, `checkLength('')` will throw an error because empty string is
falsy. Instead, you should check if `v` is a string:

```javascript
function checkLength(v) {
  if (typeof v !== 'string') {
    throw new Error('Must provide a string!');
  }
  return v.length < 25;
}
```

Nullish Values
--------------

Instead of checking for truthy/falsy values, you usually want to check for
"nullish" values. One of the common use cases for falsy checks is making sure
that you don't get a `TypeError: Cannot read property 'prop' of null` error 
when accessing a property of a value `v`.

It is it is safe to access `v.prop` unless `v` is strictly equal to `null` or 
`undefined`. Even `NaN.prop` is fine.

```javascript
const x = Number('abc');
x; // NaN
x.prop; // undefined
```

Checking if `v == null` is equivalent to `v === null || v === undefined`.
In other words, a value is loosely equal to `null` only if it is strictly
equal to `null` or `undefined`. So checking if `v == null` is often
more accurate than checking for truthy or falsy values.
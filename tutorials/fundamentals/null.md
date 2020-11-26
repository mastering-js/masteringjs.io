In JavaScript, [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null) is a value that represents the intentional absence of any object value.
It is technically a primitive type, although in some cases it behaves as an object. Here's
what you need to know about `null`:

Checking for `null`
-------------------

You can check whether a value is `null` using the [`===` operator](/tutorials/fundamentals/equals):

```javascript
if (v === null) {
  // Handle `null` case here
}
```

You may also see `== null`. Using double equals with `null` is a [shorthand for checking whether a value is null or undefined](/tutorials/fundamentals/equals#abstract-equality-with-) (so-called [_nullish values_](/tutorials/fundamentals/falsy#nullish-values)).

```javascript
v == null;

// Equivalent:
v === null || v === undefined;
```

Versus `undefined`
------------------

The JavaScript language spec explicitly defines [`null` as a value that represents the intentional absence of any object value](https://www.ecma-international.org/ecma-262/#sec-null-value). The difference between `null` and `undefined` is the source of some confusion. The primary difference is purely semantic: [`undefined` means the variable has not been assigned a value yet](https://www.ecma-international.org/ecma-262/#sec-undefined-value), whereas `null` means the variable has been explicitly defined as `null`.

For most practical purposes, `null` and `undefined` are often interchangeable as the only two nullish 
values. Nullish values are different from non-nullish values in that nullish values throw a `TypeError` 
when you try to access one of their properties, whereas non-nullish values do not.

```javascript
let v = 42;

v.test; // undefined

v = null;
v.test; // Throws `TypeError: Cannot read property 'test' of null`

v = undefined;
v.test; // Throws `TypeError: Cannot read property 'test' of undefined`
```

In most cases you'll run into as a JavaScript developer, `null` and `undefined` are practically
interchangeable. For example, if you're working with MongoDB and [Mongoose](https://mongoosejs.com/),
Mongoose stores `undefined` values as `null`.

However, there are a few minor differences between how `null` and `undefined` work with arithmetic operators and the `typeof` operator.

With Arithmetic Operators
-------------------------

For the purposes of arithmetic operations, `null` behaves like `0`. If you add, subtract, multiply, 
divide, or exponentiate `null`, JavaScript converts `null` to `0`.

```javascript
2 + null; // 2
null + 2; // 2

2 - null; // 2
null - 2; // -2

2 * null; // 0
null * 2; // 0

2 ** null; // 1
0 ** 2; // 0

null / 2; // 0
```

This is very different from `undefined`, which causes all arithmetic operations to result in [NaN](/tutorials/fundamentals/nan):

```javascript
2 + undefined; // NaN
2 * undefined; // NaN
2 - undefined; // NaN
2 ** undefined; // NaN
```

With [`typeof`](/tutorials/fundamentals/typeof)
-------------

One of the annoying quirks of `null` is that the [`typeof` operator](/tutorials/fundamentals/typeof#with-null) reports that the type of `null` is 'object':

```javascript
typeof null; // 'object'
```

[There is a historical reason for this behavior](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#null), but it still causes confusion. In order to check
if a value is an object and you can access its properties without error, you need a two-step check:

```javascript
function isObject(v) {
  return typeof v === 'object' && v !== null;
}
```
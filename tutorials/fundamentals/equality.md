JavaScript defines [4 different algorithms for determining whether two values are equal](/tutorials/fundamentals/equals):

1. Abstract equality: `==`
2. Strict equality: `===`
4. SameValue: `Object.is()`
4. SameValueZero: Same as `Object.is`, except `-0` is considered equal to `+0`.

Strict Equality, SameValueZero, SameValue
-----------------------------------------

Strict equality, SameValueZero, and SameValue are almost equivalent. They only differ in their handling of `NaN`,
`+0`, and `-0`. For all other values, the last 3 algorithms are identical.

**Strict Equality:** `NaN` is not strictly equal to any value, not even itself. In other words, `NaN !== NaN`. Also, `(+0) === (-0)`.

**SameValue:** The `Object.is()` function implements the SameValue algorithm. With the SameValue algorithm, `NaN` is equal to itself: `Object.is(NaN, NaN) === true`. But, on the other hand, `+0` is not equal to `-0`: `Object.is(+0, -0) === false`.

**SameValueZero:** There's no way to use SameValueZero directly, but the [`Array#includes()` method](/tutorials/fundamentals/array-includes) uses SameValueZero internally. So, to try out SameValueZero, you can use `includes()`. The only difference between SameValue and SameValueZero is that SameValueZero treats `+0` as equal to `-0`: `[+0].includes(-0) === true`.

As a developer, you should typically use `===`, with the understanding that you may need to add a special case if
you care about `NaN`. The distinction between `+0` and `-0` is not important for most use cases.

Abstract Equality
-----------------

[Abstract equality has numerous differences](/tutorials/fundamentals/equals). The abstract equality algorithm
supports several [implicit type conversions](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-abstract-equality-comparison). Here's a brief overview:

1. If `x` and `y` are the same type, check if `x === y`.
2. If `x` and `y` are both either `null` or `undefined`, return `true`.
3. If `x` is a number and `y` is a string, convert `y` to a number and then compare using `===`. Similarly, if `x` is a boolean or string, and `y` is a number, convert `x` to a number.
4. If `x` or `y` is a boolean, convert the other value of a number and compare them.
5. If `x` is an object and `y` is a symbol, string, or number, try to convert `x` to a primitive using valueOf() and then compare using `===`.

In general, you should **not** use abstract equality. The one potential exception is checking for [nullish values](/tutorials/fundamentals/falsy#nullish-values):

```javascript
// Only true if `v === null` or `v === undefined`
v == null;

// Equivalent:
v === null || v === undefined;
```

[ESLint has a rule to disallow == unless the right hand side is null](https://eslint.org/docs/rules/eqeqeq#allow-null).

Where These Equality Comparisons Are Used
-----------------------------------------

The tricky part of these different equality comparisons is that different JavaScript methods use different
equality algorithms internally. For example, the `Array#indexOf()` function uses strict equality, but `Array#includes()` uses SameValueZero, which leads to different behavior when searching for `NaN` in arrays:

```javascript
[NaN].indexOf(NaN); // -1, not found!

[NaN].includes(NaN); // true, found!
```

Here's where these different equality comparisons are used:

1. Strict Equality: `indexOf()`, `lastIndexOf`, [`case` statements](/tutorials/fundamentals/switch-case).
2. SameValueZero: `Set` values, [`Map` keys](/tutorials/fundamentals/map), `includes()`.
3. SameValue: [Used internally by `Object.defineProperty()`](http://ecma-international.org/ecma-262/5.1/#sec-11.9.3).
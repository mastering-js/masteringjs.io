In JavaScript, there are technically [4 different ways of comparing whether 2 values are equal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness). The 2 most common ways are the [`==` operator and the `===` operator](https://codeburst.io/javascript-showdown-vs-7be792be15b5), also known as _abstract equality comparison_ and [_strict equality comparison_](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-strict-equality-comparison).

Strict Equality With `===`
--------------------------

Given 2 values `x` and `y`, here's how JavaScript checks whether `x === y`:

1. Check the types of `x` and `y`. If they are different types, return `false`.
2. If `x` and `y` are numbers, first check if either `x` or `y` is `NaN`, and return `false` if one is `NaN`. If both `x` and `y` are either `+0` or `-0`, return `true`. Otherwise, check to see if they are the same number.
3. If `x` and `y` are both `null` or both `undefined`, return `true`.
4. If `x` and `y` are both booleans, both strings, or both symbols, compare them by value.
5. If `x` and `y` are both objects, return true if and only if they reference the same object.

In short, here are the important details of `===`:

1. No implicit type coercions. `===` doesn't call [`valueOf()`](/tutorials/fundamentals/valueof) or do anything else to try to convert objects to primitives.
2. No value is `=== NaN`. You should not use `===` to check for `NaN`, use [`Number.isNaN()` instead](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN).
3. Object comparison is [by reference](http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html) - two different objects can contain the exact same keys, but `===` will still say they're different.

```javascript
const obj1 = { answer: 42 };
const obj2 = { answer: 42 };

obj1 === obj2; // false
```

Abstract Equality With `==`
---------------------------

The `==` operator uses a more complex [abstract equality comparison](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-abstract-equality-comparison) algorithm to compare whether `x` and `y` are equal. Here's a brief overview:

1. If `x` and `y` are the same type, check if `x === y`.
2. If `x` and `y` are both either `null` or `undefined`, return `true`.
3. If `x` is a number and `y` is a string, [convert `y` to a number](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-tonumber) and then compare using `===`. Similarly, if `x` is a boolean or string, and `y` is a number, convert `x` to a number.
3. If `x` or `y` is a boolean, convert the other value of a number and compare them.
4. If `x` is an object and `y` is a symbol, string, or number, try to convert `x` to a primitive using [`valueOf()`](/tutorials/fundamentals/valueof) and then compare using `===`.

Abstract equality comparison is responsible for many of the [strange edge cases](https://www.destroyallsoftware.com/talks/wat) that JavaScript is so famous for.

```javascript
'    ' == 0; // true
'    ' == false; // true
({ valueOf: () => 42 }) == 42; // true
({ valueOf: () => 0 }) == false; // true
```

In general, you should always use `===` rather than `==` unless you're sure
you know what you're doing. There is one neat functional use for `==`: checking for `null` or `undefined` (so-called [nullish values](/tutorials/fundamentals/falsy#nullish-values)) with a single check:

```javascript
// Only true if `v === null` or `v === undefined`
v == null;

// Equivalent:
v === null || v === undefined;
```

Checking if `v == null` is a more concise way of checking if `v` is strictly
equal to `null` or `undefined`. You may choose to do this if you're a more
advanced JavaScript developer, but there is no harm in always using `===`.

[ESLint has a rule to disallow `==` _unless_ the right hand side is `null`](https://eslint.org/docs/rules/eqeqeq#allow-null), 

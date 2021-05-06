The [`typeof` operator](/tutorials/fundamentals/typeof) returns a string that contains the [primitive type](/tutorials/fundamentals/primitives) of the given variable.
When using this operator with numbers, it can return a few possibilities.
If you are using it with the number primitive, it will return `'number'`.

```javascript
let x = 42;
typeof x; // 'number'
```

If you use it with an instance of the `Number` class, it will
return `'object'`.

```javascript
let x = Number(42);
typeof x; // 'object'
```

Another primitive that is related to `number` is the `BigInt` primitive.
`typeof` will treat these two primitives separately because they are two
different primitives.

```javascript
let x = 42n;
typeof x; // 'bigint'
```

## NaNs

Using `typeof` to check whether a value is a valid number as a caveat.
[`NaN`](/tutorials/fundamentals/nan) is tricky because, even though it is
an acronym for "Not a Number", `typeof` returns `'number'` for `NaN`.

```javascript
typeof NaN; // 'number'
```

To check for a valid number, you must use a combination of `typeof` and
`Number.isNaN()`:

```javascript
let x = 42;
if (typeof x === 'number' && !Number.isNaN(x)) {
  x = 12;
}
x; // 12
```

## `Number.isSafeInteger()`

JavaScript has a [`Number.isSafeInteger()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger) that neatly handles checking if a value is an integer, including checking that the value is not `NaN`.

```javascript
Number.isSafeInteger(42); // true
Number.isSafeInteger(0); // true
Number.isSafeInteger(-1);

Number.isSafeInteger(3.14); // false
Number.isSafeInteger('42'); // false
Number.isSafeInteger(null); // false
Number.isSafeInteger(NaN); // false
```

If you want to check whether a value is a valid integer, `Number.isSafeInteger()` is the right choice. The only downside is that [Internet Explorer does **not** support `Number.isSafeInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger#browser_compatibility), so you may need a polyfill if you support legacy browsers.
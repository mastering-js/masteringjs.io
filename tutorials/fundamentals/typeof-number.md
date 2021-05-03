`typeof` is a useful operator that returns, in a string,
the [primitive type](/tutorials/fundamentals/primitives)
of the given variable. When using this operator with
numbers, it can return a few possibilities. If you are using
it with the number primitive, it will return `'number'`.

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

[`NaNs`](/tutorials/fundamentals/nan) are a bit tricky as even though it is
an acronym for `Not a Number`, it will return `'number'`.

```javascript
typeof NaN; // 'number'
```

To check for a valid number, you must use a combination of `typeof` and
`Number.isNan()`:

```javascript
var x = 42;
if (typeof x === 'number' && !Number.isNaN(x)) {
    x = 12;
}
x; // 12
```

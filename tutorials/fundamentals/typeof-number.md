`typeof` is a useful operator that returns, in a string,
the `typeof` the variable. When using this operator with
numbers, it can return a few possibilities. If you are using
it with the number primitive, it will return `'number'`.

```javascript
let x = 42;
typeof x; // 'number'
```

If you use it with an instance of the `Number` class, it will
return as an `'object'`.

```javascript
let x = Number(42);
typeof x; // 'object'
```

Another primitive that is related to `number` is the `BigInt` primitive.
`typeof` will treat these two primitives separately because they are two
different primitives.

```javascript
let x = 42n
typeof x; // 'bigint'
```

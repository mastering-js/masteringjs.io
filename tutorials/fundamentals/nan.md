`NaN`, which stands for "Not a Number", is a value that JavaScript returns from certain functions and operations
when the result should be a number, but the result is not defined or not representable as a number. For example:

1. `parseInt()` returns `NaN` if parsing failed: `parseInt('bad', 10)`
2. `Math.sqrt()` returns `NaN` if the given value is negative: `Math.sqrt(-1)`
3. Math operators return `NaN` when one of the operands isn't a number: `2 * NaN`, `3 ** undefined`, `4 / 'foo'`, etc. The exception is `+`, which JavaScript may treat as string concatenation.

Checking for `NaN`
------------------

The biggest quirk of `NaN` is that the [`===` operator says that `NaN` is not equal to itself](/tutorials/fundamentals/equality):

```javascript
NaN === NaN; // false
```

To check if a value is `NaN`, you should use the `Number.isNaN()` function:

```javascript
Number.isNaN(NaN); // true
Number.isNaN('test'); // false
```

You should **not** use the legacy global function `isNaN()`. This function checks if the given value would
result in `NaN` if you tried to convert it to a number, which can lead to surprising behavior:

```javascript
isNaN(NaN); // true
isNaN('test'); // true
```

Be careful when using the `typeof` operator with `NaN`: the `typeof` operator reports that `NaN` is a number!

```javascript
const v = parseInt('bad', 10);

v; // NaN
typeof v; // "number"
```

Serializing
-----------

One of the major reasons to avoid `NaN` is that most serializers don't have good support for `NaN`.

For example, `NaN` is **not** representable in JSON. The [`JSON.stringify()` function](/tutorials/fundamentals/stringify) converts `NaN` into `null`:

```javascript
const obj = { x: NaN };
JSON.stringify(obj); // '{"x":null}'
```

On the other hand, [Mongoose](https://mongoosejs.com/) validation throws an error when a numeric value is `NaN`:

```javascript
const Model = mongoose.model('Test', Schema({ test: Number }));
// Throws 'Cast to Number failed for value "NaN" at path "test"'
const doc = await Model.create({ test: NaN });
```

In general, you should consider encountering `NaN` an error unless you have a good reason not to. Writing `NaN`
to a database or in an HTTP request usually ends up either causing an error or ending up as a `null` value.
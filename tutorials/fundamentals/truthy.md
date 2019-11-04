In JavaScript, a value is [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) if JavaScript's built-in type coercion converts it to `true`.
Every value is either truthy or [falsy](/tutorials/fundamentals/falsy), so
any value that isn't falsy must be truthy.

Truthy and falsy usually come up in the context of `if` statements. For
example, the below `if` statement will print if and only if `v` is truthy.

```javascript
if (v) {
  console.log('v is truthy!');
}
```

Remember that there are [only 7 values in JavaScript that are falsy](/tutorials/fundamentals/falsy):

- `false`
- `0`
- `0n`: 0 as a [BigInt](http://thecodebarbarian.com/an-overview-of-bigint-in-node-js.html)
- `''`: Empty string
- `null`
- `undefined`
- `NaN`

Every other value is truthy. For example, even a [`Boolean` object containing `false`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) is truthy.

```javascript
const v = new Boolean(false);

// Will print! All JavaScript objects are truthy.
if (v) {
  console.log('v is truthy!');
}
```

With the Logical NOT Operator
-----------------------------

The [logical NOT operator in JavaScript](/tutorials/fundamentals/logical-operators#logical-not) converts truthy values to `false` and
falsy values to `true`. In other words, the logical `!` operator lets
you store the value JavaScript's built-in boolean coercion converts `v` into.

```javascript
// `b` will be false if `v` is truthy
const b = !v;
```

You might see the logical NOT operator twice in a row: `!!v`. This is
how you convert a value to a boolean using JavaScript's built-in coercion.

```javascript
// `isTruthy` is true if and only if `v` is truthy.
const isTruthy = !!v;
```
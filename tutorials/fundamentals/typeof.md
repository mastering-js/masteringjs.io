The [`typeof` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) returns the type of a given variable
as a string.

```javascript
[require:Fundamentals typeof with basic values$]
```

Here's the general idea: the `typeof` operator returns [which of the 8 JavaScript data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) a given value is. There's one key exception to this
rule: `null`.

With `null`
-----------

The one big gotcha with `typeof` is that `typeof null === 'object'`.
[There is a historical reason for this behavior](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#null), and a proposal to change this behavior was rejected, so it looks like JavaScript is stuck
with this quirk.

The workaround to check whether a value is actually an object with
`typeof` is to check whether the type is `'object'` and the value
is not [strictly equal](/tutorials/fundamentals/equals) to `null`.

```javascript
function isObject(v) {
  return typeof v === 'object' && v !== null;
}
```

Error Cases
-----------

The `typeof` operator can throw an error if you use it on
a [block scope variable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) before you define it.

```javascript
// Throws 'ReferenceError: v is not defined'
console.log(typeof v);

let v;
```

This behavior **only** applies for block scoped variables. For example,
if you don't define `v` at all, the above script will work fine.

```javascript
console.log(typeof v); // 'undefined'

//let v;
```

Block scoped variables are the only case where `typeof` throws an
error. Otherwise, `typeof` will always succeed.
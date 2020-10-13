The [`Array#includes()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) returns `true` if the array contains a given element, or `false` otherwise.

```javascript
[require:Fundamentals Array includes basic case$]
```

Equality Comparison
-------------------

The `includes()` method uses the ["SameValueZero" algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Same-value-zero_equality) for determining if two values are equal. For almost all
cases, "SameValueZero" is equivalent to [strict equality using `===`](/tutorials/fundamentals/equals). In particular,
`includes()` does **not** do any type coercion.

```javascript
[require:Fundamentals Array includes types$]
```

The `includes()` only treats two objects as equal if they are the same reference:

```javascript
[require:Fundamentals Array includes objects$]
```

The only difference is how SameValueZero handles [`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN). In JavaScript, `NaN !== NaN`. However, `includes()` can correctly find `NaN` and `Number.NaN` in an
array.

```javascript
[require:Fundamentals Array includes NaN$]
```

Environment Support
-------------------

The `includes()` method was introduced in [ES2016](https://2ality.com/2016/02/array-prototype-includes.html), which makes
it a relatively new feature. In particular, no version Internet Explorer supports `includes()`. If you expect your
JavaScript to run in Internet Explorer or versions of Node.js before 5.0.0, you should use `indexOf()`, which enjoys
better browser support and is [equivalent _except_ for `NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf).
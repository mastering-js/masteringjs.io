The [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) provides a concise syntax for setting a default value if the given value is _[nullish](/tutorials/fundamentals/falsy#nullish-values)_.
[`null`](/tutorials/fundamentals/null) and [`undefined`](/tutorials/fundamentals/undefined-check) are the only nullish values in JavaScript.

```javascript
function getAnswer(answer) {
  // Return `42` if `answer` is null or undefined, otherwise return `answer`
  return answer ?? 42;
}

getAnswer('hello'); // 'hello'
getAnswer(''); // ''
getAnswer(0); // 0

getAnswer(null); // 42
getAnswer(undefined); // 42
```

Nullish coalescing is typically used for assigning default values.
Older JavaScript code often used `||` for assigning default values, but `||` is error prone because it captures all [falsy values](/tutorials/fundamentals/falsy), like `0`, empty string, and `false`.

```javascript
function format(options) {
  // Good: `uppercase` will be `true` if `options` is not specified,
  // or if `options.uppercase` is `null` or `undefined`.
  const uppercase = options?.uppercase ?? true;

  // Bad! `uppercase` will be `true` if `options.uppercase === false`
  const uppercase = options?.uppercase || true;
}
```

## Nullish Coalescing Assignment

The [nullish coalescing assignment operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment) is similar to the nullish coalescing operator, just for assignments.
Nullish coalescing assignment only assigns the value if the left hand side is nullish.
`x ??= y` is equivalent to `x = x ?? y`.

```javascript
function setDefaultOptions(options) {
  // If `options.uppercase` is `null` or `undefined`, set to `true`.
  // Otherwise, no-op
  options.uppercase ??= true;

  // The following is equivalent
  options.uppercase = options.uppercase ?? true;
}
```

## Pre-ES2020 Alternative

The [nullish coalescing operator was introduced in ES2020](https://2ality.com/2019/08/nullish-coalescing.html), which makes it a relatively new addition to the JavaScript language.
For example, the nullish coalescing operator isn't supported in Node.js 12.
However, there is a concise alternative with the ternary operator that works in any version of JavaScript.

```javascript
function getAnswer(answer) {
  // Equivalent to `return answer ?? 42;`
  return answer == null ? 42 : answer;
}
```
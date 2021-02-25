In JavaScript, checking if a variable is undefined can be a bit tricky since
a [null](/tutorials/fundamentals/null) variable can pass a check for `undefined` if not written properly.
As a result, this allows for `undefined` values to slip through and vice versa. Make sure you use strict equality `===` to check if a value is
equal to `undefined`.

```javascript
[require:Fundamentals good-undefined-check]
```

Another alternative is checking if [`typeof x === 'undefined'`](/tutorials/fundamentals/typeof). The
biggest difference between these two approaches is that, if `v` has not been declared, `x === undefined` throws
a `ReferenceError`, but `typeof` does not.

When using `x === undefined`, JavaScript checks if `x` is a declared variable
that is strictly equal to `undefined`. If you want to check if `x` is
strictly equal to `undefined` regardless of whether is has been declared
or not, you should use `typeof x === 'undefined'`.

```javascript
[require:Fundamentals bad-undefined-check]
```

# Checking Whether Object Properties are Undefined

Checking whether an object property is `undefined` is subtle, because if you access
a property that doesn't exist in the object, JavaScript will report the property's value as `undefined`
rather than throw a `ReferenceError`.

```javascript
const obj = { answer: 42, question: undefined };

obj.answer; // 42
obj.question; // undefined
obj.notInObject; // undefined
```

In JavaScript `obj.propName === undefined` is `true` if either `obj` has a property 'propName' and the property's
value is trictly equal undefined, or if `obj` does not have a property 'propName'. If you want to check whether
`obj` has a property and that property is strictly equal to `undefined`, you should use the `in` operator.

```javascript
[require:Fundamentals undefined-objects]
```

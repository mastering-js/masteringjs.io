In JavaScript, checking if a variable is undefined can be a bit tricky since
a [null](/tutorials/fundamentals/null) variable can pass a check for `undefined` if not written properly.
As a result, this allows for `undefined` values to slip through and vice versa. Make sure you use strict equality `===` to check if a value is
equal to `undefined`.

```javascript
[require:Fundamentals good-undefined-check]
```

You should not check if the variable is `undefined` but instead check if the `typeof` the variable is 'undefined'.
If the variable does not exist you will get a `ReferenceError` but using `typeof` circumvents this problem.
When using `x === undefined`, it checks if `x` is a declared variable
that is strictyl equal to `undefined`. If you want to check if `x` is
strictly equal to `undefined` regardless of whether is has been declared
or not, you should use `typeof x === 'undefined'`.

```javascript
[require:Fundamentals bad-undefined-check]
```

**Note:** Although you can assign `undefined` anywhere but the
[global scope](/tutorials/fundamentals/global-variable), you should avoid doing that.
Doing so makes the code difficult to maintain and debug as it will lead to problems.

# Checking Whether Object Properties are Undefined

[Objects](/tutorials/fundamentals/pojo) are special because over the course of a program execution, properties
can be assigned, removed, and added. As a result, they will not throw
`ReferenceErrors` but instead return undefined. To check if an object has
an undefined property, you can use strictly equals or
[hasOwnProperty()](/tutorials/fundamentals/hasownproperty).

```javascript
[require:Fundamentals undefined-objects]
```

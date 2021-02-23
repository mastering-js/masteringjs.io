In JavaScript, checking if a variable is undefined can be a bit tricky since
a [null](/tutorials/fundamentals/null) variable can pass a check for undefined if not written properly.
As a result, this allows for `undefined` values to slip through and vice versa.
This is because `null` and `undefined` both mean nothing, so checking if they
are equal `==` would return true. However, if you were to check if they were
strictly equal `===`, it would return false as they are different ways of saying nothing.

```javascript
[require:Fundamentals good-undefined-check]
```

Objects are special because over the course of a program execution, properties
can be assigned, removed, and added. As a result, they will not throw
`ReferenceErrors` but instead return undefined.

```javascript
[require:Fundamentals undefined-objects]
```

You should not check if the variable is `undefined` but instead check if the `typeof` the variable is 'undefined'.
If the variable does not exist you will get a `ReferenceError` but using `typeof` circumvents this problem.

```javascript
[require:Fundamentals bad-undefined-check]
```

**Note:** Although you can assign `undefined` anywhere but the
[global scope](/tutorials/fundamentals/global-variable), you should avoid doing that.
Doing so makes the code difficult to maintain and debug as it will lead to problems.

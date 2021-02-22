In JavaScript, checking if a variable is undefined can be a bit tricky since
a [null](/tutorials/fundamentals/null) variable can pass a check for undefined if not written properly.
As a result, this allows for `undefined` values to slip through and vice versa.
This is because `null` and `undefined` both mean nothing so checking if they
are equal would return true. However, if you were to check if they were
strictyl equal, it would return false as they are different ways of saying nothing.

```javascript
[require:Fundamentals good-undefined-check]
```

A variable becomes `null` when it is assigned something that returns `null` and is not
a boolean.
An example would be using the `match()` function to check if a string matches
a regular expression and returns the match.
In the absence of a match, it would return `null` since it is not a boolean function.
This can be seen below:

```javascript
[require:Fundamentals become-null]
```

A variable becomes `undefined` when it has never been given a value.

You should not check with `undefined` but instead use `typeof` in the if statements as it is possible to overwrite
that value and it can lead to problems later down the road if you are not careful. It is also possible
that if the variable is never declared you can get a `ReferenceError` and impede your project.

```javascript
[require:Fundamentals bad-undefined-check]
```

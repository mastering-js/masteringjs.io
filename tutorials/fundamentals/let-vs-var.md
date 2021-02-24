In JavaScript, you can use `let` or `var` to declare mutable variables.
A variable with the `let` keyword will only be used within the
block it is declared and not affect variables
used in nested blocks, like `if` statements
and `for` loops, or outside the block. Below is an example:

```javascript
[require:Fundamentals let$]
```

The other option is `var`. The `var` keyword's reach can be function-scoped or
[globally-scoped](/tutorials/fundamentals/global-variable). `var` variables declared in
functions will not bleed into other functions, but will into nested
blocks, like `if` statements and `for` loops.

```javascript
[require:Fundamentals var$]
```

Hoisting
--------

Another difference between `let` and `var` is that `var` declarations are "hoisted" up to the top of the function call,
which means you can use a variable declared with `var` _before_ the actual `var` statement. This is a common source
of confusion, which is one of the reasons why we recommend using `let` instead of `var`.

```javascript
[require:Fundamentals var hoisting$]
```

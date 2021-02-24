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

Another difference between `let` and `var` is you can use a variable declared with `var` _before_ the actual `var` 
statement. This is because JavaScript "hoists" all `var` declaration to the start of the function call.
This is a common source of confusion, which is one of the reasons why we recommend using `let` instead of `var`.

```javascript
[require:Fundamentals var hoisting$]
```

`let` declarations are hoisted too, but you get a `ReferenceError` if you try to access a variable declared with `let` before the actual declaration statement runs. That is why the error message is "Cannot access 'y' before initialization", as opposed to "y is not defined", which is what JavaScript would throw if you didn't declare `y` at all.
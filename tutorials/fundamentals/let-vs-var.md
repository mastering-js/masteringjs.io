In JavaScript, you can use `let` or `var` to declare mutable variables.
A variable with the `let` keyword will only be used within the
block it is declared and not affect variables
used in nested blocks, like `if` statements
and `for` loops, or outside the block. Below is an example:

```javascript
[require:Fundamentals let]
```

The other option is `var`. The `var` keyword's reach can be function-scoped or
[globally-scoped](/tutorials/fundamentals/global-variable). `var` variables declared in
functions will not bleed into other functions but will into nested
blocks, like `if` statements and `for` loops. Globally-scoped `var` variables will also not
bleed into functions which is shown below:

```javascript
[require:Fundamentals var]
```

Note: We recommend not mixing `let` and `var` because you can get a
`SyntaxError` due to `var` being hoisted if positioned improperly.

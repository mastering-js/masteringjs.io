In JavaScript, the programmer has two options when declaring a mutable variable: `let` and `var`.
The `let` keyword's reach is local-scoped in a program. a varible with the `let` keyword
will only be used within the block it is declared and not affect variables
used in nested blocks or outside the block. An example of this can be seen below:

```javascript
[require:Fundamentals let]
```

The other option is `var`. The `var` keyword's reach can be function-scoped or
[globally-scoped](/tutorials/fundamentals/global-variable). `var` variables declared in
functions will not bleed into other functions but will into nested
blocks. Globally-scoped `var` variables will also not
bleed into functions which can be seen below:

```javascript
[require:Fundamentals var]
```

Note: Be careful when combining `let` and `var` as you can get a
`SyntaxError` due to `var` being hoisted if positioned improperly.

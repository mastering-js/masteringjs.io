The [`switch` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) evaluates an expression, and executes a block of code based on which `case` the expression evaluated to.

```javascript
[require:Fundamentals switch basic example$]
```

Make sure you don't forget the `break` statement at the end of a block!
If you don't put a `break` statement at the end of a `case` block,
JavaScript will "fall through" to the next `case`.

```javascript
[require:Fundamentals switch missing break$]
```

There are some benefits to this behavior. You can execute one block
for multiple `case` statements. For example:

```javascript
[require:Fundamentals switch fallthrough$]
```

Equality Check
--------------

The `switch` statement evaluates the given expression once, and compares
it against each `case` expression using [strict equality](https://masteringjs.io/tutorials/fundamentals/equals#strict-equality-with-). The below `if` statement
is functionally equivalent to the first example:

```javascript
[require:Fundamentals switch using if$]
```

Because the `switch` statement uses strict equality, you're responsible
for doing type conversions if you want to compare objects, like [dates](/tutorials/fundamentals/date_format)
or [MongoDB ObjectIds](https://docs.mongodb.com/manual/reference/method/ObjectId/).

```javascript
[require:Fundamentals switch object types$]
```

Alternatives
------------

Unless you're using fallthrough `case` statements, you can use `if` as a
replacement for `switch/case`. Another alternative is defining an object
or [map](https://thecodebarbarian.com/the-80-20-guide-to-maps-in-javascript.html)
that contains functions to execute based on `case`:

```javascript
[require:Fundamentals switch using object conditional$]
```

The advantage of using an object conditional is you can build up the object
programatically. If your `switch` statement is getting a little too repetitive,
you can instead build up an object conditional with a `for` loop.

Recommended Use
---------------

The `switch` statement comes with a lot of gotchas, like unintentionally
falling through to the next `case` statement. [ESLint has a `no-fallthrough` rule](https://eslint.org/docs/rules/no-fallthrough) that can help you catch this at the linter level.
However, there's rarely a reason to use `switch` as opposed to `if/else if` or
objects - because `switch` is less common than `if`, fewer developers are
comfortable with the semantics of `switch`.
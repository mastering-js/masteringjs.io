JavaScript has 3 [logical operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators):

- `!`: Logical NOT
- `&&`: Logical AND
- `||`: Logical OR

Logical NOT
-----------

The logical not operator `!` checks whether a value is [truthy](/tutorials/fundamentals/truthy) or [falsy](/tutorials/fundamentals/falsy). In other words, `!v === false` **unless** `v` is one
of the below 7 values:

- `false`
- `0`
- `0n`: 0 as a [BigInt](http://thecodebarbarian.com/an-overview-of-bigint-in-node-js.html)
- `''`: Empty string
- `null`
- `undefined`
- [`NaN`](/tutorials/fundamentals/nan)

```javascript
[require:Fundamentals.*logical operators not$]
```

The not operator always returns a boolean, unlike `||` and `&&`. A common
way to convert a value `v` to a boolean is to use the logical not operator twice:

```javascript
// Convert `v` to a boolean
!!v;
```

Logical OR
----------

The logical or operator `||` operates on 2 values, and returns a truthy
value if at least one of the values is truthy.

```javascript
// True if `a` or `b` is truthy. Will only be `false` if
// both `a` and `b` are falsy.
!!(a || b);
```

The logical or operator is most often used in `if` statements to execute
the `if` block if one of multiple conditions is true. But, the logical
or operator does **not** necessarily return a boolean:

- If `a` is truthy, `(a || b) === a`
- If `a` is falsy, `(a || b) === b`

This works neatly with multiple or operators: `a || b || c || d` returns
the leftmost value that is truthy. Because of this, logical or is often
used for default values:

```javascript
const defaultNumReps = 2;

function repeat(str, numReps) {
  // If `numReps` is null, undefined, or 0, this sets
  // `numReps` to the default value `2`
  numReps = numReps || defaultNumReps;

  let ret = '';
  for (let i = 0; i < numReps; ++i) {
    ret += str;
  }
  return ret;
}
```

Logical AND
-----------

The logical and operator `&&` operates on 2 values, and returns falsy
if at least one of the values is falsy:

```javascript
// Only true if both `a` and `b` are truthy.
!!(a && b);
```

The logical and operator is most often used in `if` statements to execute
the `if` block if multiple conditions are all true. But, like the logical
or operator, the logical and operator doesn't necessarily return a boolean:

- If `a` is falsy, `(a && b) === a`
- If `a` is truthy, `(a && b) === b`

Given a chain of multiple logical and operators `a && b && c && d`, JavaScript
returns the left-most falsy value.
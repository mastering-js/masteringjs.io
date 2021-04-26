Javascript has seven primitive data types:

- string
- number
- bigint
- boolean
- undefined
- symbol
- null

What makes these primitives is that they are not objects,
they do not have any methods, and they are immutable,
meaning that they cannot be altered in any way.
If you wanted to mutate a primitive, you would need
to do a reassignment of the variable.

## String

It is important to note that strings can be either a primitive, string literal,
or an object. Javascript automatically converts string primitives to objects to enable
the user to use the handy array of functions available for use.
If you wanted to convert a string object to a primitive, you would
use the `valueOf()` method.

## Number

In other programming languages, you can have numbers be defined as floats, integers,
doubles and so on and so forth. Javascript simplified this feature by just making
every number it comes across `Number`, with an exception.

## BigInt

This is similar to `Number` however, it allows you to safely represent integer values
larger than 2<sup>53</sup>.

## Boolean

This data type is what contains the values `true` or `false`. This is great in that
you can use other values to represent that same concept like 0 for false, and 1 for true.

## Undefined

This value is automatically assigned to variables that have just been declared but not defined.
If you were to put this in an if statement, the value would be false so this is another handy thing
you could use like mentioned in the `Boolean` section.

## Symbol

A `Symbol` is a value created by invoking the `Symbol` function which is guaranteed to create
a unique value. Interesting to note that `Symbols` do not convert to string unless called using
the `.toString()` method.

## Null

`null` is special as if you were to use the `typeof` operator on it, it would return `object`.
It returns `object` because of a bug with Javascript that if fixed, breaks the code.

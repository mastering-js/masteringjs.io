Javascript has seven primitive data types:

- string
- number
- bigint
- boolean
- undefined
- symbol
- null

In JavaScript, a primitive is any value that isn't an object.

## String

It is important to note that strings can be either a primitive, string literal,
or an object. Javascript automatically converts string primitives to objects to enable
the user to use the handy array of functions available for use.
If you wanted to convert a string object to a primitive, you would
use the `valueOf()` method.

```javascript
let message = "Hello World";
typeof message; // string
```

## Number

In other programming languages, you can have numbers be defined as floats, integers,
doubles and so on and so forth. Javascript simplified this feature by just making
every number it comes across `Number`, with an exception.

```javascript
let password = 123456789;
typeof password; // Number
```

## BigInt

This is similar to `Number` however, it allows you to safely represent integer values
larger than 2<sup>53</sup>. You can create a `bigint` by appending n to the end of the
number or by wrapping the number, or string for this case, in the `BigInt()` constructor.

```javascript
let launchCodes = 66777888889999912345n;
typeof launchCodes; // bigint
```

## Boolean

This data type is what contains the values `true` or `false`. This is great in that
you can use other values to represent that same concept like 0 for false, and 1 for true.

```javascript
isBool = true;
typeof isBool; // boolean
typeof new Boolean(isBool); // object
```

## Undefined

This value is automatically assigned to variables that have just been declared but not defined.
If you were to put this in an if statement, the value would be false so this is another handy thing
you could use like mentioned in the `Boolean` section.

```javascript
let x;
if (x) return false; // will not execute
typeof x; // undefined
```

## Symbol

A [`Symbol`](/tutorials/fundamentals/symbol) is a value created by invoking the `Symbol` function
which is guaranteed to create a unique value. It takes one parameter, a string `description`, that
will show up when you print the symbol. Interesting to note that `Symbols` do not convert to
string unless called using the `.toString()` method.

```javascript
let x = Symbol("this is a symbol");
typeof x; // symbol
```

## Null

`null` is special as if you were to use the `typeof` operator on it, it would return `object`.
It returns `object` because of a bug with Javascript that if fixed, breaks the code.

```javascript
typeof null; // object
```

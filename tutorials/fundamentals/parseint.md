JavaScript has a built-in [`parseInt()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) that parses a string into a number.
The `parseInt()` function takes 2 parameters: the string to parse, and the radix.
You should set the radix parameter to 10, unless you are positive you need to set it to something else.

```javascript
parseInt('42', 10); // 42

// `parseInt()` also ignores leading and trailing whitespace
parseInt('  42', 10); // 42
parseInt('42  ', 10); // 42
```

The `parseInt()` function ignores any non-numeric characters after the number, and ignores leading whitespace.
It also handles numbers that start with `+`.

```javascript
parseInt('42abc', 10); // 42
parseInt('42,77', 10); // 42
parseInt('+42', 10); // 42
parseInt('-42', 10); // -42
```

Error Handling
--------------

If you pass in a string that doesn't contain a valid number, `parseInt()` will return [`NaN`](/tutorials/fundamentals/nan).
`parseInt()` will **not** throw an error.

```javascript
parseInt('a42', 10); // NaN
```

Radix
-----

The radix parameter represents the numeric base, like 2 for binary or 16 for hexadecimal.
Mastering JS uses the radix parameter for [converting binary to decimal](/tutorials/tools/binary-to-decimal) and [decimal to binary](/tutorials/fundamentals/decimal-to-binary)
For example, you can also use `parseInt()` to parse binary or hexadecimal strings as follows.

```javascript
parseInt('10110', 2); // 22
parseInt('FA', 16); // 250
```

The reason why you should always explicitly set the radix to 10 is because `parseInt()` assumes strings that starts with `0x` or `0X` should be parsed as hexadecimal _unless_ radix is explicitly set.

```javascript
parseInt('0xFF'); // 255, radix set to 16 implicitly
parseInt('0xFF', 10); // 0
```
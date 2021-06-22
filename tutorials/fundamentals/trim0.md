We recommend using regular expressions and the [string `replace()` method](/tutorials/fundamentals/string-replace) to remove leading zeros from a string.

```javascript
let x = '0042';
x = x.replace(/^0+/, '');

x; // '42';
typeof x; // 'string'
```

## Converting to a Number

You may have seen code that uses `x * 1` or `+x` to remove leading zeros from a string.
This approach works for basic cases, with the key difference that you end up with a number rather than a string.

```javascript
let x = '0042';
x = parseInt(x);

x; // 42
typeof x; // 'number'

let y = '007';
y = +y;
y; // 7
typeof y; // 'number'
```

However, things get tricky with strings that contain [hex, octal, and binary literals](https://www.javascripttutorial.net/es6/octal-and-binary-literals/) as shown below.

```javascript
let x = '0xFF';
x = +x;
x; // 255
```

Whether this behavior is correct depends on your use case.
However, if you want to treat `x` as a string and remove leading zeros, the correct output here would be `'xFF'`.
In that case, using `+` or `parseInt()` won't work.
You can tell `parseInt()` to always use base 10 and avoid parsing strings that start with `0x` as hexadecimal numbers, but then you end up with a `0`.

```javascript
let x = '0xFF';
x = parseInt(x, 10);

x; // 0, because `parseInt()` parses as much as it can
typeof x; // 'number'
```
Most JavaScript objects and primitive values have a `toString()` function that converts
the value to a string. Many built-in methods use `toString()` under the hood, like the [browser's `alert()` function](http://adripofjavascript.com/blog/drips/using-javascripts-tostring-method.html).

Primitives
--------

JavaScript number primitives have a `toString()` function that converts the number to a string.
This is one of the most common uses for `toString()`:

```javascript
const num = 42;

num.toString(); // '42'
typeof num.toString(); // 'string'

// Can also use `toString()` on a number literal as long as you
// use parentheses.
(42).toString(); // '42'
```

All [primitive values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) **except** `null` and `undefined` have a `toString()` function: strings, numbers, booleans, BigInts, and
[symbols](/tutorials/fundamentals/symbol).

```javascript
// String:
'Hello'.toString(); // 'Hello'

// Number:
(42).toString(); // '42'

// Boolean:
true.toString(); // 'true'

// BigInt:
42n.toString(); // '42'

// Symbol:
Symbol('test').toString(); // 'Symbol(test)'
```

The important takeaway is that it is safe to call `toString()` on an arbitrary JavaScript value
**as long as that value is not `null` or `undefined`**. The easiest way to check is to use `== null`:
[the most common use for `==`](/tutorials/fundamentals/equals#abstract-equality-with-) is that `v == null` is shorthand for `v === null || v === undefined`.

```javascript
if (v != null) {
  // Won't throw an error, unless you wrote a custom `toString()` that throws
  v.toString();
}
```

Objects
-------

The `Object` class in JavaScript is the base class for all objects, and it has a simple `toString()`
method that usually prints `[object Object]`:

```javascript
// Equivalent to `const obj = {};`
const obj = new Object();

obj.toString(); // '[object Object]'
```

The `[object Object]` output is often confusing to beginners because they want to see the object's
keys and values. You can loop over the object's keys and values yourself, but the easiest one-liner is to use [`JSON.stringify()`](https://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript).

```javascript
const obj = { name: 'Jean-Luc Picard', rank: 'Captain' };

// '{"name":"Jean-Luc Picard","rank":"Captain"}'
console.log(JSON.stringify(obj));
```

If you define a [JavaScript class](/tutorials/fundamentals/class), you can overwrite the `toString()`
function to return whatever you want:

```javascript
class MyClass {
  toString() {
    return 'Hello, World!';
  }
}

const obj = new MyClass();
obj.toString(); // 'Hello, World!'
```

`toString()` Parameters
-----------------------

Some `toString()` functions take parameters, most notably numbers and [Node.js buffers](/tutorials/node/buffer).

The `toString()` function for JavaScript numbers takes a `radix` parameter that defines the base of
the numeral system. In other words, `num.toString(2)` converts the number to a [binary number](https://en.wikipedia.org/wiki/Binary_number) string, `num.toString(10)` converts the number to a base-10 string,
and `num.toString(16)` converts the number to a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) string.

```javascript
(3).toString(2); // '11'

(42).toString(10); // '42'

(29).toString(16); // '1d'
```

The [Node.js buffer `toString()` function](/tutorials/node/buffer-to-string) takes an `encoding`
parameter that is usually one of 'utf8', 'hex', or 'base64'. This determines how the raw data in
the buffer is encoded.

```javascript
[require:Node buffers toString utf8$]
```

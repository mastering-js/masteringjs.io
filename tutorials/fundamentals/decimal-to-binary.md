A [binary number](https://en.wikipedia.org/wiki/Binary_number) is a number expressed in base-2, as opposed to conventional decimal numbers in base-10.

Converting decimal numbers to binary in JavaScript is easy.
For example, `let x = 42` creates a new variable `x` that contains the base 10 number `42`.
JavaScript numbers have a [`toString()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString) that takes a `radix` parameter.
Calling `x.toString(2)` tells JavaScript to convert `x` to a string containing the binary representation of `42`.

```javascript
let x = 42;

x.toString(2); // '101010'
```

The `toString()` method also handles non-integers and negative numbers. For example:

```javascript
x = 3.14;
x.toString(2); // '11.001000111101011100001010001111010111000010100011111'

x = -7;
x.string(2); // '-111'
```

Below is a live calculator.

<input type="number" id="decimal" value="42" />
-> <span id="result"></span>
<script>
  document.querySelector('#result').innerHTML = parseFloat(document.querySelector('#decimal').value).toString(2);
  document.querySelector('#decimal').addEventListener('change', function() {
    const value = parseFloat(document.querySelector('#decimal').value);
    if (value == null || isNaN(value)) {
      return;
    } 
    document.querySelector('#result').innerHTML = value.toString(2);
  });
</script>

## Mental Math

How do you quickly convert `7` to `111` in your head?
It takes some practice to make it easy, but here's [the procedure](https://www.tutorialspoint.com/how-to-convert-decimal-to-binary) to convert a positive integer `v` to a binary string:

- Start with an empty string
- Take `v` [modulo](/tutorials/fundamentals/modulus) 2 and add it to the end of the string
- Repeat with `Math.floor(v / 2)` until you get to 0 or 1

Below is a JavaScript function that implements the above procedure:

```javascript
function toBinary(v, str) {
  if (!Number.isSafeInteger(v) || v < 0) {
    throw new Error('v must be a non-negative integer');
  }
  if (v === 1) {
    return '1';
  }
  if (v === 0) {
    return '0';
  }
  return toBinary(Math.floor(v / 2)) + (v % 2);
}
```

Here's what the procedure looks like with 42:

1. `42 % 2 === 0`, '0'
2. `21 % 2 === 1`, '10'
3. `10 % 2 === 0`, '010'
4. `5 % 2 === 1`, '1010'
5. `2 % 2 === 0`, '01010'
6. `1`, '101010'
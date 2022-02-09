A [binary number](https://en.wikipedia.org/wiki/Binary_number) is a number expressed in base-2, as opposed to conventional decimal numbers in base-10.

Below is a live calculator.

<style>
  #binary {
    font-size: 1.5em;
    padding: 0.25em;
    border-radius: 4px;
  }

  #result {
    display: inline-block;
    font-size: 1.5em;
    padding: 0.25em;
    border-radius: 4px;
    background-color: #ddd;
    width: 310px;
    overflow-wrap: anywhere;
  }

  #right-arrow {
    font-size: 2em;
    padding: 0.25em;
    padding-left: 0.5em;
    padding-right: 0.5em;
  }

  @media (max-width: 1000px) {
    #decimal {
      width: 100%;
    }

    #result {
      width: 8em;
    }
  }
</style>

<table>
  <thead>
    <th>Binary</th>
    <th></th>
    <th>Decimal</th>
  </thead>
  <tr>
    <td>
      <input type="number" id="binary" placeholder="101010" />
    </td>
    <td id="right-arrow">
      &#10140;
    </td>
    <td>
      <div id="result"></div>
    </td>
  </tr>
</table>
<script>
  document.querySelector('#result').innerHTML = parseInt(101010, 2);
  document.querySelector('#binary').addEventListener('change', function() {
    const value = parseInt(document.querySelector('#binary').value, 2);
    if (value == null || isNaN(value)) {
      return;
    } 
    document.querySelector('#result').innerHTML = value;
  });
  document.querySelector('#binary').addEventListener('keyup', function() {
    const value = parseInt(document.querySelector('#binary').value, 2);
    if (value == null || isNaN(value)) {
      return;
    } 
    document.querySelector('#result').innerHTML = value;
  });
  document.querySelector('#binary').focus();
</script>

## How the Calculator Works

Converting binary numbers to decimal is easy.
For example, `let x = '101010'` creates a new variable `x` that contains the number as a string `101010`.
JavaScript has a [`parseInt()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) that takes a `binary` and `radix` parameter, and returns a number.
Calling `parseInt(binary, radix)` tells JavaScript to convert `binary` to a number containing the decimal representation of `101010`.
If `binary` is not a string, it will be converted to one using the `toString()` function.

```javascript
let x = '101010';

parseInt(x, 2) // 42
```

The `toString()` method also handles non-integers and negative numbers. For example:

```javascript
x = -101010
parseInt(x, 2); // -42

x = 101010.101010;
parseInt(x, 2); // 42
```

## No Technology Method

How do you quickly convert `101010` to `42` without a computer?
It takes some practice to make it easy, but here's [a few ways](https://www.wikihow.com/Convert-from-Binary-to-Decimal) to convert a binary string to a decimal number.
One method discussed is doubling, described below:

- Take the binary string.
- Starting from the left, double your previous total and add the current digit.
- Double your current total and add the next leftmost digit.
- Repeat the previous step until you have gone through the entire string.

Below is a JavaScript function that implements the above procedure:

```javascript
function toDecimal(v) {
  let binary = '';
  if(typeof v == 'string') {
    binary = v.split();
  } else {
      binary = v.toString().split();
  }
  let decimal = 0;
  for(let i = 0; i < binary.length; i++) {
      decimal = (decimal * 2) + binary[i];
  }
  return decimal;
}
```

Here's what the procedure looks like with 101010:

1. 101010
2. 101010 => 0 + 1 == 1
3. 1 * 2 + 0 == 2
4. 2 * 2 + 1 == 5
5. 5 * 2 + 0 == 10
6. 10 * 2 + 1 == 21
7. 21 * 2 + 0 == 42
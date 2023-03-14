JavaScript numbers have a [`toFixed()` method](https://www.w3schools.com/jsref/jsref_tofixed.asp) that converts a number to a string and rounds the number to a given number of decimal places.
By default, `toFixed()` rounds to the nearest [integer](/tutorials/fundamentals/is-integer).

```javascript
const num = 3.1415;

num.toFixed(); // '3'
num.toFixed(2); // '3.14'
num.toFixed(3); // '3.142'
```

Use Cases
---------

The `toFixed()` method is most often used to either display prices, or round numbers.
For example, here is how you can display a number as a price in USD.

```javascript
function prettyPrice(num) {
  return `${num.toFixed(2)}`;
}

prettyPrice(42); // '$42.00'
prettyPrice(20.1); // '$20.10'
prettyPrice(17.76); // '$17.76'
```

Rounding to a certain number of decimal places is also a common use case.
For example, in JavaScript `0.1 + 0.2 === 0.30000000000000004`.
To work around this issue, you can use `toFixed()` to round to 1 decimal place.

```javascript
+(0.1 + 0.2).toFixed(1) === 0.3; // true
```

Edge Cases
-------

Using `toFixed()` on a number that's 10^21 or larger returns the number in exponential notation.

```javascript
(1e20).toFixed(); // '100000000000000000000'
(1e21).toFixed(); // '1e+21'
```

Because JavaScript numbers are represented using [binary floating points, not decimal floating points](https://thecodebarbarian.com/a-nodejs-perspective-on-mongodb-34-decimal.html), using `toFixed()` with large numbers can have unexpected results.

```javascript
(0.3).toFixed(16); // '0.3000000000000000'
(0.3).toFixed(17); // '0.29999999999999999'
```

In general, we don't recommend using `toFixed()` to round to more than 3 decimal places.

The `digits` param must be at most 100.
`num.toFixed(101)` throws the following error.

```
Uncaught RangeError: toFixed() digits argument must be between 0 and 100
    at Number.toFixed (<anonymous>)
```
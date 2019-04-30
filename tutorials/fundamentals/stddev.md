[Standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) is a measure of how far a set of numbers deviates from the average. Small standard deviation means the numbers are all relatively close to the mean. JavaScript doesn't have a built-in standard deviation function, but [Math.js](https://www.npmjs.com/package/mathjs) is a well supported library with a full featured standard deviation function.

Here's an example of using [Math.js' `std()` function](https://mathjs.org/docs/reference/functions/std.html) to calculate standard deviation.

```javascript
[require:Fundamentals.*standard deviation normal]
```

Math.js also has support for bias correction. Math.js' `std()` function uses [Bessel's correction](https://en.wikipedia.org/wiki/Bessel%27s_correction) by default, but takes a 2nd argument `normalization` for configuring this. By default, given an array of length `n`, the `std()` function divides the variance by `n - 1`. You can pass `'uncorrected'` to make `std()` divide by `n`, or `'biased'` to make `std()` divide by `n + 1`.

```javascript
[require:Fundamentals.*standard deviation uncorrected]
```


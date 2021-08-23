JavaScript's string `substring()` and `slice()` functions behave similarly but have a few key differences.

## Negative Values

With `slice()`, when you enter a negative number as an argument, the function interprets it as counting from the end of the string.
With `substring()`, it will treat a negative value as zero.

```javascript
const sentence = 'Masteringjs is a very helpful website'
sentence.slice(-7) // website
sentence.substring(-5, 11); // Masteringjs
```

## Parameter Consistency

A notable difference with `substring()` is that if the first argument is greater than the second argument,
the function will swap their places. With `slice()`, it won't print anything.

```javascript
const sentence = 'Masteringjs is a very helpful website'
sentence.substring(11, 0); // Masteringjs
sentence.slice(11, 0) //
sentence.slice(0, 11) // Masteringjs
```

## NaNs

The two functions come together here and agree that a `NaN` is to be treated as zero.

```javascript
const sentence = 'Masteringjs is a very helpful website'
sentence.substring(NaN); // Masteringjs is a very helpful website
sentence.slice(NaN) // Masteringjs is a very helpful website
```

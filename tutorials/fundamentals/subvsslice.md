JavaScript's string `substring()` and `slice()` functions both let you extract substrings from a string.
But they have a couple of key differences that you need to be aware of.

## Negative Values

With `slice()`, when you enter a negative number as an argument, the `slice()` interprets it as counting from the end of the string.
With `substring()`, it will treat a negative value as zero.

```javascript
const sentence = 'Mastering JS is a very helpful website';
sentence.slice(-7); // 'website'
sentence.substring(-5, 12); // 'Mastering JS'

sentence.slice(0, -26); // 'Mastering JS'
```

## Parameter Consistency

A big difference with `substring()` is that if the 1st argument is greater than the 2nd argument, `substring()` will swap them.
`slice()` returns an empty string if the 1st argument is greater than the 2nd argument.

```javascript
const sentence = 'Mastering JS is a very helpful website';
sentence.substring(12, 0); // 'Mastering JS'
sentence.slice(12, 0); // ''
sentence.slice(0, 12); // 'Mastering JS'
```

## Recommendation

We recommend using [`slice()` over `substring()`](/tutorials/fundamentals/substring) unless you need the argument swapping feature.
The negative numbers feature is extremely useful, and it is easier to remember than the difference between `substring()` and `substr()`.

What does it mean for two strings to be equal, or for one string to be
greater than the other in JavaScript?

JavaScript's [triple equals operator](/tutorials/fundamentals/equals) `===` returns
`true` if two strings are exactly equal, and `false` otherwise:

```javascript
'hello' === 'hello'; // true
'Hello' === 'hello'; // false
```

The `<` and `>` operators compare strings in [lexicographical order](https://en.wikipedia.org/wiki/Lexicographical_order). Lexicographical order essentially means "dictionary order".
In simpler terms, `a < b` if the first character of `a`
comes before the first character of `b` in the [ASCII table](https://en.wikipedia.org/wiki/ASCII),
or if the first characters of `a` and `b` are equal and `a.slice(1) < b.slice(1)`.

```javascript
'alpha' < 'zeta'; // true, because 'a' comes before 'z'
'alpha' < 'Zeta'; // false, because 'Z' = 90 in ASCII, and 'a' = 97
'one' < '1'; // false, because '1' = 49 in ASCII, and 'o' = 111

'octo' < 'okto'; // true, because 'c' = 99, and 'k' = 107
'a' < 'alpha'; // true, because end of string = '0' in ASCII
```

[Sorting an Array](/tutorials/fundamentals/array-sort) of Strings
---------------------------

JavaScript's [`Array#sort()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) sorts by lexicographic order automatically.

```javascript
['Zeta', '1', 'alpha', ''].sort(); // ['', '1', 'Zeta', 'alpha']
```

[Lodash's `sortBy()` function](/tutorials/lodash/sortby) also sorts by lexicographic
order automatically, as long as you're sorting an array of strings.

```javascript
_.sortBy(['Zeta', '1', 'alpha', '']); // ['', '1', 'Zeta', 'alpha']
```

What about [sorting an array of objects](/tutorials/fundamentals/sort-array-of-objects)
based on a string property? The `Array#sort()` function takes a [callback](/tutorials/fundamentals/callbacks)
parameter that takes 2 values `a` and `b`, and should return:

* `0` if `a` and `b` are equal
* A positive number if `a > b`
* A negative number if `a < b`

Given an array of objects with a `lastName` property, below is one way
to sort the array by `lastName`.

```javascript
[require:Fundamentals sort lastName$]
```

A more concise alternative is using JavaScript's built-in [`localeCompare()` function](https://www.w3schools.com/jsref/jsref_localecompare.asp). Calling `a.localeCompare(b)` returns `-1` if `a < b`,
`0` if `a === b`, and `1` if `a > b`.

```
[require:Fundamentals compare strings localeCompare$]
```
Suppose you have a [JavaScript array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) containing
Star Trek: The Next Generation characters:

```javascript
const characters = [
  { firstName: 'Jean-Luc', lastName: 'Picard', rank: 'Captain', age: 59 },
  { firstName: 'Will', lastName: 'Riker', rank: 'Commander', age: 29 },
  { firstName: 'Geordi', lastName: 'La Forge', rank: 'Lieutenant', age: 29 }
];
```

How do you sort this array by different properties?

Sorting By `age`
--------------

[JavaScript's built-in `Array#sort()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) optionally
takes a [callback](/tutorials/fundamentals/callbacks) parameter that
compares two elements in the array.

The callback function is called `compareFunction()`. If `compareFunction(a, b)`
returns a value that is `< 0`, JavaScript considers `a` to be less than `b`.
And if `compareFunction(a, b)` returns a value that is `> 0`, JavaScript considers `b` to be greater than `a`.

That means it is easy to sort by a numeric property like `age`. If `a.age - b.age < 0`, that means `b` is older than `a`.

```javascript
[require:Fundamentals sort age$]
```

Sorting by `lastName`
--------------

Sorting by a string property like `lastName` is also easy, because
JavaScript's `<` and `>` properties can handle strings. To sort
by a string property, your `compareFunction()` can compare the
two strings using `<`:

```javascript
[require:Fundamentals sort lastName$]
```

Sorting by `rank`
----------------

Sorting by `rank` is a bit trickier because rank isn't necessarily
in alphabetical order. JavaScript doesn't know that 'Captain' is
a higher rank than 'Lieutenant'.

To sort by a custom ordering, you should define a map from
`rank` to a numeric value to make for easier comparison.

```javascript
[require:Fundamentals sort rank$]
```
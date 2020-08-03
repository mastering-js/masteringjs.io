[JavaScript arrays have a `filter()` method](/tutorials/fundamentals/array-filter) that let you create a new array
containing only elements that pass a certain test. In other words, `filter()` gives you a new array containing just
the elements you need.

```javascript
[require:Fundamentals array filter even numbers$]
```

The `filter()` method takes a [callback](/tutorials/fundamentals/callbacks) parameter, and returns an array containing
all values that the callback returned `true` for. That makes it easy to use for filtering an array of objects. For
example, given a list of characters, here's how you can find all characters whose `team` property is `'Avengers'`.

```javascript
const characters = [
  { name: 'Batman', team: 'Justice League' },
  { name: 'Hulk', team: 'Avengers' },
  { name: 'Flash', team: 'Justice League' },
  { name: 'Iron Man', team: 'Avengers' },
  { name: 'Deadpool', team: 'X-Force' }
];

const avengers = characters.filter(character => character.team === 'Avengers');
```

Filter callbacks often use [arrow functions](/tutorials/fundamentals/arrow) because filter callbacks are often one-liners.

More Sophisticated Examples
---------------------------

A filter callback can be arbitrarily sophisticated, as long as it is synchronous. For example, suppose you have a list of Star Trek characters, and you want to get just the characters that appeared
in Star Trek: The Next Generation. Here's how you can use `Array#filter()` to filter an array of characters given that the `series` property is an array:

```javascript
const characters = [
  { name: 'James T. Kirk', series: ['Star Trek'] },
  { name: 'Spock', series: ['Star Trek', 'Star Trek: The Next Generation'] },
  { name: 'Jean-Luc Picard', series: ['Star Trek: The Next Generation'] },
  { name: 'Worf', series: ['Star Trek: The Next Generation', 'Star Trek: Deep Space Nine'] }
];

const tngCharacters = characters.filter(character => {
  return character.series.includes('Star Trek: The Next Generation');
});
```


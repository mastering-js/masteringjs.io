[JavaScript arrays have a `filter()` method](/tutorials/fundamentals/array-filter) that let you create a new array containing just the elements you need. Here are 5 common examples that demonstrate how to use `filter()`.

1) Filtering an Array of Primitives
--------------------------------

The `filter()` function takes a callback, and returns a new array containing just the elements that `callback` returned
truthy for. This means you can use `filter()` to filter arrays of primitives, like finding all elements in an array
of strings that start with "A", or finding all even numbers in an array:

```javascript
[require:Fundamentals array filter even numbers$]
```

2) Filtering an Array of Objects
--------------------------------

Any synchronous function that returns `true` or `false` is a valid `filter()` callback function. So you can filter
an array of objects by any of the object's properties. For example, below is how you can filter an array of
characters based on the `team` property.

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

3) "Removing" a Value
---------------------

When working with frameworks that rely on [immutability](https://immutable-js.github.io/immutable-js/) (like React), you
may see the below pattern:

```javascript
let characters = [
  { name: 'Batman', team: 'Justice League' },
  { name: 'Hulk', team: 'Avengers' },
  { name: 'Flash', team: 'Justice League' },
  { name: 'Iron Man', team: 'Avengers' },
  { name: 'Deadpool', team: 'X-Force' }
];

const deadpool = characters[4];

// Create a new array that excludes exactly one element
characters = characters.filter(character => character === deadpool);
```

The `filter()` function is the most common way to "remove" an element without modifying the existing array. The [`Array#splice()` method](/tutorials/fundamentals/array-splice) modifies the existing array, which violates immutability.

4) Using Lodash's `matches()`
---------------------------

[Lodash's `matches()` function](https://lodash.com/docs/4.17.15#matches) is a neat tool for creating filter functions
declaratively. The `matches()` function takes a parameter `source`, and returns a function that returns `true` if you
pass it an object which has the same values as `source` for _just_ the properties in `source`.

For example, in the below example, `fn` returns `true` if and only if you call it with an object that has `lastName` equal
to 'Crusher' and `rank` equal to 'Ensign'.

```javascript
const _ = require('lodash');

const fn = _.matches({ lastName: 'Crusher', rank: 'Ensign' });
```

Because `_.matches()` returns a function, you can pass it as a parameter to `Array#filter()`.

```javascript
const arr = [
  { firstName: 'Will', lastName: 'Riker', rank: 'Commander' },
  { firstName: 'Beverly', lastName: 'Crusher', rank: 'Commander' },
  { firstName: 'Wesley', lastName: 'Crusher', rank: 'Ensign' }
];

const fn = _.matches({ lastName: 'Crusher', rank: 'Ensign' });
arr.filter(fn); // [{ firstName: 'Wesley', lastName: 'Crusher', rank: 'Ensign' }]
```

5) Interacting with Other Functional Helpers
------------------------------------------

The `filter()` function is especially helpful in combination with [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and [`reduce()`](https://thecodebarbarian.com/javascript-reduce-in-5-examples.html).

For example, suppose you have an array of products, and you want to compute the average cost of all phones in the
array of products. You can do this in 3 steps:

1. `filter()` to get an array of products that have `category = 'Phones'`
2. `map()` to get an array of prices
3. `reduce()` to calculate the average

```javascript
const products = [
  { name: 'iPhone', price: 800, category: 'Phones' },
  { name: 'Samsung Galaxy', price: 900, category: 'Phones' },
  { name: 'Asus Zenbook', price: 1300, category: 'Laptops' }
];

const averagePrice = products.
  filter(product => product.category === 'Phones').
  map(product => product.price).
  reduce((avg, price, arr) => avg + price / arr.length, 0);

averagePrice; // 850
```
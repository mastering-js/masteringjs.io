[JavaScript's built-in `sort()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) is often surprising to beginners. For example, suppose you sorted the below array:

```javascript
[3, 20, 100].sort();
```

What would the output be? You might expect the array to stay the same, but the output will actually become:

```javascript
[100, 20, 3];
```

That is because JavaScript converts array elements to strings and then [sorts them according to JavaScript's ordering of strings](https://masteringjs.io/tutorials/fundamentals/string-compare).

Sorting an Array of Numbers
---------------------------

The `sort()` function [takes one parameter, `compareFunction()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters). The `compareFunction()` function takes two array elements `a` and `b`. It should return:

* A negative number if `a < b`
* A positive number if `a > b`
* 0 if `a` is neither greater than nor less than `b`.

To sort an array of numbers in forward order, you should use `(a, b) => a - b` as your `compareFunction()`.

```javascript
[require:Fundamentals.*sort.*numbers forward]
```

To sort an array of numbers in reverse order, you should use `(a, b) => b - a` instead.

```javascript
[require:Fundamentals.*sort.*numbers reverse]
```

If you're familiar with Java, you can think of `compareFunction()` as JavaScript's equivalent to [`compareTo()`](https://www.javatpoint.com/Comparable-interface-in-collection-framework).

Sorting an Array of Objects by Property
---------------------------------------

Suppose you instead wanted to sort an array of objects. For example, suppose you had an array of Star Trek: The Next Generation characters:

```javascript
const characters = [
  { firstName: 'Jean-Luc', lastName: 'Picard', rank: 'Captain', age: 59 },
  { firstName: 'Will', lastName: 'Riker', rank: 'Commander', age: 29 },
  { firstName: 'Geordi', lastName: 'La Forge', rank: 'Lieutenant', age: 29 }
];
```

Here's how you would sort the `characters` array by `lastName` using [JavaScript string comparison](/tutorials/fundamentals/string-compare):

```javascript
[require:Fundamentals.*sort.*lastName]
```

Here's how you would sort the `characters` array by age:

```javascript
[require:Fundamentals.*sort.*age]
```

How about sorting by `rank`? Sorting by rank requires a custom ordering, because the JavaScript runtime doesn't know that 'Captain' is a higher rank than 'Lieutenant'. Here's how you would sort based on a custom ordering using [`indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf).

```javascript
[require:Fundamentals.*sort.*rank]
```
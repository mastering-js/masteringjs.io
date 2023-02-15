JavaScript [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) works with array indexes.
Just add the `?.` _before_ your square brackets `[]`.
Looks weird, but it works!

```javascript
const characters = [
  { name: 'Jean-Luc Picard', age: 59 },
  { name: 'Will Riker', age: 29 }
];

// `?.[2]` is how you access the 2nd element with optional chaining
characters?.[2]?.age; // undefined
characters?.[1].age; // 29

characters[1]?.doesnt?.exist; // undefined
```

You can't use `?.` with a number, that causes a syntax error.
But you can also use `?.[]` with variables as follows.

```javascript
const index = 1;

characters?.[index].age; // 29
```
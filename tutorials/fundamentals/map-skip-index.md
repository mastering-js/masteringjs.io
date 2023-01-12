JavaScript's `map()` function always executes over every value.
That means you can't skip an index.
`map()` will always include exactly one value in the result array for every value in the original array.
However, there a couple of alternatives to work around this issue.

## filter()

You can use JavaScript's `filter()` function before you `map()` to remove the values you don't want to map.

```javascript
const array = [1, 2, 3, 4, 5];
// Return an array with all the values multiplied by 2, but exclude
// any values that are >= 4.
const filteredArray = array.filter(item => item < 4);
array.map(entry => entry * 2); // [2, 4, 6]
```

## flatMap()

You can use JavaScript's `flatMap()` function instead of `map()`.
The `flatMap()` function "flattens" the return value from the [callback](/tutorials/fundamentals/callbacks) for each value.
If your callback returns an empty array `[]`, `flatMap()` will not add any values to the resulting array.

```javascript
const array = [1, 2, 3, 4, 5];
// Return an array with all the values multiplied by 2, but exclude
// any values that are >= 4.
const newArray = array.flatMap(item => item < 4  ? [item * 2] : []);
console.log(newArray); // [2, 4, 6]

```
## spread in combination with ternary

If you're constructing an array using the spread operator `...`, you can conditionally avoid adding elements to the array by using the [spread operator](/tutorials/fundamentals/spread) combined with the ternary operator.

```javascript
const array = ['a'];
let check = true;

const newArray = [
  ...array,
  // Only add 'b' and 'c' to the array if `check` is truthy
  ...(check ? ['b', 'c'] : [])
];

newArray; // ['a', 'b', 'c']
```
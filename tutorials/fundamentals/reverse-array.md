To reverse an array in JavaScript, use the `reverse()` function.
`reverse()` will mutate the original array so be mindful of this fact when using this function.

```javascript
const array = [1,2,3,4,5];
array.reverse();
array; // [5,4,3,2,1]
```

## Preventing Mutation

You can use the `reverse()` function in combination with the `slice()` function or spread operator `...` to prevent mutating the original array.

```javascript
const array = [1,2,3,4,5];
const newArray = array.slice().reverse();
array; // [1,2,3,4,5]
newArray; // [5,4,3,2,1]
```

or

```javascript
const array = [1,2,3,4,5];
const newArray = [...array].reverse();
array; // [1,2,3,4,5]
newArray; // [5,4,3,2,1]
```
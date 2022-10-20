JavaScript's `map()` function always executes over every value.
As a result, you can't skip an index.
However, there a few alternatives to work around this issue.

## filter()

You can use JavaScript's `filter()` function before you `map()` to remove the values you don't want to map.

```javascript
const array = [1, 2, 3, 4, 5];
const filteredArray = array.filter(item => item < 4);
array.map(entry => console.log(entry)); // 1, 2, 3
```

## flatMap()

You can use JavaScript's `flatMap()` function to iterate through each element in the array, and then also flatten the result by one level.
This is helpful if you have a nested array and were trying to avoid that in the map.

```javascript
const array = [1,2,3,[4,5], 6];
const newArray = array.flatMap(item => item);
console.log(newArray); // 1, 2, 3, 4, 5, 6

```
## spread in combination with ternary

If you're constructing an array using the spread operator `...`, you can conditionally avoid adding elements to the array by using spread on a ternary operator

```javascript
const array = ['a']
let check = true;
const newArray = [...arr, ...(check ? ['b', 'c'] : [])].map(char => char.toUpperCase());
console.log(newArray); // ['A', 'B', 'C']
```
To get the longest string in an array, there are three approaches.

## The Iterative Approach

You can iterate through a the array to find the longest string.
First, store the first entry in the array and declare that the longest.
Then, iterate through comparing against the entry you stored starting at index 1.
If the new entry is longer, reassign the new entry to the variable you had created.

```javascript
const example = ['Hello', 'World!', 'My', 'Name', 'is', 'Masteringjs.io'];
let longest = example[0]; // 'Hello'
for (let i = 1; i < example.length; ++i) {
    if (example[i].length > longest.length) {
        longest = example[i];
    }
}
longest; // 'Masteringjs.io'
```

## Using reduce()

You can use the `reduce()` function to find the longest string in an array.
`reduce()` will return a single value being the result of running the specified reducer.
Provide a callback function along with an initial value, and the reducer will return the desired result.

```javascript
const example = ['Hello', 'World!', 'My', 'Name', 'is', 'Masteringjs.io'];
const result = example.reduce((longest, str) => str.length > longest.length ? str : longest, example[0]);
result; // 'Masteringjs.io'
```

## Sorting the Array

You can be a bit cheeky and sort the array by string length.
Once the array is sorted, you will know that the longest string is either the first or last element depending on how you sorted the array.

```javascript
const example = ['Hello', 'World!', 'My', 'Name', 'is', 'Masteringjs.io'];

const result = example.sort((str1, str2) => str1.length - str2.length)[0];
result; // 'Masteringjs.io'
```
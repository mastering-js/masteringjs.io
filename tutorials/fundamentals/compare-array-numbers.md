To check if two arrays of numbers are identical, you can use the `every()` function in JavaScript.

```javascript
const array1 = [1,1,1,1,1];
const array2 = [1,1,1,1,1];
const array3 = [1,2,3,4,5,6];

array1.length === array2.length && array1.every((v, i) => array2[i] == array1[i]); // true
array1.length === array3.length && array1.every((v, i) => array3[i] == array1[i]); // false
```

## Comparing the Output

You can also use `JSON.stringify()` to check if the two arrays are identical.

```javascript
const array1 = [1,1,1,1,1];
const array2 = [1,1,1,1,1];
const array3 = [1,2,3,4,5,6];
// JSON.stringify(array1) => "[1,1,1,1,1]"
JSON.stringify(array1) === JSON.stringify(array2); // true
JSON.stringify(array1) === JSON.stringify(array3); // false
```
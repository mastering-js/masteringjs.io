To get the last element in an array, you can simply access the `length` property to get length of the array, and then subtract 1.
You subtract 1 because arrays use zero based indexing, and the length property retures the number of entries in the array, starting at count 1.
If you do not subtract 1, you will get an array index out of bounds error.

```javascript
const array = [1, 2, 3, 4, 5];
array.length; // 5
array[array.length - 1] // 5 - 1 = index 4. returns 5
```

## Using slice()

You can use the `slice()` function to get the last element in an array.
The `slice()` function returns an array, so when getting the last element of the array calling `slice(-1)`, it will return an array with one entry being the last element.
To get the entry without it being in an array, you can append `[0]` after the function call since an array is returned from calling `slice()`.
When you pass a negative index to `slice()`, it counts backwards because under the hood it is doing `index + array.length` if `index` is negative.

```javascript
const array = [1, 2, 3, 4, 5];
array.slice(-1)/*returns [5]*/[0] // returns 5
```

You can also use destructuring if you do not wish to use the syntax from above.

```javascript
const array = [1, 2, 3, 4, 5];
const [last] = array.slice(-1); // returns 5
```

To properly shuffle an array in JavaScript, use the [Fisher-Yates shuffle algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).
The algorithm loops through each element in the array and swaps it with a random element in the array as shown below.

```javascript
let array = [1, 2, 3, 4, 5];

for(let i = array.length - 1; i >= 1; i--) {
   let j = Math.floor(Math.random() * (i + 1)); // 0 <= j <= i
   let temp = array[j];
   array[j] = array[i];
   array[i] = temp;
}
console.log(array);
```

To do it in the opposite direction, do the following:

```javascript
let array = [1, 2, 3, 4, 5];

for(let i = 0; i <= array.length - 2; i++) {
    let j = Math.floor(Math.random() * array.length); // i <= j < array.length
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
console.log(array);
```
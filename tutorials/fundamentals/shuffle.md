To properly shuffle an array in JavaScript, use the Fisher-Yates shuffle algorithm.
The algorithm randomly draws an element from the array until no elements remain in the array.

```javascript
let array = [1,2,3,4,5];

for(let i = array.length - 1; i > 1; i--) {
   let j =  Math.floor(Math.random() * i); // 0 <= j <= i
   let temp = array[j];
   array[j] = array[i];
   array[i] = temp;
}
console.log(array);
```

To do it in the opposite direction, do the following:

```javascript
let array = [1,2,3,4,5];

for(let i = 0; i <= array.length - 2; i++) {
    let j = Math.floor(Math.random() * array.length); // i <= j < array.length
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
console.log(array);
```
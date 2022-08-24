To calculate the median of an array in JavaScript, perform the following steps:

0. Make sure there are elements in the array.

1. Sort the array.

2. find the midpoint of the array by dividing the length of the array by 2.

3. Calculate the median:

- If the result is odd, the median is at array position `midpoint`.

- If the result is even, add the `midpoint` and the `midpoint-1` array positions and divide by 2.

  ```javascript
  const odd = [2, 1, 3, 4];
  if (odd.length == 0) return; // 0.
  odd.sort((a,b) => a-b); // 1.
  const midpoint = Math.floor(odd.length/2); // 2.
  const median = odd.length % 2 == 1 ? /*Is the result odd? Then*/ odd[midpoint] 
  /*Otherwise the result is even and so*/: (odd[midpoint - 1] + odd[midpoint]) / 2; // 3.
  ```

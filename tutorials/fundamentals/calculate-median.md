To calculate the median of an array in JavaScript, perform the following steps:

0. Make sure there are elements in the array.

1. Sort the array.

2. find the midpoint of the array by dividing the length of the array by 2.

3. Calculate the median:

- If the result is odd, the median is at array position `midpoint`.

- If the result is even, add the `midpoint` and the `midpoint-1` array positions and divide by 2.


```javascript
median([2, 1, 3, 4]);

function median(arr) {
  if (arr.length == 0) {
    return; // 0.
  }
  arr.sort((a, b) => a - b); // 1.
  const midpoint = Math.floor(arr.length / 2); // 2.
  const median = arr.length % 2 === 1 ?
    arr[midpoint] : // 3.1. If odd length, just take midpoint
    (arr[midpoint - 1] + arr[midpoint]) / 2; // 3.2. If even length, take median of midpoints
  return median;
}
```

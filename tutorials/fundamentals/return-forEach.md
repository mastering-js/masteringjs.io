JavaScript's `foreach()` loop is incapable of returning a value after its execution
because using a `return statement` would stop loop from fully executing.
Therefore to return a value you have two options:

## Variable

You can declare a variable before the execution of the `foreach()` loop and set the value
inside of the loop;

```javascript
let array = [1,2,3,4,5]
let max = 0;
array.forEach((element) => {
    if (element > max) max = v;
});
max; // 5

```

## Reduce()

Using JavaScript's `reduce()` function, you can modify the contents of the entire array to culmunate into a single value:

```javascript
let array = [1,2,3,4,5];
// 6 + 1 + 2 + 3 + 4 + 5
let single = array.reduce((accumulator, currentValue) => {
    accumulator + currentValue;
}, 6);
single; // 21
```

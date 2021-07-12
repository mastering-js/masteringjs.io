[JavaScript's `forEach()`](https://thecodebarbarian.com/for-vs-for-each-vs-for-in-vs-for-of-in-javascript) function
takes a minimum of 1 parameters and a maximum of 2 parameters, the callback function and the value to use as `this`. The callback
function is where the action happens and takes up to three parameters: the current item in the array, the index of that item,
and the array itself that is being iterated through.

```javascript
let array = ['a', 'b', 'c'];
array.forEach(function callback(v,i,array){
    console.log(i, v); // 0, a, 1, b, 3, c
}, this);
```

`forEach()` is only applicable to arrays.
If you are dealing with an object, you must turn it into an array using [`Object.entries(), Object.keys(), or Object.values()`](/tutorials/fundamentals/foreach-object).
Once that has been accomplished, you can then use `foreach()` to iterate through the newly created array:

```javascript
const obj = {
  name: 'Jean-Luc Picard',
  rank: 'Captain'
};

// Prints "name Jean-Luc Picard" followed by "rank Captain"
Object.entries(obj).forEach(entry => {
  const [key, value] = entry;
  console.log(key, value);
});
```

or

```javascript
const obj = {
  name: 'Jean-Luc Picard',
  rank: 'Captain'
};

// Prints "name Jean-Luc Picard" followed by "rank Captain"
Object.entries(obj).forEach((entry,index,array) => {
  console.log(index, entry);
});
```

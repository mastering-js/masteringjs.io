The `shift()` function removes the first element from an array and returns the removed element.
As a result, the length of the array changes as well.

```javascript
const array = [1, 2, 3, 4, 5];
array.shift(); // 1
array; // 2,3,4,5
```

If the array is empty, `shift()` will return undefined.

```javascript
const array = [];
array.shift(); // undefined
```

`shift()`, in combination with `push()`, can be used to make an array act like a queue as shown below.

```javascript
const array = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

function next(array) {
    if(array[0] === undefined) {
        return 'no one in queue'
    }
    console.log(array[0]);
    return array.shift();
}

function getInLine(array) {
    array.push('Next');
}

for(let i = 0; i < 5; i++) {
    next(array);
    next(array);
    if(next(array) == 'no one in queue') {
        console.log('no one in queue');
        break;
    }
    getInLine(array);
    console.log(array);
}
```

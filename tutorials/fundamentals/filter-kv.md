To filter an `object` by key-value, you can use a `for...in` loop to iterate
through the object using the keys and values:

```javascript
const obj = { name: 'Masteringjs', location: 'Florida', help: true}
const newObj = {}

for(const [key,value] in obj) {
    if(obj[key] === 'Masteringjs') {
        newObj[key] = value;
    }
}
```

## Using Object.entries()

Another approach is to use `Object.entries()` which returns a 2 dimensional array of the key-value pairs,
The row is the index of the array while the column is the iterator, so `[row(key)][column(value)]`.

```javascript
const obj = { name: 'Masteringjs', location: 'Florida', help: true}
const newObj = {}
let IIdimension = Object.entries(obj);
for(let row = 0; row < IIdimension.length; row++) {
    for (let col = 0; col < IIdimension[row].length; col++) {
        IIdimension[row][column];
    }
}
```

Even with this approach, you could still refine it by using similar syntax to the first example and a `for...of` loop:

```javascript
const obj = { name: 'Masteringjs', location: 'Florida', help: true}
const newObj = {}
let IIdimension = Object.entries(obj);
for (const [key,value] of IIdimension) {
    if (IIdimension[key] === 'Masteringjs') {
        newObj[key] = value;
    }
}
```

To filter an object using the keys, you can use JavaScript's `Object.hasOwnProperty()` method.

```javascript
const obj = { name: 'Masteringjs', location: 'Florida', help: true };
let newObj = {}
if(obj.hasOwnProperty('name')) {
    newObj['name'] = obj['name'];
}
```

## Object.keys()

Another approach to filter using keys is to use the `Object.keys()` method.
`Object.keys()` will return an array of the keys and you can then iterate through
and filter accordingly.

```javascript
const obj = { name: 'Masteringjs', location: 'Florida', help: true };
let newObj = {}
let arr = Object.keys(obj);
for(let i = 0; i < arr.length; i++) {
    if (arr[i] == 'name') {
        newObj[i] = obj[i];
    }
}
```

## Using One Variable

If you were under the constraint to use only one variable, the solution would be to
convert the object to an array, use `array.filter()` and then convert back into an object.

```javascript
const obj = { name: 'Masteringjs', location: 'Florida', help: true };
Object.fromEntries(Object.entries(obj).filter(([key]) => key == 'name'));
```

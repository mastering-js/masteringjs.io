To filter an object using the keys, you can use JavaScript's `Object.hasOwnProperty()` method.

```javascript
const obj = { name: 'Masteringjs', location: 'Florida', help: true };
let newObj = {}
if(obj.hasOwnProperty('name')) {
    newObj['name'] = obj['name'];
}
```

## Object.keys()

`Object.keys()` returns an array of keys, and then you can iterate through and filter accordingly.

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

```javascript
const obj = { name: 'Masteringjs', location: 'Florida', help: true };
Object.keys(obj).filter(key => key.includes('name')).reduce((cur, key) => { cur[key] = obj[key]; return cur; }, {});
```
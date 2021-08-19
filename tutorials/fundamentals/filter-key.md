To filter an object by key in JavaScript, you must first turn the object into an array.
You can use the `Object.keys()` function with the `reduce()` function, or the `Object.fromEntries()` function in combination with
the `Object.entries()` function. Once converted to an array, use the `filter()` function.

```javascript
const obj = { name: 'Masteringjs', location: 'Florida', help: true };
Object.keys(obj).filter((key) => { return key == 'name'}).reduce((cur, key) => { return Object.assign(cur, { [key]: obj[key] })}, {});
```

```javascript
const obj = { name: 'Masteringjs', location: 'Florida', help: true };
Object.fromEntries(Object.entries(obj).filter(([key]) => { return key == 'name' }));
```
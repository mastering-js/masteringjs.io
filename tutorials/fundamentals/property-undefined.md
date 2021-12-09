To check if an object property `key` was equal to `undefined` you can do:

```javascript
if (obj[key] === undefined) {
  // ...
}
```

The potential problem with this approach approach is that if `obj` doesn't have the property, it will also return true.

## Checking if the property exists

To check if the object has the property, you can use `in` operator or `hasOwnProperty()` function.
These paths will tell you if the object property exists on the object.

```javascript
const obj = { name: 'masteringjs.io', location: 'Florida', helpful: true };

'building' in obj; // false
obj.hasOwnProperty('building'); // false
obj.building === undefined; // true
```

You can combine these two sections to check if an object has a property and that property is `undefined`:

```javascript
function hasUndefinedKey(obj, key) {
  return key in obj && obj[key] === undefined;
}
```

or

```javascript
function hasUndefinedKey(obj, key) {
  return obj.hasOwnProperty(key) && obj[key] === undefined;
}
```
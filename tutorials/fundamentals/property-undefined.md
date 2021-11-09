Intuitively, if you wanted to check if an object property was `undefined` you might do:

```javascript
for(const key of obj) {
    if(obj[key] === undefined) {}
}
```

The flaw to this approach is that if `obj` doesn't have the property, it will also return true.


## Checking if the property exists

To check if the object has the property, you can use `in` operator or `hasOwnProperty()` function.
These paths will tell you if the object property exists on the object.

```javascript
const obj = {name: 'Masteringjs.io', location: 'Florida', helpful: true};

'building' in obj; // false
obj.hasOwnProperty('building'); // false
```

Combine these two sections to check if an object has a property and that property is `undefined`:

```javascript
const obj = {name: 'Masteringjs.io', location: 'Florida', helpful: true};
for(const key of obj) {
    if(obj[key] === undefined && key in obj) {}
}
```

or

```javascript
const obj = {name: 'Masteringjs.io', location: 'Florida', helpful: true};
for(const key of obj) {
    if(obj[key] === undefined && obj.hasOwnProperty(key)) {}
}
```
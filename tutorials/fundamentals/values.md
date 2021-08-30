Similar to the `Object.keys()` function, `Object.values()` returns an array containing all the object's values instead of keys.
It will only return properties that are [enumerable](/tutorials/fundamentals/enumerable), however.

```javascript
const obj = {
    name: 'Jean-Luc Picard',
    age: 59
};
Object.defineProperty(obj, 'hidden', {
    enumerable: false,
    value: true
});
obj.hidden // true
Object.values(obj); // ['Jean-Luc Picard', 59]
```

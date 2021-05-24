Whenever you create an object, an internal flag is set to
true to allow it's values to show up in `for..in` loops or the
`Object.keys()` function. Every object has this flag, called `enumerable`.
However, if you were to define an object via the `Object.defineProperty` function,
the enumerable flag would default to false. You can check if a property
if enumerable using the `propertyIsEnumerable()` function which returns
a Boolean.

```javascript
const object = {name: 'first'};
object.propertyIsEnumerable('name'); // returns true;
```

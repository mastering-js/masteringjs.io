Whenever you create an object property, an internal flag is set to
true to allow it's values to show up in `for..in` loops or the
`Object.keys()` function. Every object has this flag, called `enumerable`.
However, if you were to define an object via the `Object.defineProperty` function,
the enumerable flag would default to false.

```javascript
const object = {};
Object.defineproperties(object, {
  name: "Test",
  age: 22,
  weight: 180,
});
for (const key in object) {
  key; // nothing will print
}
const keys = Object.keys(object);
keys; // nothing will be present

const printable = { name: "Testerson", age: 32, weight: 120 };

for (const key in printable) {
  key; // will print name, age, weight
}

const array = Object.keys(printable);
```

You can check if a property
if enumerable using the `propertyIsEnumerable()` function which returns
a Boolean.

```javascript
const object = { name: "first" };
object.propertyIsEnumerable("name"); // returns true;
```

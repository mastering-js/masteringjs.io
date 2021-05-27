JavaScript object properties have an `enumerable` property that controls whether that property shows up in `for/in` loops and the `Object.keys()` function.
If you create a [POJO](/tutorials/fundamentals/pojo) using `{}`, all the POJO's properties will be enumerable by default.

```javascript
const obj = {
  name: 'Jean-Luc Picard',
  age: 59
};

Object.keys(obj); // ['name', 'age']
```

However, you can also define a property on an object using the [`Object.defineProperty()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
Set `enumerable` to `false` and that property won't show up in `Object.keys()`.

```javascript
Object.defineProperty(obj, 'hidden', {
  enumerable: false,
  value: 42
});

obj.hidden; // 42
Object.keys(obj); // ['name', 'age'], no 'hidden'!
```

You can check if a property
if enumerable using the `propertyIsEnumerable()` function which returns
a Boolean.

```javascript
const obj = { name: 'first' };
obj.propertyIsEnumerable('name'); // true
```

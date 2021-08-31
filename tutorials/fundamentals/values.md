`Object.values()` is like `Object.keys()`, except it returns an array containing all the object's values, instead of the object's keys.

```javascript
const obj = { name: 'MasteringJS', location: 'Florida' };
Object.values(obj); // ['MasteringJS', 'Florida']
```

Why convert an object to an array of values?
So you can iterate through the object's own values easily.
For example, you can [iterate through the object using `forEach()`](/tutorials/fundamentals/foreach-object).

```javascript
[require:Fundamentals forEach object using values$]
```

## Only Own Properties

`Object.values()` skips inherited properties - properties that are only defined on the object's prototype.
This is typically the correct behavior for [POJOs](/tutorials/fundamentals/pojo), because you typically don't want `Object.values()` to include the `toString()` function.

But you may run into trouble if you're using `Object.values()` on a class.
In the below example, `Object.values()` does **not** return the value of the `className` property, because `className` is a getter on the class's prototype, not an own property of `user`.

```javascript
[require:Fundamentals object-value only own properties$]
```

## Enumerability

`Object.values()` will only return the values of properties that are [enumerable](/tutorials/fundamentals/enumerable).

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
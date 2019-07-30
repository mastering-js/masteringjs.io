In JavaScript, [the `Object.assign()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) copies properties from one or more source objects to a target object. It returns the target object.

```javascript
[require:Fundamentals.*Object assign.*basic]
```

`Object.assign()` is commonly used to shallow copy objects, although the [spread operator is generally faster than `Object.assign()` for shallow copying](https://thecodebarbarian.com/object-assign-vs-object-spread.html). Shallow copying is most commonly used in [Redux reducers](https://redux.js.org/recipes/using-object-spread-operator).

```javascript
[require:Fundamentals.*Object assign.*shallow copy]
```

Multiple Sources
----------------

You can pass [multiple source objects to `Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Merging_objects_with_same_properties). If there's multiple sources with the same property, the last one in the parameter list wins out.

```javascript
[require:Fundamentals.*Object assign.*multiple source]
```
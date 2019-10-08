There's a lot of debate as to what a POJO is in JavaScript:
[StackOverflow thinks it is any class that contains user data](https://stackoverflow.com/questions/49630228/create-a-model-pojo-in-javascript), but the
[top npm module on Google](https://github.com/bttmly/is-pojo) defines a POJO as
any object whose [prototype](/tutorials/fundamentals/prototype) is `Object.prototype`.

The intuition behind POJOs is that a POJO is an object that only contains data,
as opposed to methods or internal state. Most JavaScript codebases consider objects
created using curly braces `{}` to be POJOs. However, more strict codebases
sometimes create POJOs
[by calling `Object.create(null)`](https://davidwalsh.name/object-create-null)
to avoid [inheriting from the built-in `Object` class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype).

```javascript
[require:Fundamentals.*POJO.*create null$]
```

POJOs vs Maps
-------------

[JavaScript Maps](http://thecodebarbarian.com/the-80-20-guide-to-maps-in-javascript.html) are an alternative to POJOs for storing data because they do not have any inherited keys from the `Object` class. However,
objects are generally easier to work with than maps, because not all JavaScript
functions, frameworks, and libraries support maps.
For example, [the `JSON.stringify()` function](http://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript) doesn't serialize maps by default.

```javascript
[require:Fundamentals.*POJO.*map stringify$]
```

Checking if an Object is a POJO
-------------------------------

Checking if an object is a POJO can be somewhat tricky and depends on whether
you consider objects created using `Object.create(null)` to be POJOs. The safest
way is using the [`Object.getPrototypeOf()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) and
comparing the object's prototype.

```javascript
[require:Fundamentals.*POJO.*check if pojo$]
```

For example, below is [Mongoose's internal `isPOJO()` function](https://github.com/Automattic/mongoose/blob/43b63ae8d18e49db3ddb56b4c843637339495a76/lib/utils.js#L505-L514)

```javascript
exports.isPOJO = function isPOJO(arg) {
  if (arg == null || typeof arg !== 'object') {
    return false;
  }
  const proto = Object.getPrototypeOf(arg);
  // Prototype may be null if you used `Object.create(null)`
  // Checking `proto`'s constructor is safe because `getPrototypeOf()`
  // explicitly crosses the boundary from object data to object metadata
  return !proto || proto.constructor.name === 'Object';
};
```

Mongoose checks for the `constructor.name` property instead of checking if `proto.constructor === Object` to support objects generated using [Node.js `vm` module](https://www.w3schools.com/nodejs/ref_vm.asp).

```javascript
const obj = require('vm').runInNewContext('({})');
// `obj` inherits from a different JavaScript context's `Object` class.
obj.constructor === Object; // false
obj.constructor.name; // 'Object'
```
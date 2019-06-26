The [`Object.keys()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) returns an [array](http://thecodebarbarian.com/the-80-20-guide-to-javascript-arrays.html) of the property names an object has. For example, given a POJO `obj`, calling `Object.keys()` gives you all the object's keys.

```javascript
[require:Object\.keys.*basic]
```

## Key Order

The property names are in the order the property was first set. If you `delete`
a property and then later set it again, the property goes to the end of the array.

```javascript
[require:Object\.keys.*order]
```

The [ECMAScript spec calls this "property creation order"](http://www.ecma-international.org/ecma-262/6.0/#sec-ordinary-object-internal-methods-and-internal-slots-ownpropertykeys). The `Object.keys()` function is [guranteed to return keys in property creation order in all ES2015-compliant environments](https://www.stefanjudis.com/today-i-learned/property-order-is-predictable-in-javascript-objects-since-es2015/#the-internal-code-ownpropertykeys-code-method). There is one key exception: numeric keys.

Any property name that is an integer between 0 and `2^32 - 1` inclusive will come before all non-integer keys, and these properties will be sorted in numeric order.

```javacript
[require:Object\.keys.*numeric]
```

## ES6 Classes

The `Object.keys()` function only returns so-called ["own properties."](https://masteringjs.io/tutorials/fundamentals/hasownproperty). That means `Object.keys()` will **not** return class methods or class properties.

```javascript
[require:Object\.keys.*ES6 class]
```

## Symbols

The `Object.keys()` property does **not** include symbol properties. You need to
use [`Object.getOwnPropertySymbols()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols) to get symbol properties.

```javascript
[require:Object\.keys.*symbols]
```
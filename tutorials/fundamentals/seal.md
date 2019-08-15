The [`Object.seal()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) prevents adding, removing, or re-configuring properties on a JavaScript object.

```javascript
[require:Fundamentals.*seal.*example$]
```

`seal()` is similar to [the `Object.freeze()` function](/tutorials/fundamentals/freeze), with one key difference: you can still write to existing properties on a sealed object, but you cannot write to a frozen object.

```javascript
[require:Fundamentals.*seal.*vs freeze$]
```

Like with `freeze()`, adding, removing, or re-configuring a property from a sealed 
object only throws an error in [strict mode](/tutorials/fundamentals/strict).
Otherwise it fails silently.

The `seal()` function is also similar to the [`Object.preventExtensions()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions). However, the `preventExtensions()` function only prevents adding new properties to an object, you can still `delete` properties or reconfigure existing properties.

When To Use `seal()`
--------------------

The `freeze()` function is much more commonly used, the `seal()` function is rare
in production. One potential use case for `seal()` is to protect the `global`
object in Node.js.

```javascript
Object.seal(global);

global.newProp = 42; // TypeError
```

Certain npm modules, like [safe-buffer](https://www.npmjs.com/package/safe-buffer), intentionally modify existing global variables, but you might want to make sure
that no other npm module unintentionally adds new global variables. Admittedly
sealing `global` is uncommon in the Node.js community and certainly not an
established best practice, but try it out - you might be surprised by the results.
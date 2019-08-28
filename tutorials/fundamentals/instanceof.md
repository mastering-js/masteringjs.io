The [`instanceof` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) tests whether a given object is an instance of a given [JavaScript class](/tutorials/fundamentals/class).

```javascript
[require:Fundamentals.*class.*basic example$]
```

Technically, the `instanceof` operator checks the [prototype chain](/tutorials/fundamentals/prototype#inheriting-from-another-class) to see if any constructor in the prototype chain is equal to the given class. That means if you use [inheritance](tutorials/fundamentals/class#inheritance), an instance of a subclass is also an instance of the base class.

```javascript
[require:Fundamentals.*instanceof.*inheritance$]
```

The Object Class
----------------

The [`Object` class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) is the base class for all JavaScript classes.

```javascript
[require:Fundamentals.*instanceof.*object class$]
```

You might be tempted to use `v instanceof Object` to check whether `v` is an object. That works for most cases, but [there are several cases where an object is not `instanceof Object`](https://2ality.com/2012/08/instanceof-object.html).

```javascript
[require:Fundamentals.*instanceof.*not instanceof object$]
```

Error Cases
----------

The `instanceof` operator throws an error if the right hand side is not a function.

```javascript
[require:Fundamentals.*instanceof.*function$]
```
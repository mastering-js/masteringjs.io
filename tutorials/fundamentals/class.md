In object-oriented programming, a [class](https://brilliant.org/wiki/classes-oop/)
is a template for creating objects. [JavaScript's `class` keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) is how you declare a new class in JavaScript.

```javascript
[require:Fundamentals.*class.*basic example$]
```

Methods
-------

A [method](https://brilliant.org/wiki/methods-oop/) is a function defined in your
class that JavaScript adds to every instance of that class. For example, suppose
you wanted to compute the area of a `Rectangle`. You can define an `area()` method
as shown below.

```javascript
[require:Fundamentals.*class.*method$]
```

In a method, the [`this` keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) refers to the class instance the method is attached to. In the above example,
`this` refers to `obj`.

Statics
-------

A [static](https://beginnersbook.com/2013/05/static-vs-non-static-methods/) is a
a function that is defined on the class itself. In JavaScript, a class is just
another variable, so you can call [static functions](/tutorials/fundamentals/static) on a class.

```javascript
[require:Fundamentals.*class.*static$]
```

Getters/Setters
---------------

An alternative way to define the area of a `Rectangle` is using [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get). Using a getter,
you can make `area` a dynamically computed property of a `Rectangle`, rather
than a method.

```javascript
[require:Fundamentals.*class.*getter$]
```

You can also define a custom setter, which gets called when you set a property.
For example, suppose you want to be absolutely certain that `height` and `width`
are numbers. You can define a custom setter that throws an exception whenever
someone tries the set `height` to a non-numeric value.

```javascript
[require:Fundamentals.*class.*setter$]
```

Inheritance
-----------

When a [class `extends` another class](https://thecodebarbarian.com/an-overview-of-es6-classes#inheritance), that means the subclass has all the same statics, methods, getters, and setters as the parent class by default. But then the subclass can define additional
statics, methods, getters, and setters. The subclass can also [override](https://en.wikipedia.org/wiki/Method_overriding) the base class's statics, methods, getters, and setters.

```javascript
[require:Fundamentals.*class.*inheritance]
```

Inheritance is Still Prototype-Based
---------------------

The `extends` keyword still uses [prototype-based inheritance](/tutorials/fundamentals/prototype) under the hood. That means you can use
prototype-based patterns in combination with ES6 classes.

```javascript
[require:Fundamentals.*class.*prototype$]
```
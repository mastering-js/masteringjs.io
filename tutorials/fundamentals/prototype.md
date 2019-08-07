When you create a new object in JavaScript using `{}`, it comes with some built-in
properties, like a [`toString()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString).

```javascript
[require:Fundamentals.*prototype.*toString example]
```

The [Mozilla docs document this function as `Object.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString). That's because `obj` is an instance of the `Object` class.

When you access the `toString` property, JavaScript first looks to see if `obj` has a `toString` property. Since it doesn't, JavaScript goes up the inheritance chain to `Object.prototype`, and checks if `Object.prototype` has a `toString` property.

```javascript
[require:Fundamentals.*prototype.*instanceof example]
```

You can think of `Object.prototype` as a template object that all objects inherit methods and properties from.

Adding Properties to a Prototype
--------------------------------

A prototype is a JavaScript object like any other. That means you can add new
properties to `Object.prototype`, and then every object will have access to that property.

```javascript
[require:Fundamentals.*prototype.*add to prototype]
```

Just because you can add methods to `Object.prototype` doesn't mean you should.
Doing so may cause compatibility issues with future versions of JavaScript. For
example, the [famous SmooshGate debacle](https://developers.google.com/web/updates/2018/03/smooshgate) was caused because
a popular library added a `Array.prototype.flatten()` that conflicted with a
[new built-in JavaScript function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat).

Creating Your Own Prototype
---------------------------

Suppose you have a pre-ES6 JavaScript class, which is just a plain old function
that you will call with `new`.

```javascript
function MyClass() {}
```

The `MyClass` function has a `prototype` property that you can modify.

```javascript
[require:Fundamentals.*prototype.*MyClass prototype]
```

You can also overwrite the `MyClass` function's prototype entirely.

```javascript
[require:Fundamentals.*prototype.*MyClass set prototype]
```

Inheriting from Another Class
-----------------------------

The prototype object doesn't need to be a plain object. It can be an instance
of another class. To create a class `MyChildClass` that inherits from `MyClass`, 
you set the `MyChildClass` prototype to be an instance of `MyClass`.

```javascript
[require:Fundamentals.*prototype.*MyChildClass]
```

`MyChildClass` inherits from `MyChild`, which in turn inherits from `Object`.
That's because `MyChildClass.prototype` is an instance of `MyClass`, and then
`MyClass.prototype` is an instance of object. This is what JavaScript developers
call the [_prototype chain_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#Inheritance_with_the_prototype_chain).

Get An Object's Prototype
-------------------------

Given an object, you can get access to its prototype using `.constructor.prototype`.

```javascript
[require:Fundamentals.*prototype.*constructor prototype]
```

That's because there's an [`Object.prototype.constructor` property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor) that points to the object's constructor. There's also a non-standard [`__proto__` property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto) that behaves similarly to `constructor.prototype`.

The `constructor` and `__proto__` properties are potential attack vectors for
[prototype poisoning](https://medium.com/intrinsic/javascript-prototype-poisoning-vulnerabilities-in-the-wild-7bc15347c96). Several popular JavaScript libraries, including [lodash](https://snyk.io/blog/snyk-research-team-discovers-severe-prototype-pollution-security-vulnerabilities-affecting-all-versions-of-lodash/) and [Mongoose](https://thecodebarbarian.com/mongoose-prototype-pollution-vulnerability-disclosure.html), have reported prototype poisoning vulnerabilities in the past.
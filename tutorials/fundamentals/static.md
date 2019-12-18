In an [ES6 class](/tutorials/fundamentals/class), the `static` keyword lets you
define a function on the class itself, as opposed to instances of the class.

```javascript
[require:Fundamentals.*static.*function$]
```

In JavaScript, a class is an object like any other. So statics let you define
functions on the class within the class definition. Equivalently, you can
just assign a function to `MyClass`:

```javascript
[require:Fundamentals.*static.*assignment$]
```

With `this`
-----------

Within static functions, `this` refers to the class.

```javascript
[require:Fundamentals.*static.*this$]
```

Static Properties
-----------------

[Static properties, also known as class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields), are currently a [Stage 3 TC39 proposal](https://github.com/tc39/proposals#stage-3), which means they are technically not part of the JavaScript language yet. However, they are supported in more recent versions
of Google Chrome.

```javascript
class MyClass {
  static answer = 42;
}

MyClass.answer; // 42
```

Be careful when using static properties with non-primitive values. If you use
[inheritance with non-primitive static properties](https://thecodebarbarian.com/static-properties-in-javascript-with-inheritance), each class that inherits from
your class will have the same copy of the object.

```javascript
class MyClass {
  static val = new Object();
}

class MyChildClass extends MyClass {}

MyChildClass.val === MyClass.val; // true
```
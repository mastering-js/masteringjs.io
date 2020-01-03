The [`this` keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) lets you reference the function's "execution context."
That's a fancy way of saying that `this` refers to the object that a function
is a property of when you call the function.

```javascript
[require:Fundamentals.*this flat object$]
```

The important thing to note is that, since functions are plain old variables
in JavaScript, `this` may change. One common way to mess up the value of
`this` is to assign a function to an object and call the function without
an associated object. This is informally known as the function [_losing its context_](https://www.freecodecamp.org/news/what-to-do-when-this-loses-context-f09664af076f/).

```javascript
[require:Fundamentals.*this lost context$]
```

**TLDR:** `this` is an _implicit parameter_ to a function call. It contains
whatever object the function was a property of when it was called.

With [Classes](/tutorials/fundamentals/class)
----------------------------------

You will often see `this` in ES6 class methods. In a class method,
`this` refers to the instance of the object the method is called on.

```javascript
[require:Fundamentals.*this class$]
```

Arrow Functions
---------------

Arrow functions are special because, unlike other functions, they have
_lexical context_. That means `this` in an arrow function is the same
as `this` outside the arrow function, regardless of how you call the
arrow function.

```javascript
[require:Fundamentals.*this arrow$]
```

Using `bind()`, `call()`, and `apply()`
----------------------------

Every JavaScript function has a [`Function#call()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) and a [`Function#apply()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) that lets you set the value of `this` without explicitly attaching the function to an object. You can
think of `call()` and `apply()` as letting you set the implicit parameter `this` explicitly.

There is also a [`Function#bind()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) that creates a copy of the function with a pre-set context.

```javascript
[require:Fundamentals.*this call and apply$]
```
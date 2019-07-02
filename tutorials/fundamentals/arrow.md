[Arrow functions](https://exploringjs.com/es6/ch_arrow-functions.html)
were introduced in ES6 to work around several common gotchas with
conventional functions. However, you still need to learn when to use
conventional functions versus when to use arrow functions, because
there are situations where
[using an arrow function is the wrong choice](https://mongoosejs.com/docs/faq.html#arrow-functions).

Syntax
------

When you see `=>`, you're looking at an arrow function. There are
two ways to declare an arrow function:

1) Without curly braces `{}`. With this syntax, the arrow function has an implicit return. For example, the below arrow function returns 42, even though there's no `return`.

```javascript
[require:Fundamentals.*arrow functions.*no curly braces]
```

2) With curly braces `{}`. With this syntax, the arrow function does not have an implicit `return`.

```javascript
[require:Fundamentals.*arrow functions.*with curly braces]
```

Returning an object literal from an arrow function is tricky:

```javascript
// Syntax error! JavaScript assumes curly braces after `=>` means
// you're using the curly braces syntax
const getObj = () => { answer: 42 };

// With parentheses around the object literal, the below function
// correctly returns an object with `obj.answer = 42`
const getObj = () => ({ answer: 42 });

getObj(); // 42
```

Without curly braces, you can only put one [expression](https://2ality.com/2012/09/expressions-vs-statements.html) to the right of the arrow `=>`. Intuitively, this means you can only use the no curly brace syntax for "one-liners". You can use the ternary operator `?`, `&&`, and `||`. But you cannot use `if` statements or semicolons.

```javascript
[require:Fundamentals.*arrow functions.*if without curly brace]
```

Parameters
----------

Like normal functions, arrow functions can take zero or more parameters.
You must put the parameter names in parentheses `(param1, param2, param3) => {}` unless your arrow function takes exactly one parameter.

```javascript
[require:Fundamentals.*arrow functions.*params]
```

Why Arrow Functions?
--------------------

Arrow functions have two major advantages:

1) Implicit return for one-line functions means more concise code
2) [Lexical `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_separate_this). `this` in the arrow function is the same as `this` outside the arrow function.

For example, suppose you try to call `setTimeout()` in a
[class method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions). If you use a normal function as opposed to
an arrow function, `this` will **not** be an instance of `MyClass`.

```javascript
[require:Fundamentals.*arrow functions.*class no arrow]
```

With an arrow function, `this` will be an instance of `MyClass`.

```javascript
[require:Fundamentals.*arrow functions.*class with arrow]
```

Why Not Arrow Functions?
------------------------

Arrow functions are excellent, and often it doesn't matter whether
you use an arrow function or normal function. But when you use a
framework that depends on `this`, you should not use arrow functions.

For example, suppose you declare a [Vue method](https://v1.vuejs.org/guide/events.html#Method-Handler) using an arrow function. You won't be able to access the Vue instance's `name`
property because Vue won't be able to set `this`.

```javascript
const Vue = require('vue');

const app = new Vue({
  data: () => ({ name: '' }),
  // This method will **not** work. Vue methods depend on
  // the correct value of `this`
  methods: {
    setName: newName => this.name = newName
  },
  template: `
    <div>
      <h1>{{name}}</h1>
      <button v-on:click="setName('Hello')"></button>
    </div>
  `
});
```

Another common case is [Mocha timeouts](https://mochajs.org/#test-level). You can use arrow functions for [Mocha tests](/tutorials/mocha/intro), but then you can't set the test timeout.

```javascript
describe('MyFunction', () => {
  it('works', () => {
    this.timeout(500); // Throws an error
  });
});
```

In general, you should **not** pass arrow functions to a framework
unless you do not intend to use the `this` keyword. For example,
don't use arrow functions for Vue methods, Mocha tests, React class
methods, or [Mongoose model methods](https://mongoosejs.com/docs/guide.html#methods). You may use arrow
functions inside a Vue method or a Mocha test, but the top level
function that you give to Vue or Mocha should **not** be an arrow function.
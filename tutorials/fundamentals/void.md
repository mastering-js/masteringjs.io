The [`void` operator in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void) 
evaluates an [expression](/tutorials/fundamentals/expressions) and returns 
`undefined`. At first glance, this operator doesn't seem useful, but there are 3 
cases where you may see the `void` operator in practice. Here are the 3 major use
cases:

No Overwriting `undefined`
----------------------

Surprisingly enough, [`undefined` is a valid variable name in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined#Description). The below script will print out "test" twice.

```javascript
const undefined = 'test';

function foo() {
  return undefined;
}

function bar(undefined) {
  return undefined;
}

console.log(foo());
console.log(bar('test'));
```

However, `void` is an operator. That means, if you try to name a variable `void`,
JavaScript will throw the below error.

```
SyntaxError: Unexpected token void
```

Some JavaScript projects prefer `void 0` instead of `undefined` to avoid accidentally creating variables named `undefined`. There is [even an ESLint rule to disallow `undefined`](https://eslint.org/docs/2.0.0/rules/no-undefined) for this reason.

No-Op for `<a>` Tags
-------------------------

Another use case for the `void` operator is to make an `<a>` tag with a `javascript:`
URI do nothing. An `<a>` tag is not valid HTML unless it has a `name` or `href` property, so `javascript: void(0)` is a common trick to make an `<a>` tag render correctly without adding an actual link.

```html
<a href="javascript:void(0)">Click Here</a>
```

Below is how the above HTML looks:

<a href="javascript:void(0)">Click Here</a>

Immediately Invoked Function Expressions (IIFEs)
------------------------------------------------

To declare a function and execute it in the same statement, you normally would
use parentheses to [force JavaScript to handle the function declaration as an expression](/tutorials/fundamentals/expressions#immediately-invoked-function-expressions-iifes).

```javascript
(function() { console.log('Hello, World'); })(); // Prints "Hello, World"
```

You may occasionally see the `void` operator as an alternative to parentheses.
Because `void` is a unary operator, it tells JavaScript to treat the function
declaration as an expression, so the below code prints "Hello, World."

```javascript
void function() { console.log('Hello, World'); }();
```

The difference is that a normal IIFE can still return a value, whereas using `void`
for IIFE will always evaluate to `undefined`.

```javascript
(function() { return 42; })(); // 42

void function() { return 42; }(); // undefined
```

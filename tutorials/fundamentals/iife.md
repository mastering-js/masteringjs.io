An [immediately invoked function expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (IIFE for short) is a JavaScript design pattern that declares an
anonymous function and immediately executes it.

```javascript
[require:IIFE basic example$]
```

You can also use arrow functions with the IIFE pattern:

```javascript
[require:IIFE arrow$]
```

The parenthesis around `function() { ... }` are mandatory: without those
parenthesis, you would get a syntax error. That's because the parenthesis
tell the JavaScript language parser to treat the function definition as
an [expression](/tutorials/fundamentals/expressions).

Why IIFEs?
----------

IIFEs are useful because they can define local variables that aren't
accessible outside the IIFE. For example, IIFEs are often used to
execute JavaScript in the browser without polluting global scope.

```html
<script>
  // Execute some code immediately without defining `answer` as a
  // global variable.
  (function() {
    var answer = 42;
  })();

  typeof answer; // 'undefined'
</script>
```

You may also see IIFEs for cases where you want some temporary
variables for one calculation that you don't want to expose to
other calculations. For example, suppose you want to compute
the total cost of a shopping cart, but don't want the `salesTax`
variable to leak to the surrounding scope:

```javascript
const subtotal = 40;
const total = (function() {
  const salesTax = product.salesTaxRate * subtotal;
  return subtotal + salesTax;
})();
```

With Unary Operators
-----------

You can omit the parenthesis around IIFEs if you use the IIFE with
a unary operator, like the [`void` operator](/tutorials/fundamentals/void#immediately-invoked-function-expressions-iifes).

```javascript
// Prints 'Hello, World'
void function() { console.log('Hello, World'); }();
```

You're unlikely to see the `void` pattern in production, but this
pattern is useful with [async functions](/tutorials/fundamentals/async-await)
because `await` is a unary operator. So you can `await` on an
async IIFE:

```javascript
[require:Fundamentals IIFE async$]
```
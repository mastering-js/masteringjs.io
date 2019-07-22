JavaScript's language syntax distinguishes between [_expressions_ and _statements_](https://2ality.com/2012/09/expressions-vs-statements.html).
These two concepts are subtly different, and you need to understand the difference
if you want to understand frameworks like [Vue](/vue).

In general, an expression is a snippet of code that evaluates to a value. A
statement is a snippet of code that performs an action. Wherever JavaScript
expects a statement, you can write an expression. But the opposite isn't true:
if a framework or the JavaScript runtime expects an expression, you cannot use
a statement.

The below code snippets are all expressions. They all evaluate to a value.

```javascript
0 // 0

1 + 1 // 2

'Hello' + ' ' + 'World' // 'Hello World'

{ answer: 42 } // { answer: 42 }

Object.assign({}, { answer: 42 }) // { answer: 42 }

answer !== 42 ? 42 : answer // 42

answer = 42 // 42
```

The below snippets are all statements. They do **not** evaluate to a value.

```javascript
// `if` statement
if (answer !== 42) { answer = 42 }
// `for` is a statement
for (;;) { console.log('Hello, World'); }
// Declaring a variable is a statement
let answer = 42
```

Function Arguments
------------------

When you call a JavaScript function, all the arguments must be expressions,
not statements.

```javascript
function print(v) {
  console.log(v);
}

print('Hello, World'); // OK
print(true ? 'Hello, World' : null); // OK

print(if (true) { 'Hello, World' }); // SyntaxError: Unexpected token if
```

A handy way to distinguish whether a code snippet is a statement or an expression is
to think about whether you could pass the code snippet as a parameter to `console.log()`.

You may see code that relies on the fact that assigning a value to a variable
is an expression, but declaring a variable is a statement. In other words,
you can pass an assignment as a parameter to a function, as long as you already
declared the variable.

```javascript
let answer;
console.log(answer = 42); // 42
answer; // 42

// SyntaxError
console.log(let value = 1);
```

Immediately Invoked Function Expressions (IIFEs)
------------------------------------------------

In JavaScript, function definitions are expressions.

```javascript
console.log(function() {}); // '[Function]'
```

There is also the notion of an [invocation expression](https://flaviocopes.com/javascript-expressions/#invocation-expressions). Calling a function is an expression:

```javascript
const getAnswer = function getAnswer() { return 42 };

console.log(getAnswer()); // '42'
```

However, things get confusing when you attempt to call a function at the same
time as declaring it.


```javascript
// SyntaxError
function getAnswer() { return 42 }();
```

That's because certain snippets can be expressions or statements depending on
context. For example `function getAnswer() { return 42; }` is an expression when
it is on the right hand side of an assignment, but a statement when it is at the
start of a file.

The workaround is to wrap `function getAnswer() { return 42 }` in parentheses.
Parenthesis, also known as [the grouping operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Grouping), make JavaScript attempt to treat what is in the parentheses as an expression.

```javascript
// 42
(function getAnswer() { return 42 })();
```

The pattern of wrapping a function in parentheses to call it immediately is
known as an "immediately invoked function expressions," or "IIFE" for short.

In Vue
------

Frontend frameworks like Vue allow you to bind [HTML values to JavaScript expressions](https://vuejs.org/v2/guide/syntax.html#Using-JavaScript-Expressions). Vue bindings must contain exactly one expression.

```javascript
[require:Vue.*expression.*with expression]
```

If you use a statement instead of an expression, Vue will throw a template compilation error.

```javascript
[require:Vue.*expression.*with statement]
```
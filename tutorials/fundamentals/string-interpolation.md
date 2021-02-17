JavaScript [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) support string interpolation. For example, suppose you wanted to implement a function `greet()` that says "Hello" to the given `name`. You implement `greet()` using [string concatenation](/tutorials/fundamentals/string-concat):

```javascript
function greet(name) {
  return 'Hello ' + name + '!';
}
```

But this approach can get messy if you have multiple variables you want to insert into a string. You can instead use a template literal, which is an alternative syntax for declaring a string. A template literal is enclosed using backticks "\`":

```javascript
function greet(name) {
  return `Hello ${name}!`;
}

const str = greet('World');
typeof str; // "string"
str; // "Hello World!"
```

The `${name}` part of the string is called a _placeholder_. You can put any [JavaScript expression](/tutorials/fundamentals/expressions) in a placeholder, like a function call:

```javascript
function capitalize(name) {
  return `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
}

function greet(name) {
  return `Hello ${capitalize(name)}!`;
}

const str = greet('wOrLd');
typeof str; // "string"
str; // "Hello World!"
```

With Custom Classes
-------------------

Remember that JavaScript expressions evaluate to a value. If your placeholder expression evaluates to a value that isn't a string, [`null`](/tutorials/fundamentals/null), or `undefined`, JavaScript will try to call the value's [`toString()` function](/tutorials/fundamentals/tostring) to convert the value to a string.

Here's how JavaScript handles objects in placeholders:

```javascript
[require:Fundamentals string interpolation custom class$]
```

Error Cases
-----------

Template literals don't throw errors if a placeholder expression evaluates to `null` or `undefined`.

```javascript
`Hello ${null}!`; // "Hello null!"
`Hello ${void 0}!`; // "Hello undefined!"
```

The only case where string interpolation can throw a runtime error is if your placeholder expression evaluates to an object whose `toString()` function throws an error. For example, [JavaScript symbols](https://thecodebarbarian.com/a-practical-guide-to-symbols-in-javascript.html) throw an error when you try to convert them to strings:

```javascript
[require:Fundamentals string interpolation symbol$]
```
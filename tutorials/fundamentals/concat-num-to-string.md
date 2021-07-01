You can concatenate a number to a string using the `+` operator as shown below.

```javascript
let example = 'Hello World';

let demo = example + 42; // 'Hello World42'

let reverse = 42 + example; // '42Hello World'
```

You can also use the `String#concat()` function, but using the `+` operator is less error prone in case `str` isn't a string.

```javascript
let example = 'Hello World';

example.concat(42); // 'Hello World42'

example = null;
null.concat(42); // Throws a TypeError
```

**Note:** If you are simply printing variables to the console, you do not need to concatenate.
Instead, use `console.log()` and pass each value you want to print as an argument:

```javascript
let example = 'Hello World';
console.log(example, 42); // Prints "Hello World 42", 42 is highlighted as a number
```

If you're combining elements [you should not use `concat()`](/tutorials/fundamentals/string-concat).
You should instead use the `+` operator as follows:

```javascript
let example = 'Hello World';

let demo = example + 42; // 'Hello World42'

let reverse = 42 + example; // '42Hello World'
```

**Note:** If you are simply printing variables to the console, you do not need to do the above.
Instead, use `console.log()` and pass each value you want to print as an argument:

```javascript
let example = 'Hello World';
console.log(example, 42); // 'Hello World' 42
```

Using a combination of JavaScript's `trimStart()`/`trimLeft()` function and a regular expression,
you can clean up bad strings in your projects. By default, `trimStart`/`trimLeft()` will only remove
whitespace from the start of the string. Therefore, you must define a function on the prototype of the
String class that will weed out the bad characters you define in the regular expression. Here I define
a new function called `shave()` that by default will only remove whitespace, however, you can override `trimStart()`/`trimLeft()`'s
behavior. Simply substitue `trimStart`/`trimLeft()` for shave:

```javascript
let example = '        Hello World';
example.trimStart(); // 'Hello World'
let example1 = 'Hello World';
String.prototype.shave = function(pattern) {
    if (pattern === undefined) {
        charlist = '/s';
    }
    return this.replace(new RegExp('^[' + pattern + ']+'), '');
}
// must start with H
example1.shave('Hleo'); // ' World'
```

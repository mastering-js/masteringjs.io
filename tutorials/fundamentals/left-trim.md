Using a combination of JavaScript's `trimStart()`/`trimLeft()` function and a regular expression,
you can clean up bad strings in your projects. By default, `trimStart`/`trimLeft()` will only remove
whitespace from the start of the string like so:

```javascript
let example = '        Hello World';
example.trimStart(); // 'Hello World'
```

Therefore, to remove other characters you deem unfit for your string, you must use `replace()` in
combination with a regular expression. The `^` means at the beginning of the string, `(Na)` means
the group `Na`, and `+` means one or more. So, the regular expression statement is at the beginning
of the string, remove 1 or more `Na`:

```javascript
let example = 'Na Na Na Na Na Na Na Na Na Na Na Na Na Na Na Na BATMAN!';
example.replace(/^(Na )+/, ''); // 'BATMAN!'
```

**Note:** Another available options is to define a property on `String.prototype`
but you should not do this unless you have a very good reason. Other libraries may
depend on it and therefore will make your code unable to work with others.

```javascript
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

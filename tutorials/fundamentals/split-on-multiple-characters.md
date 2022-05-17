To split a string with multiple characters/delimeters, you should pass a regular expression as an argument to the `split()` function.

```javascript
const sentence = 'Hey, check out this example.';
const example = sentence.split(/[\s,]+/);
example; // ["Hey", "check", "out", "this", "example."]
```

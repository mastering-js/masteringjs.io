To split a string with multiple characters, you should pass a regular expression as an argument to the `split()` function.
You can use `[]` to define a set of characters, as opposed to a single character, to match.

```javascript
const sentence = 'Hey, check out this example.';
const example = sentence.split(/[\s,]+/);
example; // ["Hey", "check", "out", "this", "example."]

const sample = 'this-is:a_test';
sample.split(/[-:_]/); // [ 'this', 'is', 'a', 'test' ]
```

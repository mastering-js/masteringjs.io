If you're combining elements [you should not use `concat()`](/tutorials/fundamentals/string-concat).
You should instead use the `+` operator as follows:

```javascript
let example = 'Hello World';

let demo = example + 42; // 'Hello World42'

let reverse = 42 + example; // '42Hello World'
```

To concatenate a regular expression in JavaScript, you can use a combination
of the `+` operator, and the `new RegExp()` class:

```javascript
let reg = /mastering/g;
let exp = /js/y;
let flags = reg.flags+exp.flags;
flags = Array.from(new Set(flags.split(''))).toString();
let regexp = new RegExp(reg.source + exp.source, flags);
```

The reason why you should be removing duplicates from the flags is that
when you put in a flag that is already present, the computer does not recognize it
as a flag and therfore will throw an error.

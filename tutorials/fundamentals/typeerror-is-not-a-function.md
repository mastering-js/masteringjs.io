The `TypeError: X is not a function` error is a common cause of confusion for JavaScript beginners.
JavaScript throws this error when you attempt to call a value that isn't a function. For example:

```javascript
const x = 42;

x(); // Throws 'TypeError: x is not a function'
```

Most modern JavaScript runtimes are good about formatting this error, so you know what [expression](/tutorials/fundamentals/expressions) you tried to call that isn't a function. For example, another common cause of
this error is calling a non-existant method on an object.

```javascript
const moment = require('moment');

const date = moment('2020-06-01');

// Typo! Throws 'TypeError: date.formt is not a function'
date.formt('YYYY-MM-DD');
```

If JavaScript throws this error in code that you wrote, you should double check the code at the line number
in the error's stack trace. Odds are, you either typo-ed, or you need to add a check to make sure the value
that you're calling is a function.

```javascript
// Ensure that `x` is a function to avoid TypeError.
if (typeof x !== 'function') {
  return;
}

x();
```

A Note on Semicolons
--------------------

If you don't use semicolons, you can get some surprising instances of this error. For example, the below
code throws `TypeError: arr[0] is not a function`:

```javascript
const arr = []

const val = arr[0]
(function() { console.log(val) })()
```

Because there isn't a semicolon at the end of `arr[0]`, JavaScript treats the above code as equivalent to:

```javascript
const arr = []

const val = arr[0](function() { console.log(val) })()
```

If you write JavaScript without semicolons, be sure to use a [linter](/eslint) to avoid mistakes like this!
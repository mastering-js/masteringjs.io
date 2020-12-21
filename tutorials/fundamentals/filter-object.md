JavaScript's [array `filter()` function](/tutorials/fundamentals/filter) is a handy
function that takes a function `callback` and returns a new array with just the
elements for which `callback` returned `true`.

```javascript
[require:Fundamentals.*Array#filter.*even/odd$]
```

Unfortunately, JavaScript objects don't have a `filter()` function. But that
doesn't mean you can't use `filter()` to filter objects, you just need to
be able to [iterate over an object](/tutorials/fundamentals/iterate-object) and
convert the object into an array using [`Object.entries()`](/tutorials/fundamentals/iterate-object#using-objectentries).

```javascript
[require:Fundamentals filter object$]
```

You can implement this logic as a one-liner, but it is a bit messy:

```javascript
function filterObject(obj, callback) {
  return Object.fromEntries(Object.entries(obj).
    filter(([key, val]) => callback(val, key)));
}
```

You can implement this more elegantly using Lodash's `flow()` function, which behaves
like a [`pipe()` function](https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/) that lets you chain static methods
like `Object.fromEntries()` and `Object.entries()`.

```javascript
[require:lodash filter object with flow$]
```
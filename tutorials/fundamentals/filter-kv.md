To filter an `object` by key-value, you can [iterate over the object using `Object.entries()`](/tutorials/fundamentals/iterate-object#using-objectentries) 

```javascript
[require:Fundamentals filter object$]
```

## Using `for/of` and `Object.entries()`

`Object.entries()` returns a 2 dimensional array of the key-value pairs.
Each element in the array has 2 elements: the first is the key, and the 2nd is the value.
So you can [iterate over the array](/tutorials/fundamentals/array-iterate) using `for/of` and create a new object with just the properties you want.

```javascript
[require:Fundamentals filter and copy object$]
```

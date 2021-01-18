When dealing with NaNs in your projects, it is important to understand what Nans are and how they work. NaN is a non-writable, non-configurable, non-enumerable property of the global object. You should avoid overriding it an instead error handle it when the situation arises in your project development. To do that however, you must check whether the value is a NaN. A interesting thing about Nans is that `NaN === NaN` and `Number.NaN === NaN` will return false as in the compiler's eyes they are not the same thing. Instead you can do the following:

```javascript
[require:Fundamentals NaNs]
```

Another interesting thing about NaNs is that arrays have a hard time with them. For example, `arr.includes(NaN)` will return true if there is a NaN in the array whereas `arr.indexOf(NaN)` will return -1 with or without a NaN in the array. However, `arr.findIndex(n => Number.isNaN(n))` will give the correct index of a NaN in a given array.

```javascript
[require:Fundamentals arrayNaNs]
```

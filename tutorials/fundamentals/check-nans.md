When dealing with NaNs in your projects, it is important to understand what `NaNs` are and how they work. `NaN` is a non-writable, non-configurable, non-enumerable property of the global object. A tricky thing about `NaNs` is that `NaN !== NaN` and `Number.NaN !== NaN`. We recommend using `Number.isNan()` over `isNan()` as it will only check if the given value would result in a `NaN` if you tried to convert it to a number. Instead you can do the following:

```javascript
[require:Fundamentals NumberisNaNs]
```

`isNaN()` on the other hand would check if the value would be a `NaN` if it was converted to a number. We recommend not using `isNaN()` as it gives surprising behavior.

```javascript
[require:Fundamentals isNaNs]
```

Another interesting thing about `NaNs` is that arrays have a hard time with them. For example, `arr.includes(NaN)` will return true if there is a `NaN` in the array whereas `arr.indexOf(NaN)` will return -1 with or without a `NaN` in the array. If you want the `indexOf()` a `NaN` in an array then ironically enough you should use `findIndex()` as follows: `arr.findIndex(n => Number.isNaN(n))`.

```javascript
[require:Fundamentals arrayNaNs]
```

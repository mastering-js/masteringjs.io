The [`Array#filter()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) in JavaScript returns a new array with all the
elements from the original array that the given [callback](/tutorials/fundamentals/callbacks) returns [truthy](/tutorials/fundamentals/truthy) for.

For example, given an array of numbers 1-10, below is how you can use `filter()` to
return an array of even numbers.

```javascript
[require:Fundamentals array filter even numbers$]
```

The `filter()` function returns a new array whose elements are the elements of
`nums` for which `isEven()` returned `true`.

The `index` Argument
--------------------

JavaScript calls the `filter()` callback with 3 arguments. The first argument is
the element in the array, and the 2nd argument is the index in the array.

For example, below is how you can get an array with only the odd indexes of the original
array:

```javascript
[require:Fundamentals array filter even indexes$]
```
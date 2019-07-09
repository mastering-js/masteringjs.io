In JavaScript, the [`Array#push()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) adds its arguments to the end of the array. It returns the new length of the array after the elements are added.

```javascript
[require:Array#push.*basic example]
```

Using the Spread Operator
-------------------------

Suppose you want to add all the elements from another array `arr2` to the end of
`arr`. Doing `arr.push(arr2)` will **not** add the elements from `arr2`, it will
instead add the array `arr2` as an element.

```javascript
[require:Array#push.*another array]
```

To add the elements of `arr2` to the end of `arr`, use [the spread operator](https://thecodebarbarian.com/object-assign-vs-object-spread.html). You can
think of `...` as converting the array into positional arguments.

```javascript
[require:Array#push.*spread]
```
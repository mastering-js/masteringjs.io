[JavaScript has a built-in `Array#sort()` function](/tutorials/fundamentals/array-sort) that sorts an array in place.
The built-in `sort()` function works well, but can get cumbersome when sorting
arrays of objects.

On the other hand, [`_.sortBy()`](https://lodash.com/docs/4.17.15#sortBy) lets you 
sort an array of objects by a property name as shown below.

```javascript
[require:lodash.*sortBy.*property name]
```

The first parameter to `sortBy()` is the array to sort, and then 2nd parameter
is called the `iteratees`. You can think of `iteratees` as a function that
transforms each array element into something that is sortable. For example,
instead of passing the property name `age` as a string, you can instead pass
an `iteratees` function as the 2nd parameter.

```javascript
[require:lodash.*sortBy.*using function]
```

There are numerous other ways to use `iteratees` to transform the array.
For example, instead of sorting by the character's age, you can sort by the
length of the character's name.

```javascript
[require:lodash.*sortBy.*length]
```
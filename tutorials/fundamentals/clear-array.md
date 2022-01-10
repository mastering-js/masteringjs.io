There are a few ways to clear an array in JavaScript.

## array.length = 0

The simplest solution is to assign the array's length to the value of 0.
The length property is readable and writeable which makes this possible.

```javascript
let array = [1,2,3,4,5];
array.length = 0;
array; // []
```

## array.splice(0, array.length)

A more verbose approach is to use the `splice()` method.
This function will return a copy of the array, so if you wanted to do a reassignment this would be a good use case.

```javascript
let array = [1,2,3,4,5];
let anotherArray = array.splice(0, array.length);
anotherArray; // [1,2,3,4,5]
array; // []
```

## array = []

Reassinging the array to an empty array has some repercussions.
This is an approach that should be avoided only because any references to the original array will not be reflected and will continue to use the old array.

```javascript
let array = [1,2,3,4,5];
let anotherArray = array;
array = [];
anotherArray; // [1,2,3,4,5]
```


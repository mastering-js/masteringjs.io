JavaScript's `spread` operator, `...`, is a handy way to pass
multiple values from an array, object, or anything you can iterate
through to a function or variable assignment. It shines especially
when you want to combine two or more arrays. The `...` operator offers
a more intuitive way to combine multiple arrays than using `push()`,
`splice()`, or `concat()`:

```javascript
[require:Fundamentals spread-assignment]
```

**Note:** Avoid using `...` with multidimensional arrays.
Modifying that kind of an array can lead to problems like
shown below:

```javascript
[require:Fundamentals spread-carefully]
```

# Spread with Functions

The spread operator also lets you call a function with the contents
of an array as parameters, similar to `apply()`. it passes the arguments
of the iterable value to the function in order and if you have more than
it is expecting, it does not create any problems.

```javascript
[require:Fundamentals spread-method]
```

# Spread with Objects

The same use case with arrays applies to objects as well,
so long as there is more than one property in the object.
Another ability that the spread operator enables is [shallow
cloning an object.](/tutorials/fundamentals/shallow-copy)
Essentially, with regards to nested objects, any changes made
on the copy are reflected onto the original.

```javascript
[require:Fundamentals.*shallow copy.*shallow$]
[require:Fundamentals.*shallow copy.*shallow limitation]
```

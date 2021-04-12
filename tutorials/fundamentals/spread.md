JavaScript's `spread` operator, `...`, is a handy way to pass 
multiple values from an array, object, or anything you can iterate
through to a function or variable assignment. It shines especially
when you want to combine two or more arrays. Instead of having to
use `push`, `splice`, `concat`, and the kitchen sink,  `...` makes
it less of a headache:

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

Using `...`, it reduces the chances of headaches arising when passing
arguments to a function. it passes the arguments of the iterable value
to the function in order and if you have more than it is expecting, it does
not create any problems.

```javascript
[require:Fundamentals spread-method]
```

# Spread with Objects

The same use case with arrays applies to objects as well,
so long as there is more than one property in the object.

**Note:** `...` will not replace `assign`.

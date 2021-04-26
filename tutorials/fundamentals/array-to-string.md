
Javascript's handy way of converting arrays to strings is the
`.toString()` method. Simply call it on the array and it will
return the entries in the form of a string, each separated by
a comma as seen below:

```javascript
let arr = ['Dog','Cat','Fish','Bread'];
arr.toString(); // prints Dog,Cat,Fish,Bread
```

# + Operator

You can also use the `+` operator to coerce the array to become
a string though this is less common as it doesn't automatically
insert a comma like `toString`.

```javascript
let arr = ['Dog','Cat','Fish','Bread'];
arr += ',Monkey';
arr; // prints Dog,Cat,Fish,Bread,Monkey
```

# join()

Another alternative to `toString` is the `.join()` function.
The strength of this function is that you can specify what you
want the values to be separated by whereas `toString` used commas.
Should you omit an argument to `join()`, it will default to commas.

```javascript
let arr = ['Boots','Cats','Boots','Cats'];
arr.join(' and '); // prints Boots and Cats and Boots and Cats
```

**Note:** Make sure to add a space before and after the value you choose, otherwise,
there will be no spaces.

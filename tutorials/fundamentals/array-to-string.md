
Javascript's handy way of converting arrays to strings is the
`.toString()` method. Simply call it on the array and it will
return the entries in the form of a string, each separated by
a comma as seen below:

```javascript
let arr = ['Dog','Cat','Fish','Bread'];
arr.toString(); // prints Dog,Cat,Fish,Bread
```

## join()

Another alternative to `toString` is the `.join()` function.
The benefit of using `join()` is that you can specify a custom
separator. `toString()` always uses `,` as the separator.
If you call `join()` without arguments, it will default to commas.

```javascript
let arr = ['Boots','Cats','Boots','Cats'];
arr.join(' and '); // prints Boots and Cats and Boots and Cats
```

**Note:** Make sure to add a space before and after the value you choose, otherwise,
there will be no spaces.

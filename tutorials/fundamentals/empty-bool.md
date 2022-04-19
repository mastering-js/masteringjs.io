There are only seven values that are [falsy](/tutorials/fundamentals/truthy) in JavaScript, and empty objects are not one of them.
An empty object is an object that has no properties of its own.
If you want to check if an object is empty you should use the `Object.keys()` function as it will return 0 on empty objects.

```javascript
if ({}) {
    console.log('I will print');
}

if (Object.keys({})) {
    console.log('I will not print');
}
```

## Handling null with Object.keys()

If you pass `null` as an argument to `Object.keys()` it will throw an error.
To work around this, you should check beforehand if the argument being passed is null.

```javascript
const value = null;

if (typeof value === 'object' && value != null && Object.keys(value).length == 0) {
    console.log('I will not print and not throw an error either');
}
```

The reason why this if statement will not throw an error is because the if statement is read from left to right.
The first two statements result in `false` and because the following operator is an and `&&` operator, the code does not bother reading it because it knows the result of the logic statements will still be false.
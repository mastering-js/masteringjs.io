There are only seven values that are [falsy](/tutorials/fundamentals/truthy) in JavaScript, and empty objects are not one of them.
An empty object is an object that has no properties of its own.
You can use the `Object.keys()` function to check if an object is empty as shown below.

```javascript
if ({}) {
    console.log('I will print');
}

if (Object.keys({}).length === 0) {
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

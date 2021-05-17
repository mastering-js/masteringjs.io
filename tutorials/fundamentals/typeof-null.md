You shouldn't use the [`typeof` operator](/tutorials/fundamentals/typeof)
when checking if a value is [`null`](/tutorials/fundamentals/null)
because `typeof` cannot distinguish a `null` from an `object`.
You must use the `===` operator as `==` will return `true`
if checking against an `undefined` variable.

```javascript
const x = null;
typeof x; // 'object'
if (x === null) {
    // will execute
}
const y;
if (y == null) {
    // will execute even though
    // that is not the intention
}
```

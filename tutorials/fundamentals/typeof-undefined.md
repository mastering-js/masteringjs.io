To check if a variable is undefined, you should use
the [`typeof` operator](/tutorials/fundamentals/typeof).
When used on an `undefined` variable, it will return
`'undefined'`. If you use that in conjunction with the
`===` operator, you can successfully check for those specific
values.

```javascript
var x;
typeof x; // 'undefined'
if (x === 'undefined') {
    // will execute
}
```

**Note:** Read more about checking for [`undefined`](/tutorials/fundamentals/undefined-check).

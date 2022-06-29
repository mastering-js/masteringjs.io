You can check if a date is between two dates by simply using the `>=` and `<=` operators.

```javascript
const start = Date.parse('04 Dec 1995 00:12:00 GMT');
const end = Date.now();
const d = Date.parse('24 Dec 1997 13:47:00');

if (d >= start && d <= end) {
  console.log('This date is between the two dates');
} else {
  console.log('This date is not between the two dates');
}
```

Typescript doesn't like this approach and will complain.
To get Typescript to shut up, use the `valueOf()` function in conjunction with `Date()`.

```typescript
const start = Date.parse('04 Dec 1995 00:12:00 GMT');
const end = Date.now();
const d = Date.parse('24 Dec 1997 13:47:00');

if (d.valueOf() >= start.valueOf() && d.valueOf() <= end.valueOf()) {
  console.log('This date is between the two dates');
} else {
  console.log('This date is not between the two dates');
}
```

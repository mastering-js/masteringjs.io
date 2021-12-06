To check if a string does not start with a regular expression, negate `startsWith()` while checking for a regular expression.
Regular expressions start and end with a `/`, so enter that into the `startsWith()` function.

```javascript
let regex = 'Hello World';
!regex.startsWith('/'); // true
```
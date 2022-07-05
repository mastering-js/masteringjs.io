When destructuring an object, you can rename the variables like so:

```javascript
const obj = { first_name: 'John', last_name: 'Smith' };

const { first_name: firstName, last_name: lastName } = obj;
firstName; // 'John'
lastName; // 'Smith'
```

This is perfect for cases where you want to rename variables from a REST API whose naming conventions don't line up with yours.
For example, switching variables from `snake_case` to `camelCase` or vice versa.
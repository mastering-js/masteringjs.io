When destructuring an object, you can rename the variables like so:

```javascript
const obj = { first_name: 'John', last_name: 'Smith' };

const { first_name: firstName, last_name: lastName } = obj;
firstName; // 'John'
lastName; // 'Smith'
```

This is perfect for making sure your variable names are in line with the standards used at your workplace or making a vague variable name provided from an http request more clear.
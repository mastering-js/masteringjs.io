`axios.all()` is axios's own way of making concurrent http requests and getting back an equal number of responses that you can have either in an array using destructuring or a separate variable for each one. We recommend assigning the return value of axios.get to a variable before passing it into `axios.all()` to make your code more readable as `axios.all()` takes an array of requests. Making a request would look something like as follows:

```javascript
[require:axios axios-all]
```

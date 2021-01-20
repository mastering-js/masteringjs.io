`axios.all()` is [Axios](/axios)'s own way of making concurrent HTTP requests and getting back an equal number of responses that you can have either in an array using destructuring or a separate variable for each one. We recommend assigning the return value of [`axios.get()`](/tutorials/axios/get) to a variable before passing it into `axios.all()` to make your code more readable as `axios.all()` takes a spread of requests. Here's how you can use `axios.all()` to make 3 requests in parallel:

```javascript
[require:axios axios-all]
```

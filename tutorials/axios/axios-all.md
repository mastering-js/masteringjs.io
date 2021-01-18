`axios.all()` is axios's own way of making concurrent http requests and getting back an array of the responses. Because you would be making multiple requests when using this, you should make an effort to make the code more readable. Making a request would look something like as follows:

```javascript
[require:axios axios-all]
```
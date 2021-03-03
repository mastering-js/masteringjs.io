[Axios](https://github.com/axios/axios#creating-an-instance) has a neat tool, `create()`, that allows you to
customize your HTTP requests if you need to make multiple requests to the same domain. The
[`create()`](/tutorials/axios/create) function allows you to create an instance with pre-populated [Axios options](/tutorials/axios/options).

By specifying the url and the type of request in the instance, you don't need
to use the specific axios function calls like `post()`. Instead, you use `request()` and specify the other
configuration properties that `create()` was not responsible for, like the information
to be sent in the `data` property. You can create a custom instance for a POST request as
shown below:

```javascript
[require:axios axios-create-post]
```

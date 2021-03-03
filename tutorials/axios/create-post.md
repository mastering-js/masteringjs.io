[Axios](https://github.com/axios/axios#creating-an-instance) has a neat tool, `create()`, that allows you to
customize your HTTP requests if you need to make multiple requests to the same domain. The
[`create()`](/tutorials/axios/create) function allows you to create an instance and customize
its properties to fit your needs. By specifying the url and the type of request in the instance, there is no need
to use the specific axios function calls like `post()` for example, as that has
already been specified. Instead, you use `request()` and specify the other
configuration properties that `create()` was not responsible for like the information
to be sent in the `data` property. You can create a custom instance for a POST request as
demonstrated below:

```javascript
[require:axios axios-create-post]
```

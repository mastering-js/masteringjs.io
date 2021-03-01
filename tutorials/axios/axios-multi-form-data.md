To send multipart form data with axios, there is some preparation
that needs to be done before we can begin. First, because node does
not have a `FormData` class, we need to install an npm package. The
most popular one used is `form-data` which we will be using as well.
Once you have installed the package, we can begin sending form data
with axios.

To create the form, you must append the data to the form that will be sent
to the server using the `append()` method. It takes a key and a value as the
parameters.

```javascript
[require:axios axios-multi-form-data]
```

**Note:** Axios does not automatically set the multipart form boundary in Node,
as a result, you must use `getHeaders()`.

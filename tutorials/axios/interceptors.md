[Axios interceptors](https://github.com/axios/axios#interceptors) are
functions that Axios calls for every request. You can use interceptors
to transform the request before Axios sends it, or transform the
response before Axios returns the response to your code.

You can think of interceptors as Axios' equivalent to middleware in
[Express](/tutorials/express/middleware) or [Mongoose](https://mongoosejs.com/docs/middleware.html).

Print Every Request to the Console
-----------------------------

The easiest way to get started with interceptors is to write one
that `console.log()`'s every HTTP request. Since Axios calls
interceptors for you, you only have to write one interceptor
instead of calling `console.log()` every time.

```javascript
[require:axios Interceptors print request$]
```

Print Every Response to the Console
--------------------------------

There are two types of interceptors: request interceptors and response
interceptors.

The previous example was a request interceptor. Axios calls request
interceptors **before** sending the request, so you can use request
interceptors to modify the request.

Axios calls response interceptors after it sends the request and
receives a response. The `res` parameter to interceptors is the
Axios response object, the same object you get when you do
`await axios.get()`. Below is a simple response interceptor that
prints the response.

```javascript
[require:axios Interceptors print response$]
```

Automatically Set the [Authorization Header](/tutorials/axios/authorization)
--------------------------

One of the most common use cases for interceptors is handling
authorization. Typically, the way a client app proves to a server
that the user is logged in is by sending a secret token in the
authorization header. Interceptors let you set the `authorization`
header automatically on all requests as shown below.

```javascript
[require:axios Interceptors authorization header$]
```

[Error Handling](/tutorials/axios/error-handling)
-------------

Response interceptors also let you handle errors. This is important
because Axios' default error message is "Request failed with status code 404",
which usually isn't what you want to show to your end user.

The `axios.interceptors.response.use()` function takes 2 function parameters:
`successHandler` and `errorHandler`. Axios calls `successHandler` if the
request succeeded, or `errorHandler` if the request failed. You can
write your own `errorHandler` to transform errors as shown below.

Just make sure to rethrow an error in your `errorHandler`, otherwise
Axios will treat it as a successful request!

```javascript
[require:axios Interceptors error handling$]
```

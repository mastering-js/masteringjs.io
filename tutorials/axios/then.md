[Axios](/axios) requests are actually [promises](/tutorials/fundamentals/promise). Than means you
can use them with [promise chaining](/tutorials/fundamentals/then#chaining) and [async/await](/tutorials/fundamentals/async-await).

```javascript
[require:axios #then is a promise$]
```

Handling Errors
---------------

Axios fulfills the request promise when the server responds with an [HTTP success code](https://www.w3.org/Protocols/HTTP/HTRESP.html), or rejects
the request promise when the server responds with an HTTP error.
If an error occurs, you can handle the error with `.then()` or `.catch()`.

```javascript
[require:axios #then error handling$]
```

Axios Requests Execute Immediately
----------------------------------

You do **not** need to call `.then()` or `.catch()` to execute an
Axios request. Axios executes the request immediately on its own.
So even if you don't call `then()`, your server will still get the
request.

```javascript
[require:axios #then executes immediately$]
```
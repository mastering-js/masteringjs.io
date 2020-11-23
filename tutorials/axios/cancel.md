[Axios](/axios) supports a [limited mechanism for cancelling requests](https://www.pluralsight.com/guides/all-need-to-know-about-axios). The syntax is straightforward: you pass a `cancelToken` option
to your Axios request, and calling `cancel()` makes your request error out.

The `cancelToken` Option
------------------------

The [`options` parameter to Axios functions](/tutorials/axios/options) supports a `cancelToken`
option. The Axios global has a `CancelToken` object that can [create a cancel token](https://github.com/axios/axios#cancellation) for you as shown below.

```javascript
[require:axios cancel basic example$]
```

Note that `axios.CancelToken.source()` returns a source object, not the token itself. Make sure you
pass the token as the `cancelToken` option, **not** the source object. Otherwise you'll get a
["config.cancelToken.throwIfRequested is not a function" error](https://decker.medium.com/typeerror-config-canceltoken-throwifrequested-is-not-a-function-6b7b20b54fa2).

The `source.cancel()` function takes a single parameter: an optional error message. The error
message is just for passing a reason for the cancellation, you can use whatever string makes sense
for your application, or omit the message entirely.

How Does Cancellation Actually Work?
------------------------------------

Under the hood, when you `cancel()` a request, Axios calls [`ClientRequest#abort()` in Node.js](https://nodejs.org/api/http.html#http_request_abort) or [`XMLHttpRequest#abort()`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort) in the browser. However, this
does **not** guarantee that the HTTP request doesn't end up getting sent to the server.

For example, the below script still prints "Got request!" even though Axios cancels the request.
That's because there's no way to cancel an HTTP request in general once the request has already been
sent over the network. If Axios has already sent the request, all cancel does is cause your Axios
request to error out and ignore any response the server sends after cancellation.

```javascript
[require:axios cancel client and server$]
```

So is cancellation useless? Not necessarily. Cancelling requests can be useful in the browser if
you want to clean up any outstanding requests when, say, the user navigates to another page. Just
remember: even if you cancel a request, there is a good chance the request will still end up going
to the server. So if you send a [PUT request](/tutorials/axios/put) that modifies data, that request
may still get to the server and modify the data, so your client may be out of date if you cancel
an HTTP request.
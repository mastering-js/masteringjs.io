By default, when making a request to a server using axios,
the `Content-Type` is set to send `JSON` data. The server is
not held to that same standard however and may send the data
back in a different format. Axios has the [`transformResponse`](/tutorials/axios/data)
to enable you to specify how you want it received on the response.
Below is an example demonstrating how to make a simple `GET` request with
Axios:

```javascript
[require:axios response body basic example$]
```

# How to POST/PUT JSON

When making a [`POST`](/tutorials/axios/post-json) or [`PUT`](/tutorials/axios/put) request,
Axios will automatically `parse` the data to JSON, provided you are sending an object,
and make the necessary adjustments elsewhere in the request so it can be automatically
parsed once received by the server.

## POST

```javascript
[require:axios post json automatically serializes$]
```

## PUT

```javascript
[require:axios.*PUT requests.*basic example$]
```

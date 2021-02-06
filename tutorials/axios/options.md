The 2nd parameter to [`axios.get()`](/tutorials/axios/get) and 3rd parameter to [`axios.post()`](/tutorials/axios/post)
and [`axios.put()`](/tutorials/axios/put) is an `options` object, also known as the Axios request config. You can find
a [complete list of options on the Axios docs](https://www.npmjs.com/package/axios#request-config).

Below is a list of the most important options. Click on an option to read more about it.

* [`url`](#url): the URL the request will be sent to
* [`method`](#method): the HTTP method (verb). If you use helpers like `axios.get()` or `axios.post()`, Axios will set this for you.
* [`data`](#data): the HTTP request body for POST, PUT, DELETE, and PATCH. Ignored for `get()`. Can be a POJO, string, or [FormData](/tutorials/axios/form-data)
* [`params`](#params): [POJO](/tutorials/fundamentals/pojo) or [URLSearchParams](/tutorials/fundamentals/query-string) that Axios will use as the query string
* [`baseURL`](#baseurl): if `url` is not an absolute URL (starts with `http://` or `https://`) then Axios will prepend `baseURL` to `url`. Most often used alongside [`axios.create()`](/tutorials/axios/create).

## `url`

If you use a helper function like `axios.get()` or `axios.post()`, Axios automatically sets this option for you. But
you can also set the `url` by using the [`axios()` function](/tutorials/axios/call), which takes the request config as its first parameter.

```javascript
[require:axios get request using method option$]
```

## `method`

Helper functions like `axios.get()` and `axios.post()` automatically set the `method` for you, but you can also
set it in your request config:

```javascript
[require:axios POST requests using method option$]
```

## `data`

Axios serializes the `data` option into the HTTP request body. This option **only** works with POST, PUT,  DELETE, and
PATCH requests. [Setting `data` is a no-op for GET requests](/tutorials/axios/get-with-data).

```javascript
[require:axios POST requests using data option$]
```

## `params`

Axios serializes the `params` option into the request's query string.

```javascript
[require:axios get request params$]
```

## `baseURL`

This option is often used with `axios.create()` to ensure that the server URL you're sending requests to is defined
in only one place, as opposed to having to copy/paste `https://api.myservice.com` repeatedly. For example:

```javascript
[require:axios #create baseURL$]
```
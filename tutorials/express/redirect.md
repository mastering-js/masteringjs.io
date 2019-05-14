The [`res.redirect()` function](http://expressjs.com/en/4x/api.html#res.redirect) lets you redirect the user to a different URL by sending an [HTTP response with status 302](https://en.wikipedia.org/wiki/HTTP_302). The HTTP client (browser, [Axios](https://masteringjs.io/tutorials/axios/headers), etc.) will then "follow" the redirect and send an HTTP request to the new URL as shown below.

```javascript
[require:Express.*redirects.*basic 302]
```

The `res.redirect()` function also lets you specify an HTTP status other than 302. The [302 status is considered a temporary redirect](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302), which means search engines will still crawl the existing URL. If you want to indicate the URL has permanently changed, you should send a response with [HTTP status 301](https://en.wikipedia.org/wiki/HTTP_301).

```javascript
[require:Express.*redirects.*301]
```

Handling POST Requests
----------------------

There's some nuances about which status code you should use for POST requests.
Strictly speaking, [HTTP 301 and 302 are not required to keep the same method and body content](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301) when redirecting. If you're redirecting a POST request, you should use [HTTP 307](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307) as a replacement for HTTP 302, and [HTTP 308](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308) as a replacement for HTTP 301.

```javascript
[require:Express.*redirects.*307]
```

Here's a brief summary of the tradeoffs between these common redirect statuses.

<img src="https://i.imgur.com/K8LeE7a.png">
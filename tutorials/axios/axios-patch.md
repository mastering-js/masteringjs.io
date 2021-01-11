The easiest way to make a PATCH request with [Axios](https://www.npmjs.com/package/axios) is the axios.patch() function. The first parameter is the url to which the request will be made, and the second parameter is the data you will be sending to change. You can include the other data that will not be changed as this will have no effect on the data stored. You can make a Patch request with axios as follows:

```javascript
[require:axios Patch patch]
```

If you omit the second parameter, axios will treat it like an object and do a JSON.stringify on the empty object before sending the request. It also will specify the content-type to [application/json](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type), allowing for smooth integration in most projects.

If you pass a string as the second parameter, axios will set the content-type header to [application/x-www-form-urlencoded](https://dev.to/sidthesloth92/understanding-html-form-encoding-url-encoded-and-multipart-forms-3lpa). This will turn the request body into a series of key-value pairs.

```javascript
[require:axios.*PUT requests.*string$]
```
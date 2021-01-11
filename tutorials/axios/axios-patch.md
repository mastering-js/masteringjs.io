The easiest way to make a PATCH request with [Axios](https://www.npmjs.com/package/axios) is the axios.patch() function. The first parameter is the url to which the request will be made, and the second parameter is the data you will be sending to change. You can make a PATCH request with axios as follows:

```javascript
[require:axios Patch patch]
```

If the second parameter is an object, axios will do a JSON.stringify on the object before sending the request. It also will specify the content-type to [application/json](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type), allowing for smooth integration in most projects.

```javascript
[require:axios Patch patch2]
```

If you pass a string as the second parameter, axios will set the content-type header to [application/x-www-form-urlencoded](https://dev.to/sidthesloth92/understanding-html-form-encoding-url-encoded-and-multipart-forms-3lpa). This will turn the request body into a series of key-value pairs.

```javascript
[require:axios Patch patch3]
```
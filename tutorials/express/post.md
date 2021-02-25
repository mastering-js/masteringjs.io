[Express](http://expressjs.com/) makes it easy to register route handlers for POST requests. Here's a basic POST request
handler.

```javascript
[require:Express post requests basic handler$]
```

The above code starts an Express server on port 3000 that handles POST requests to the `/` endpoint. You can then
send requests to the server using an HTTP client like [Axios](/axios)

```javascript
const data = await axios.post('http://localhost:3000/', {}).then(res => res.data);
data; // 'Hello, World!'
```

JSON [Request Bodies](/tutorials/express/body)
--------------

POST requests requests are different from [GET requests](/tutorials/express/app-get) because POST requests are allowed to send data in the [HTTP request body](https://en.wikipedia.org/wiki/HTTP_message_body). For example, the below code sends an HTTP POST request with a JSON object in the request body:

```javascript
const axios = require('axios');
const res = await axios.post('http://localhost:3000/', {
  answer: 42
});
```

Express doesn't parse HTTP request bodies by default, but it does have a built-in [middleware](/tutorials/express/middleware) that populates the `req.body` property with the parsed request body. For example, `app.use(express.json())` is how you tell Express to automatically parse JSON request bodies for you.

```javascript
[require:Express request body json middleware$]
```

URL Encoded Request Bodies
-----------------------

Express has an officially supported module [body-parser](https://www.npmjs.com/package/body-parser) that includes a
[parser for URL-encoded request bodies](https://expressjs.com/en/resources/middleware/body-parser.html#bodyparserurlencodedoptions), like the ones submitted by [HTML forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Your_first_HTML_form).

```javascript
[require:Express request body url encoded$]
```

[File Uploads](/tutorials/express/file-upload)
------------

[POST requests are often used for file uploads](https://www.w3schools.com/php/php_file_upload.asp). Express itself doesn't make it easy to upload files, but there are several npm modules that handle file uploads for you. [Formidable](https://www.npmjs.com/package/formidable) is the most popular file uploading library for Express. Here's how you can use Formidable to upload files:

```javascript
[require:Express.*file upload]
```
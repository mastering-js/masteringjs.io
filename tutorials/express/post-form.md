Express doesn't handle [FormData](/tutorials/fundamentals/formdata) instances by default.
FormData is useful for tasks like [uploading a file](/tutorials/fundamentals/upload-file).
You need to use a separate FormData parser, like [Formidable](https://www.npmjs.com/package/formidable), as shown below.

```javascript
const formidable = require('formidable');

app.post('/upload', function(req, res) {
  const form = new formidable.IncomingForm();
  // Parse `req` and upload all associated files. `files` contains
  // all files that were uploaded with the form.
  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const [firstFileName] = Object.keys(files);

    res.json({ filename: firstFileName });
  });
});
```
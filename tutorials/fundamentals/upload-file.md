HTML has a [file `input` tag](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) that lets users select one or more files to upload. For example, below is HTML that defines a file `input`.

```html
<input type="file" />
```

Given an `<input type="File">`, you can access the selected file as a [blob](/tutorials/fundamentals/blob) by accessing
`input.files[0]`:

```javascript
const input = document.querySelector('input[type="file"]');
const file = input.files[0];

file instanceof File; // true
file instanceof Blob; // true
```

Uploading a File
----------------

Once you have a blob, you can upload it using JavaScript's built-in `FormData` class. [Axios supports HTTP POST requests with `FormData`](/tutorials/axios/form-data), so uploading a file is easy:

```javascript
const formData = new FormData();
formData.append('myimage.png', file);

// Post the form, just make sure to set the 'Content-Type' header
const res = await axios.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
```

Server-Side Setup
-----------------

Parsing FormData uploads on the server side is tricky, you should use an npm module like [Formidable](https://www.npmjs.com/package/formidable) to help you out. Below is how you can write the corresponding `POST /upload` endpoint to the above Axios
request.

Note that the below code just returns the file name, it doesn't actually store the file. Once you have the parsed file
in Node.js, you would need to either [upload the file to AWS S3](/tutorials/node/s3) or some other storage service, or
store it on your server's hard drive using `fs`.

```javascript
app.post('/upload', function(req, res) {
  const form = new formidable.IncomingForm();
  // Parse `req` and upload all associated files
  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const [firstFileName] = Object.keys(files);

    res.json({ filename: firstFileName });
  });
});
```

For example, here's an `upload` endpoint that uploads the file to a bucket named 'masteringjs-test' in AWS S3:

```javascript
const AWS = require('aws-sdk');

app.post('/upload', function(req, res) {
  const form = new formidable.IncomingForm();
  // Parse `req` and upload all associated files
  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const [firstKey] = Object.keys(files);
    const upload = {
      Bucket: 'masteringjs-test',
      Body: fs.createReadStream(files[firstKey].path),
      Key: files[firstKey].name
    };
    s3.upload(upload, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.json({ ok: 1 });
    });
  });
});
```
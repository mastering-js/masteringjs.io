[Formidable](https://www.npmjs.com/package/formidable) is the most popular file uploading library for Express. Here's how you can use Formidable to upload files:

```javascript
[require:Express.*file upload]
```

The `/upload` route handler has 3 steps:

1) Create a new form using `new formidable.IncomingForm()`. The [`IncomingForm` class](https://www.npmjs.com/package/formidable#api) is the primary entry point to Formidable.

2) Call `form.parse()` on an [Express request](http://expressjs.com/en/4x/api.html#req). This tells Formidable to parse the request and save any files in the request to your server.

3) Handle the uploaded files. You can store the files locally, or [upload the files to a service like Amazon S3](https://www.zeolearn.com/magazine/uploading-files-to-aws-s3-using-nodejs).
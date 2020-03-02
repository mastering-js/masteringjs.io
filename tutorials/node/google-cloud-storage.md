[Google Cloud](https://cloud.google.com/nodejs) is Google's alternative
to AWS. For the most part, you can do anything you do on AWS in
Google Cloud, and vice versa. For example, this article will
show how to upload a file to [Google Cloud Storage](https://cloud.google.com/storage), which is similar to [AWS S3](/tutorials/node/s3).

Setup
-----

The [`@google-cloud/storage` npm module](https://www.npmjs.com/package/@google-cloud/storage) is Google's officially supported npm module for uploading files to Google Cloud. The first thing you need to do is
[get a Google service account key](https://www.npmjs.com/package/@google-cloud/storage#using-the-client-library), which contains the credentials you
need to authenticate with Google Cloud.

To get this file, you should [create a Google Cloud service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts) and give it the "storage admin" permission. Then create a key for the service account and
download it.

<img src="https://codebarbarian-images.s3.amazonaws.com/google-cloud-example.png" class="inline-image">

Uploading a File with Node.js
-----------------------------

Next, let's use the `@google-cloud/storage` npm module to upload
a file. The npm module is pretty easy to work with - the hard part
is getting the credentials.

To upload a file, you just use the `.upload()` function. You also
need to make sure the file is public using the `makePublic()` function:

```javascript
[require:Google Cloud storage$]
```
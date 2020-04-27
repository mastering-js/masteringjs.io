A [blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) is an object that contains arbitrary bytes. The `Blob` class is part of the [File API](https://www.w3.org/TR/FileAPI/) for browsers: the JavaScript `File` class is a subclass of `Blob`. So when you get a file instance from an `<input type="file">`, that
is an instance of `Blob`.

```javascript
const input = document.querySelector('input[type="file"]');
const file = input.files[0];

file instanceof File; // true
file instanceof Blob; // true
```

Like [FileReader](/tutorials/fundamentals/filereader), the `Blob` class is
well supported in different browsers, but **not** in Node.js. [Node.js buffers](/tutorials/node/buffer) are analagous to blobs in that they store arbitrary bytes, but they have a completely separate API.

Blob Data Urls
--------------

Blobs have a neat [`createObjectUrl()` function](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) that is often used for previewing uploaded images. Given a blob, `URL.createObjectURL()` creates a URL for that blob that you can use with attributes like `src` or `href`.

For example, if you click on the below file input and select an image, you'll see a preview of the selected image.

<input type="file" id="data-url-example">
<br>
<div id="data-url-container" style="width: 50%"></div>

<script>
  const input = document.querySelector('#data-url-example');

  input.addEventListener('change', () => {
    const file = input.files[0];
    const url = URL.createObjectURL(file);
    
    document.querySelector('#data-url-container').innerHTML = `
      <img src="${url}" />
    `;
  });
</script>

Below is the JavaScript that powers the above input. It uses `URL.createObjectURL()` to create a local URL for the uploaded file, without actually uploading the file to a server.

```javascript
const input = document.querySelector('#data-url-example');

input.addEventListener('change', () => {
  const file = input.files[0];
  const url = URL.createObjectURL(file);
    
  document.querySelector('#data-url-container').innerHTML = `
    <img src="${url}" />
  `;
});
```
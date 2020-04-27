The JavaScript [FormData class](https://developer.mozilla.org/en-US/docs/Web/API/FormData) is often used to [upload files using JavaScript](/tutorials/axios/form-data). For example, given a JavaScript file input:

```
<input type="file" id="my-input">
```

You can upload the selected file by creating a `FormData` class and passing
it to [Axios' `post()` function](/tutorials/axios/post).

```javascript
const input = document.querySelector('#my-input');

const formData = new FormData();
formData.append('myFile', input.files[0]);

axios.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
```

In short, the `FormData` class is the easiest way to upload a file
from JavaScript without submitting an actual HTML form.
[JavaScript's `FileReader`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) is a class that enables you to read a file on the user's
machine from JavaScript running in the browser. `FileReader` is typically
used to read data from an [`<input type="file">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file).

For example, suppose you have a file input on your page with id `select-file`.
Here's how you can print out the contents of the currently selected file.

```javascript
const file = document.querySelector('#select-file').files[0];
const reader = new FileReader();

reader.onload = res => {
  console.log(res.target.result); // Print file contents
};
reader.onerror = err => console.log(err);

reader.readAsText(file);
```

Below is a live example that prints file contents to the console
every time you select a different file. Click Ctrl+Shift+J on Linux/Windows
or Cmd+J on OSX to open up the Chrome console and try it out!

<input type="file" id="select-file">

<script>
  const input = document.querySelector('#select-file');

  input.addEventListener('change', () => {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = res => {
      console.log(res.target.result); // Print file contents
    };
    reader.onerror = err => console.log(err);

    reader.readAsText(file);
  });
</script>

`FileReader` is well supported in modern browsers, as well as IE10.
Note that `FileReader` is a browser API, so, while most browsers
support it, `FileReader` is **not** part of Node.js.

With Promises and Async/Await
-----------------------------

The `FileReader` class' async API isn't ideal for usage with [async/await](/tutorials/fundamentals/async-await) or [promise chaining](/tutorials/fundamentals/promise-chaining). Here's how you can wrap a `FileReader`
in a promise for chaining:

```javascript
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = res => {
      resolve(res.target.result);
    };
    reader.onerror = err => reject(err);

    reader.readAsText(file);
  });
}
```

With the above `readFile()` helper, you can read a file in an async
function:

```javascript
async function onSubmit() {
  const file = document.querySelector('#select-file').files[0];

  const contents = await readFile(file);
}
```
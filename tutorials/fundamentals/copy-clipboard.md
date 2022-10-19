To copy text from an `input` or `textarea`, you should call the element's `select()` and `setSelectionRange()` methods, followed by `execCommand('copy')`.
`select()` and `setSelectionRange()` select the text in the input, and `execCommand('copy')` copies the current selection to the clipboard.

Below is a live example.

<textarea id="example">Lorem ipsum dolor sit amet</textarea>
<div>
<button onclick="triggerExample()">Click to Copy</button>
</div>
<script>
function triggerExample() {
  const element = document.querySelector('#example');
  element.select();
  element.setSelectionRange(0, 99999);
  document.execCommand('copy');
}
</script>

```html
<textarea id="example">Lorem ipsum dolor sit amet</textarea>
<div>
  <button onclick="triggerExample()">Click to Copy</button>
</div>
```

```javascript
function triggerExample() {
  const element = document.querySelector('#example');
  element.select();
  element.setSelectionRange(0, 99999);
  document.execCommand('copy');
}
```

## Copy from a non-input field

To copy from a non-input field, you must create a temporary `textarea` or `input` and set the contents of that temporary input to the text you want to copy using the [`document.createElement()` function](/tutorials/fundamentals/create-element).
You need to append the input to the page.
You can remove it from the page after you've executed `execCommand('copy')`.

<div id="example1">Here's how you copy me!</div>
<div>
  <button onclick="triggerExample1()">Click to Copy</button>
</div>
<script>
function triggerExample1() {
  const element = document.querySelector('#example1');
  const storage = document.createElement('textarea');
  storage.value = element.innerHTML;
  element.appendChild(storage);
  storage.select();
  storage.setSelectionRange(0, 99999);
  document.execCommand('copy');
  element.removeChild(storage);
}
</script>

```html
<div id="example1">Here's how you copy me!</div>
<div>
  <button onclick="triggerExample1()">Click Me</button>
</div>
```

```javascript
function triggerExample1() {
  // Create a fake `textarea` and set the contents to the text
  // you want to copy
  const storage = document.createElement('textarea');
  storage.value = element.innerHTML;
  const element = document.querySelector('#example1');
  element.appendChild(storage);

  // Copy the text in the fake `textarea` and remove the `textarea`
  storage.select();
  storage.setSelectionRange(0, 99999);
  document.execCommand('copy');
  element.removeChild(storage);
}
```
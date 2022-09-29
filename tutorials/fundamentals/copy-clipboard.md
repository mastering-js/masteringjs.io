To copy an element to the clipboard, you must trigger the input/textarea's `select()` and `setSelectionRange()`, as well as the document's `execCommand()` function.

<textarea id="example"></textarea>
<div>
<button onclick="triggerExample()">Click Me</button>
</div>
<h3> Copy Here (or anywhere you want) </h3>
<textarea></textarea>
<script>
function triggerExample() {
    const element = document.querySelector('#example');
    element.select();
    element.setSelectionRange(0, 99999);
    document.execCommand('copy');
}
</script>

```html
<textarea id="example"></textarea>
<div>
<button onclick="triggerExample()">Click Me</button>
</div>
<h3> Paste Here (or anywhere you want) </h3>
<textarea></textarea>
<script>
function triggerExample() {
    const element = document.querySelector('#example');
    element.select();
    element.setSelectionRange(0, 99999);
    document.execCommand('copy');
}
</script>
```

## Copy from a non-input field

To copy from a non-input field, you must create a temporary textarea/input element to use as temporary storage.
You must then append the textarea to the page, but after it has copied you can remove it.

<div id="example1">Here's how you copy me!</div>
<div>
<button onclick="triggerExample1()">Click Me</button>
</div>
<div>Paste here</div>
<textarea></textarea>
<script>
function triggerExample1() {
    const element = document.querySelector('#example1');
    const storage = document.createElement('textarea');
    storage.value = element.innerHTML;
    element.appendChild(storage);
    storage.select();
    storage.setSelectionRange(0, 99999);
    document.execCommand('copy');
    element.removeChild(storage)
}
</script>

```html
<div id="example1">Here's how you copy me!</div>
<div>
<button onclick="triggerExample1()">Click Me</button>
</div>
<div>Paste here</div>
<textarea></textarea>
<script>
function triggerExample1() {
    const element = document.querySelector('#example1');
    const storage = document.createElement('textarea');
    storage.value = element.innerHTML;
    element.appendChild(storage);
    storage.select();
    storage.setSelectionRange(0, 99999);
    document.execCommand('copy');
    element.removeChild(storage)
}
</script>
```
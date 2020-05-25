In JavaScript, [button elements have a `disabled` property](https://www.w3schools.com/jsref/prop_pushbutton_disabled.asp) that you can set to prevent clicking on the button.
For example, suppose you have a button that shows an alert when you click it:

```html
<button id="my-alert-button">Show Alert</button>
<script>
  document.querySelector('#my-alert-button').addEventListener('click', function() {
    alert('Clicked on button!');
  });
</script>
```

Here's a live version of the above button.

<button id="my-alert-button-1">Show Alert</button>
<script>
  document.querySelector('#my-alert-button-1').addEventListener('click', function() {
    alert('Clicked on button!');
  });
</script>

If you set a `disabled` property on the button, clicking the button
won't do anything.

```html
<button id="my-alert-button">Disabled Button</button>
<script>
  document.querySelector('#my-alert-button').addEventListener('click', function() {
    alert('Clicked on button!');
  });
  // Now clicking on the button won't do anything
  document.querySelector('#my-alert-button').disabled = true;
</script>
```

<button id="my-alert-button-2">Disabled Button</button>
<script>
  document.querySelector('#my-alert-button-2').addEventListener('click', function() {
    alert('Clicked on button!');
  });
  // Now clicking on the button won't do anything
  document.querySelector('#my-alert-button-2').disabled = true;
</script>

With Forms
----------

Buttons can also be used to submit [forms](https://www.w3schools.com/jsref/dom_obj_form.asp).
For example, clicking on the below button triggers a 'submit' event
on `my-form`. Hitting the "enter" key while the text input has focus
also submits the form.

```html
<form id="my-form">
  <input type="text" placeholder="Sample Input">
  <button type="submit">Submit Form</button>
</form>
<script>
  document.querySelector('#my-form').addEventListener('submit', function(ev) {
    ev.preventDefault();
    alert('Form submitted!');
  });
</script>
```

<form id="my-form-1">
  <input type="text" placeholder="Sample Input">
  <button type="submit">Submit Form</button>
</form>
<script>
  document.querySelector('#my-form-1').addEventListener('submit', function(ev) {
    ev.preventDefault();
    alert('Form submitted!');
  });
</script>

However, if you disable the button, you also disable submitting the form.
Note that you don't get a 'submit' event on `my-form` below when you
click on the button, nor when you hit "enter" while the text input has focus.

```html
<form id="my-form">
  <input type="text" placeholder="Sample Input">
  <button type="submit">Submit Form</button>
</form>
<script>
  document.querySelector('#my-form').addEventListener('submit', function(ev) {
    ev.preventDefault();
    alert('Form submitted!');
  });
  document.querySelector('#my-form button').disabled = true;
</script>
```

<form id="my-form-2">
  <input type="text" placeholder="Sample Input">
  <button type="submit">Submit Form</button>
</form>
<script>
  document.querySelector('#my-form-2').addEventListener('submit', function(ev) {
    ev.preventDefault();
    alert('Form submitted!');
  });
  document.querySelector('#my-form-2 button').disabled = true;
</script>
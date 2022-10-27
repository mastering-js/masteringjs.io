To validate emails using a regular expression, you can use the `match` function with one of the two following regular expressions.
The `match()` function will return a [truthy](/tutorials/fundamentals/truthy) value if there is a valid email address in the given input string.

```javascript
/[^\s@]+@[^\s@]+\.[^\s@]+/
```

```javascript
/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
```

The first regular expression is much simpler and more concise.
It ensures that you have a sequence of non-whitespace characters, followed by an `@`, followed by more non-whitespace characters, a dot, and more non-whitespace.

The second regular expression is more complete and [is fully compliant with the RFC-2822 spec for email addresses](https://stackoverflow.com/a/1373724/3267107).

Below is a live example that lets you test email addresses using the above regular expressions.

```html
<div>
  <input id="example" type="email"/>
  <div>
    <button onclick="verifyEmail1()">Verify Email with Regex 1</button>
    <button onclick="verifyEmail2()">Verify Email with Regex 2</button>
  </div>
  <div>
    <p id="result"></p>
  </div>
</div>

<script>
function verifyEmail1() {
  const input = document.querySelector("#example");
  const display = document.querySelector("#result");
  if (input.value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi)) {
    display.innerHTML = input.value + ' is valid';
  } else {
    display.innerHTML = input.value + ' is not a valid email';
  }
}
function verifyEmail2() {
  const input = document.querySelector("#example");
  const display = document.querySelector("#result");
  if (input.value.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi)) {
    display.innerHTML = input.value + ' is valid';
  } else {
    display.innerHTML = input.value + ' is not a valid email';
  }
}
</script>
```

<div>
  <input id="example" type="email"/>
  <div>
    <button onclick="verifyEmail1()">Verify Email with Regex 1</button>
    <button onclick="verifyEmail2()">Verify Email with Regex 2</button>
  </div>
  <div>
    <p id="result"></p>
  </div>
</div>

<script>
function verifyEmail1() {
  const input = document.querySelector("#example");
  const display = document.querySelector("#result");
  if (input.value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi)) {
    display.innerHTML = input.value + ' is valid';
  } else {
    display.innerHTML = input.value + ' is not a valid email';
  }
}
function verifyEmail2() {
  const input = document.querySelector("#example");
  const display = document.querySelector("#result");
  if (input.value.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi)) {
    display.innerHTML = input.value + ' is valid';
  } else {
    display.innerHTML = input.value + ' is not a valid email';
  }
}
</script>
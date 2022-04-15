The `createElement()` function in JavaScript is used to programatically add elements to the DOM.
It has one required argument, the type of element to create, like `'div'` or `'img'`.
For example, the button below creates and appends a new `<div>` element.

<div style="border: 1px solid #ddd">
  <div id="append-elements"></div>
  <button onclick="addElement()">Click to Add</button>

  <script>
    function addElement() {
      const doc = document.createElement('div');
      doc.innerHTML = 'Hello World';
      const descendant = document.querySelector('#append-elements');
      descendant.appendChild(doc);
    }
  </script>
</div>

Below is the HTML and JavaScript for the above button.

```html
<div id="append-elements"></div>
<button onclick="addElement()">Click to Add</button>
```

```javascript
function addElement() {
  const doc = document.createElement('div');
  doc.innerHTML = 'Hello World';
  const container = document.querySelector('#append-elements');
  container.appendChild(doc);
}
```

### Recursive `createElement()`

Once you create an element, you can use methods like `appendChild()` to create and append more elements.

```javascript
const parent = document.querySelector('#nested');

// Create one element...
const child = document.createElement('div');
child.innerText = 'I am the parent\'s child';

// Create another element
const grandchild = document.createElement('h1');
grandchild.innerText = 'I am the grandchild';

// Append 2nd element as a child of the 1st elemtn
parent.appendChild(child);
child.appendChild(grandchild);
```

Below is the output of the above JavaScript.

<div style="border: 1px solid #ddd">
  <div id="nested">I am the Parent</div>
  <script>
  const parent = document.querySelector('#nested');
  const child = document.createElement('div');
  child.innerText = 'I am the parent\'s child';
  const grandChild = document.createElement('h1');
  grandChild.innerText = 'I am the grandchild';
  parent.appendChild(child);
  child.appendChild(grandChild);
  </script>
</div>

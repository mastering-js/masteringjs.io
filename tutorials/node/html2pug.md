To convert your HTML files to Pug, you can use the [html2pug](https://www.npmjs.com/package/html2pug) npm package.
The html2pug package currently only works in Node.js, so you need an API endpoint if you want to use it from a browser app.
Below is an example of using html2pug in Node.js.

```javascript
const html2pug = require('html2pug');

// h1 Hello, World
html2pug('<h1>Hello, World</h1>', { tabs: false, fragment: true });
```

The `fragment` option tells html2pug whether to wrap your HTML in an `<html>` tag, if it isn't already.
`fragment` is `false` by default, which means html2pug will always prepend `html\n  head\n  body\n    ` to the output by default.

Below is a live converter that uses `html2pug`.

<div id='html'></div>
<button id='work' onclick="window.convert">Turn HTML into Pug!</button>
<div id='pug'></div>
<script src="../../codemirror-5.62.2/lib/codemirror.js"></script>
<link rel="stylesheet" href="../../codemirror-5.62.2/lib/codemirror.css">
<script src="../../codemirror-5.62.2/mode/pug/pug.js"></script>
<script src="../../codemirror-5.62.2/mode/javascript/javascript.js"></script>
<script src="../../codemirror-5.62.2/mode/xml/xml.js"></script>
<script src="../htmltopug.js"></script>

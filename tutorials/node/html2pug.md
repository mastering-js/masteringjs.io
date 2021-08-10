To convert your HTML files to Pug, you can use the [html2pug](https://www.npmjs.com/package/html2pug) and the [fs-extra](https://www.npmjs.com/package/fs-extra) npm packages.

```javascript
const fs = require('fs-extra');
const html2pug = require('html-pug-converter');

async function test() {
    const fileContents = await fs.readFile('test.html', 'utf-8');
    const newFileContents = html2pug(fileContents, {tabs: false});
    await fs.writeFile('test.html', newFileContents)
    await fs.rename('test.html', 'test.html'.substr(0, 'test.html'.length - 5) + '.pug')
}

test();
```

**Note:** You could use node's fs module but `fs-extra` already uses `fs` and it has the benefit of being neater.

<div id='html'></div>
<button id='work' onclick="window.convert">Turn HTML into Pug!</button>
<div id='pug'></div>
<script src="../../codemirror-5.62.2/lib/codemirror.js"></script>
<link rel="stylesheet" href="../../codemirror-5.62.2/lib/codemirror.css">
<script src="../../codemirror-5.62.2/mode/pug/pug.js"></script>
<script src="../../codemirror-5.62.2/mode/javascript/javascript.js"></script>
<script src="../../codemirror-5.62.2/mode/xml/xml.js"></script>
<script src="../main.js"></script>

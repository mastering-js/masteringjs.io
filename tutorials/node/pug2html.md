Using a combination of [fs-extra](https://www.npmjs.com/package/fs-extra), [pug](https://pugjs.org/api/reference.html#pugrendersource-options-callback), and asynchronous programming,
you can easily convert your pug files to html files. Pug's `render()` function already converts pug markup to html markup and as a result you can write it to a file.

```javascript
const pug = require('pug');
const fs = require('fs-extra');


async function test() {
    const fileContents = await fs.readFile('test.pug', 'utf-8')
    const newFileContents = pug.render(fileContents, {pretty: '  '})
    await fs.writeFile('test.pug', newFileContents)
    await fs.rename('test.pug', 'test.pug'.substr(0, 'test.pug'.length - 4) + '.html')
}

test();
```

**Note:** `fs-extra` uses node's `fs` module but has the added benefit of being neater since it does not require callback functions.
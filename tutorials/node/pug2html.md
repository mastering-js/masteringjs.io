[The Pug npm module](https://www.npmjs.com/package/pug) has a `render()` function that converts Pug code into HTML as shown below.

```javascript
const pug = require('pug');

const output = pug.render('h1 Hello, World!');

output; // '<h1>Hello, World!</h1>
```

Here is a simple Pug to HTML converter that works in your browser:

<div id="pug" style="border: 1px solid #ddd"></div>
<div style="text-align: center; font-size: 4em; margin-top: 1em; margin-bottom: 1em;">&#8595;</div>
<div id="html" style="border: 1px solid #ddd"></div>
<script src="https://pugjs.org/js/pug.js"></script>
<script src="../../codemirror-5.62.2/lib/codemirror.js"></script>
<link rel="stylesheet" href="../../codemirror-5.62.2/lib/codemirror.css">
<script src="../../codemirror-5.62.2/mode/pug/pug.js"></script>
<script src="../../codemirror-5.62.2/mode/javascript/javascript.js"></script>
<script src="../../codemirror-5.62.2/mode/xml/xml.js"></script>
<script>
    const p = require('pug'); // weird
    const html = CodeMirror(document.querySelector('#html'), { mode: 'xml', lineNumbers: true, readOnly: true });
    const pug = CodeMirror(document.querySelector('#pug'), {
        mode: 'pug',
        lineNumbers: true
    });
    pug.setValue('h1 Hello, World!');
    html.setValue(p.render(pug.getValue(), {pretty: '  '}).trim());
    function pug2html() {
        html.setValue(p.render(pug.getValue(), {pretty: '  '}).trim());
    }
    pug.on('change', pug2html);
</script>

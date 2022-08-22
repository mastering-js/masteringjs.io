# Format Your CSS

Input your css into the text field below and it will be formatted to use 2-space indent.

<style>
  .CodeMirror {
    border: 1px solid #ddd;
  }

  button {
    margin-top: 25px;
    padding: 0.25em 0.5em;
    color: white;
    background-color: #19E2F1;
    border-radius: 4px;
    cursor: pointer;
    border: 0px;
    margin-top: 0.5em;
    font-size: 1.75em;
  }
</style>

<div id="input"></div>
<div>
<button onclick="format()">Click to Format</button>
</div>
<h3>Output:</h3>
<div id="output"></div>

<script src="https://unpkg.com/prettier@2.7.1/standalone.js"></script>
<script src="https://unpkg.com/prettier@2.7.1/parser-postcss.js"></script>
<script src="../../codemirror-5.62.2/lib/codemirror.js"></script>
<link rel="stylesheet" href="../../codemirror-5.62.2/lib/codemirror.css">
<script src="../../codemirror-5.62.2/mode/css/css.js"></script>
<script type="text/javascript">
  const input = CodeMirror(document.querySelector('#input'), {
    lineNumbers: true,
    tabSize: 2,
    value: `.nav_bar {color: red; background-color: black; font-size: small} .test {color: blue; background-color: yellow} .footNotes { color: red; background-color: black; transform: translate(120px, 50%)}`,
    mode: 'css',
  });
  const output = CodeMirror(document.querySelector('#output'), {
    lineNumbers: true,
    tabSize: 2,
    mode: 'css',
    readOnly: true
  });
  function format() {
    let text = input.getValue();
    let initial = prettier.format(text, {
      parser: 'css',
      plugins: prettierPlugins,
      tabWidth: 2,
      endOfLine: 'auto'
    });
    initial = initial.replaceAll('}', '}\n');
    // https://stackoverflow.com/a/67243723
    const kebabizeFromCamel = (str) => str.replaceAll(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())
    initial = kebabizeFromCamel(initial)
    const kebabizeFromSnake = (str) => str.replaceAll(/[_]/g, ($, ofs) => '-');
    initial = kebabizeFromSnake(initial);
    output.setValue(initial);
  }
  format();
</script>


This tool uses `prettier.format()` to format CSS.
`format()` takes 2 parameters:

1. text, which is what you input into the textbox
2. options, which indicates specific format preferences like tab width and end of line characters.

Here's the code we use to format the CSS:

```javascript
let initial = prettier.format(text, {
  parser: 'css',
  plugins: prettierPlugins,
  tabWidth: 2,
  endOfLine: 'auto'
});
```
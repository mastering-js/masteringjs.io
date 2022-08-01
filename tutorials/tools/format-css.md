# Format Your CSS

Input your css into the text field and it will be formatted.
An example:
`.nav_bar {color: red; background-color: black; font-size: small} .test {color: blue; background-color: yellow} .footNotes { color: red; background-color: black; transform: translate(120px, 50%)}`

<textarea id="input" cols=50 rows=20></textarea>
<div>
<button onclick="format()">Click to Format</button>
</div>
<h3>Output:</h3>
<textarea id="output" readonly="readonly" cols=50 rows=20></textarea>


<script src="https://unpkg.com/prettier@2.7.1/standalone.js"></script>
<script src="https://unpkg.com/prettier@2.7.1/parser-postcss.js"></script>
<script type="text/javascript">
  function format() {
    let text = document.querySelector('#input').value
    let initial = prettier.format(text,
    { parser: "css", plugins: prettierPlugins},
    {options: { tabWidth: 2, endOfLine: 'auto'}}
    );
    initial = initial.replaceAll('}', '}\n');
    // https://stackoverflow.com/a/67243723
    const kebabizeFromCamel = (str) => str.replaceAll(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())
    initial = kebabizeFromCamel(initial)
    const kebabizeFromSnake = (str) => str.replaceAll(/[_]/g, ($, ofs) => '-');
    initial = kebabizeFromSnake(initial);
    document.querySelector('#output').value = initial;
  }
</script>
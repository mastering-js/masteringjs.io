# Hello World

<div id="input"></div>
<div>
<button onclick="format()">Click to Format</button>
</div>
<h3>Output:</h3>
<div id="output"></div>
<script src="../../codemirror-5.62.2/lib/codemirror.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js"></script>
<link rel="stylesheet" href="../../codemirror-5.62.2/lib/codemirror.css">
<script src="../../codemirror-5.62.2/mode/css/css.js"></script>
<script type="text/javascript">
  const global = {cnsl: {} }
  const messages = [];
  const originalMethod = (global.cnsl.log = console.log);
  // https://glebbahmutov.com/blog/capture-all-the-logs/
  console.log = function() {
    for (let i = 0; i < arguments.length; i++)
    messages.push(JSON.stringify(arguments[i]));
    originalMethod.apply(console, arguments);
  }
  const input = CodeMirror(document.querySelector('#input'), {
    lineNumbers: true,
    tabSize: 2,
    value: `console.log(_.omit({ a: 1, b: 2 }, ['a']))`,
    mode: 'javascript',
  });
  const output = CodeMirror(document.querySelector('#output'), {
    lineNumbers: true,
    tabSize: 2,
    mode: 'javascript',
    readOnly: true
  });
  function format() {
    const raw = input.getValue();
    /*let text = raw.split('/n'); // returns an array
    let queryString = '';
    let resultString = '';
    const keywords = ['const', 'let', 'var', '=', 'for', 'if']
    // remove lines
    for (let i = 0; i < text.length; i++) {
      let array = text[i].match(consoleRegExp)
      // if its not step 2 or a console log, remove
      if (!keywords.includes(text[i]) && !array.length) {
        text.splice(i, 1); // removes in place
      }
      else if (array.length) { // found a console.log(). Strip the log, keep whats in between.
        let str = '';
        for (let j = 0; j < array.length; j++) {
          // text[i] needs to become this line completed
          const start = array[j].search('(');
          const end = array[j].search(')');
          // +1 for the character after the parenthesis, 
          str += array[j].substring(start+1, end)
        }
      }
    }*/
    const val = eval(raw);
    const res = messages.join('\n');
    const restore = () => {
      Object.keys(global.cnsl).forEach(methodName => {
        console[methodName] = global.cnsl[methodName]
      })
    }
    restore();
    console.log(messages);
    console.log('what is val', val);
    output.setValue(res);
  }
  format();
</script>
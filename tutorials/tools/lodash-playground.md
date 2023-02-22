# Hello World

<div id="input"></div>
<div>
<button onclick="format()">Click to Format</button>
</div>
<h3>Output:</h3>
<div id="output"></div>
<script src="../../codemirror-5.62.2/lib/codemirror.js"></script>
<script src="lodash.js"></script>
<link rel="stylesheet" href="../../codemirror-5.62.2/lib/codemirror.css">
<script src="../../codemirror-5.62.2/mode/css/css.js"></script>
<script type="text/javascript">
  const consoleRegExp = /console\.log\(([^)]+)\);*/igm // use this regexp to find console logs. If a console log, rip whats in between the ();
  const obj = {}; // use this to keep track of variable declarations. Variable declarations will have an = sign.
  const input = CodeMirror(document.querySelector('#input'), {
    lineNumbers: true,
    tabSize: 2,
    value: ``,
    mode: 'javascript',
  });
  const output = CodeMirror(document.querySelector('#output'), {
    lineNumbers: true,
    tabSize: 2,
    mode: 'javascript',
    readOnly: true
  });
  /*
  A few rules we can follow. Use eval() and intercept console logs.
  1. No console.log, not our problem. Console.log indicates what needs to be printed.
  2. check for semicolons and newline characters to know when a line has finished.
  3. look for _. to know when to start
  4. look for ) to know when to end.
  5. take whats inbetween ()
  */
  function format() {
    let text = input.getValue().split('\n'); // turn lines into entries in an array. What about semicolons?
    console.log('what is text now?', text);
    const initial = 'Hello World';
    output.setValue(initial);
  }
  format();
</script>
Enter in your callback-based code in the input below, and click "Run" (or press Shift+Enter) to let ChatGPT convert your code to [async/await](https://asyncawait.net/).

**Note:** to prevent abuse, the API supporting this tool is limited to 100 requests per hour. If you need to make more requests, feel free to [copy our server code and prompts, and run locally with your own OpenAI key](https://github.com/mastering-js/masteringjs-backend/blob/main/awaitify.js).

<style>
  button.opt {
    background-color: #19E2F1;
    color: white;
    padding: 0.5em;
    margin-right: 0.33em;
    border-radius: 4px;
    cursor: pointer;
    border: 0px;
    margin-bottom: 0.5em;
    font-size: 1em;
    text-align: center;
  }
  button.opt:disabled {
    background-color: #ddd;
  }

  #masteringjs-leaderboard-banner {
    position: absolute;
    left: -350px;
    top: -125px;
    width: 300px;
    height: 600px;
  }

  @media (max-width: 1350px) {
    #masteringjs-leaderboard-banner {
      display: none;
    }
  }
</style>

<div>
<button class="opt" id="run" onclick="sendRequest()" style="width: 66px">&rsaquo; Run</button>
<button class="opt" id="share" onclick="tourl()">&Uarr; Share</button>
</div>
<div id="input" style="border: 1px solid #ddd"></div>

### Results:

<div id="output" style="border: 1px solid #ddd"></div>

<div id="masteringjs-leaderboard-banner"></div>

<div id="previous-requests"></div>

<script async="" defer="" crossorigin="anonymous" src="https://js.stratos.blue/stratos.js"></script>
<script>
  window.stratosSettings = {
    publisherId: '641a1e06290373f15cc3a920',
  };
  window.stratos = window.stratos || { queue: [] };
  window.stratos.queue.push(function() { 
    console.log('Stratos initialized!');
  });
</script>
<script src="https://cdn.jsdelivr.net/npm/vanillatoasts@1.3.0/vanillatoasts.js"></script>
<script src="../../codemirror-5.62.2/lib/codemirror.js"></script>
<link rel="stylesheet" href="../../codemirror-5.62.2/lib/codemirror.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vanillatoasts@1.3.0/vanillatoasts.css">
<script src="../../codemirror-5.62.2/mode/javascript/javascript.js"></script>
<script>
  const input = CodeMirror(document.querySelector('#input'), {
    lineNumbers: true,
    tabSize: 2,
    value: window.location.hash ?
      JSON.parse(atob(window.location.hash.slice(1))).input :
      `doc.save(function(err) { console.log('Done!'); });\n`,
    mode: 'javascript'
  });
  const output = CodeMirror(document.querySelector('#output'), {
    lineNumbers: true,
    tabSize: 2,
    mode: 'javascript',
    value: window.location.hash ?
      JSON.parse(atob(window.location.hash.slice(1))).output :
      '',
    readOnly: true
  });
  input.setOption('extraKeys', {
    'Shift-Enter': function() {
      sendRequest();
    }
  });
  function tourl() {
    window.location.hash = btoa(JSON.stringify({
      input: input.getValue(),
      output: output.getValue()
    }));
  }
  const isLocalhost = window.location.hostname === 'localhost';
  const server = 'https://masteringjs-backend.netlify.app/.netlify/functions';
  let inProgress = false;
  let recentRequests = [];
  async function sendRequest() {
    if (inProgress) {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    inProgress = true;
    const runButton = document.querySelector('#run');
    runButton.disabled = true;
    runButton.innerHTML = '.';
    let interval = setInterval(() => {
      if (runButton.innerHTML === '...') {
        runButton.innerHTML = '.';
      } else {
        runButton.innerHTML += '.';
      }
    }, 250);
    const code = input.getValue();
    if (!isLocalhost) {
      window.stratos.trackPrompt(code);
    }
    setTimeout(() => {
      if (inProgress) {
        VanillaToasts.create({
          title: 'Apologies',
          text: 'Sorry, this is taking longer than expected...',
          timeout: 10000,
          positionClass: 'bottomRight'
        });
      }
    }, 8000);
    setTimeout(() => {
      if (inProgress) {
        VanillaToasts.create({
          title: 'Time out',
          text: 'Sorry, that didn\'t work, the request timed out. Please try again.',
          timeout: 10000,
          positionClass: 'bottomRight'
        });
        controller.abort();
        throw new Error('Timed out')
      }
    }, 15000);
    fetch(
      server + '/awaitify',
      {
        method: 'POST',
        signal: signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code
        })
      }
    ).
      then(res => {
        if (res.status !== 200) {
          res.text().then(text => {
            VanillaToasts.create({
              title: 'Server Error',
              text: text,
              timeout: 10000,
              positionClass: 'bottomRight'
            });
          });
          throw new Error('Server responded with error');
        }
        return res.json();
      }).
      then(res => {
        console.log(res);
        output.setValue(res.content);
        const id = Date.now();
        recentRequests.push({ id: id, input: code, output: res.content });
        if (document.querySelector('#previous-requests').innerHTML === '') {
          document.querySelector('#previous-requests').innerHTML = '<h3>Previous Runs</h3>';
        }
        document.querySelector('#previous-requests').innerHTML += `
        <div>
          <pre style="cursor: pointer" onclick="setResult(${id})"><code class="language-javascript">${code}</code></pre>
        </div>
        `;
      }).
      finally(() => {
        inProgress = false;
        runButton.disabled = false;
        runButton.innerHTML = '&rsaquo; Run';
        clearInterval(interval);
      });
  }
  function setResult(id) {
    const request = recentRequests.find(r => r.id === id);
    input.setValue(request.input);
    output.setValue(request.input);
  }
</script>

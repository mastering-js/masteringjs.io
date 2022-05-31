[`RetryPolicy`](https://typescript.temporal.io/api/classes/proto.coresdk.common.retrypolicy/) instances in Temporal allow you to define how Temporal retries Activities.
You can specify options like the number of times to retry before failing and how long to wait between retries.
Below are the supported options:

- `backoffCoefficient`: Temporal will multiply how long it waits between retries by this number after every failure
- `initialInterval`: The amount of time Temporal should wait to retry after the first failure
- `maximumAttempts`: The maximum number of times Temporal should retry before erroring out
- `maximumInterval`: The maximum amount of time Temporal will wait between retries
- `nonRetryableErrorTypes`: Array of strings containing the errors to skip retrying

Below is a tool that calculates whether an activity succeeds or fails for a given retry policy.

<script src="../../codemirror-5.62.2/lib/codemirror.js"></script>
<link rel="stylesheet" href="../../codemirror-5.62.2/lib/codemirror.css">
<script src="../../codemirror-5.62.2/mode/javascript/javascript.js"></script>
<script src="../../codemirror-5.62.2/mode/go/go.js"></script>
<style>
  table {
    border: 0;
    width: 100%;
  }
  .retry-container {
    vertical-align: top;
    width: 50%;
  }
  .add-button {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .retry-policy-container {
    vertical-align: top;
    width: 50%;
  }
  .label-container label {
    float: left;
    max-width: 49%;
  }
  .label-container input {
    float: right;
    max-width: 49%;
  }
  .retry, .parameter {
    padding: 10px;
    padding-top: 15px;
    border: 1px solid #ddd;
    margin-bottom: 15px;
  }
  .retry {
    margin-right: 15px;
  }
  .label-container::after {
    content: "";
    clear: both;
    display: table;
  }
  .slider {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 10px; /* Specified height */
    background: #d3d3d3; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
    border-radius: 5px;
  }
  .slider::-webkit-slider-thumb {
    height: 25px;
    width: 25px;
  }
  .slider::-moz-range-thumb {
    height: 25px;
    width: 25px;
  }
  .result {
    padding: 5px;
    text-align:center;
    border-radius: 4px;
  }
  .success {
    background-color: #D4EDDC;
  }
  .fail {
    background-color: #f8d7da;
  }
  .spacing {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  select {
    font-size: 1.1em;
    padding: 0.25em;
    margin-bottom: 0.5em;
  }
  .output-wrapper {
    border: 1px solid #ddd;
    height: 130px;
  }
  .output-wrapper .CodeMirror {
    height: 130px;
  }
  .result-row {
    display: flex;
    flex-direction: row;
  }
  .result, .retry-chart {
    position: relative;
    width: 100%;
  }
  .result {
    margin-right: 15px;
  }
  .schedule-class {
    padding: 10px;
    padding-top: 15px;
    border: 1px solid #ddd;
    margin-bottom: 15px;
    background-color: #f0f0f0;
    margin-right: 15px;
  }
  .table {
    display: table;
  }
  .tr {
    display: table-row;
  }
  .td {
    display: table-cell;
  }
  @media (max-width: 1000px) {
    .table {
      display: block;
    }
    .tr {
      display: block;
    }
    .td {
      display: block;
    }
    .retry-container {
      width: 100%;
    }
    .retry-policy-container {
      width: 100%;
    }
    select {
      max-width: 100% !important;
    }
  }

</style>
<div class="table">
  <div class="tr">
    <div class="td retry-container">
      <div class="retries">
        <h1>Activity Retries</h1>
        <select class="scenarios" class="spacing">
          <option value="">Scenarios</option>
          <option value='{"requestRuntimeMS": 10, "successRate": 0.9}'>
            Fast request (10ms), 90% success rate
          </option>
          <option value='{"requestRuntimeMS": 10, "successRate": 0.5}'>
            Fast request (10ms), 50% success rate
          </option>
          <option value='{"requestRuntimeMS": 100, "successRate": 0.9}'>
            Slow request (100ms), 90% success rate
          </option>
          <option value='{"requestRuntimeMS": 100, "successRate": 0.5}'>
            Slow request (100ms), 50% success rate
          </option>
        </select>
      </div>
      <div class="schedule-class">
        <label>Schedule Time</label>
        <input id="scheduleTime-input" type="number" value="0" />
        <input type="range" id="scheduleTime-slider" class="slider runtime-slider" min="0" max="1000" step="5" value="0" />
      </div>
      <div class="retries-list"></div>
      <button class="add-button" onclick="addRetry(true, 1)">+ Add</button>
    </div>
    <div class="td retry-policy-container">
      <h1>Retry Policy (in ms)</h1>
      <div class="parameter">
        <div class="label-container">
          <label>startToCloseTimeout</label>
          <input class="label-container-item" id="startToCloseTimeout-input" type="number">
        </div>
        <input
          type="range"
          class="slider"
          id="startToCloseTimeout-slider"
          min="0"
          max="100000"
          step="100">
      </div>
      <div class="parameter">
        <div class="label-container">
          <label>scheduleToStartTimeout</label>
          <input class="label-container-item" id="scheduleToStartTimeout-input" type="number">
        </div>
        <input
          type="range"
          class="slider"
          id="scheduleToStartTimeout-slider"
          min="0"
          max="100000">
      </div>
      <div class="parameter">
        <div class="label-container">
        <label>scheduleToCloseTimeout</label>
          <input class="label-container-item" id="scheduleToCloseTimeout-input" type="number">
        </div>
        <input
          type="range"
          class="slider"
          id="scheduleToCloseTimeout-slider"
          min="0"
          max="100000">
      </div>
      <div class="parameter">
        <div class="label-container">
          <label>backoffCoefficient</label>
          <input class="label-container-item" id="backoffCoefficient-input" type="number">
        </div>
        <input
          type="range"
          class="slider"
          id="backoffCoefficient-slider"
          min="1"
          max="10">
      </div>
      <div class="parameter">
        <div class="label-container">
          <label>initialInterval</label>
          <input class="label-container-item" id="initialInterval-input" type="number">
        </div>
        <input
          type="range"
          class="slider"
          id="initialInterval-slider"
          min="0"
          max="10000"
          step="50">
      </div>
      <div class="parameter">
        <div class="label-container">
          <label>maximumAttempts</label>
          <input class="label-container-item" id="maximumAttempts-input" type="number">
        </div>
        <input
          type="range"
          class="slider"
          id="maximumAttempts-slider"
          min="0"
          max="100">
      </div>
      <div class="parameter">
        <div class="label-container">
          <label>maximumInterval</label>
          <input class="label-container-item" id="maximumInterval-input" type="number">
        </div>
        <input
          type="range"
          class="slider"
          id="maximumInterval-slider"
          min="0" max="100000"
          step="100">
      </div>
    </div>
  </div>
  <div class="tr">
    <div class="td" style="padding-right: 15px; vertical-align: middle">
      <div class="result"></div>
    </div>
    <div class="td">
      <div class="language-selector">
        <select>
          <option value="typescript">TypeScript</option>
          <option value="go">Go</option>
        </select>
      </div>
      <div class="output-wrapper">
      </div>
    </div>
  </div>
</div>
<div class="retry" style="display: none">
  <select value="succeeds">
    <option value="fails">Fails after</option>
    <option value="succeeds">Succeeds after</option>
  </select>
  <input type="number" value="1" />
  ms
  <button class="remove">&times;</button>
  <input type="range" class="slider runtime-slider" min="0" max="1000" step="5" />
</div>
<script>
  const retryTemplate = document.querySelector('.retry');
  const resultContainerElement = document.querySelector('.result');
  const retriesListElement = document.querySelector('.retries-list');
  const scheduleTimeInput = document.querySelector('#scheduleTime-input');
  const scheduleTimeSlider = document.querySelector('#scheduleTime-slider');
  const sliderProps = [
    'startToCloseTimeout',
    'scheduleToStartTimeout',
    'scheduleToCloseTimeout',
    'backoffCoefficient',
    'initialInterval',
    'maximumAttempts',
    'maximumInterval'
  ];
  const state = {
    retries: [],
    language: 'typescript',
    scheduleToStartTimeout: 0,
    scheduleToCloseTimeout: 0,
    startToCloseTimeout: 10000,
    backoffCoefficient: 2,
    initialInterval: 1000,
    scheduleTime: 0,
    maximumAttempts: 0,
    maximumInterval: 0
  };
  const codemirror = CodeMirror(document.querySelector('.output-wrapper'), {
    mode: 'javascript',
    lineNumbers: true,
    tabSize: 2,
    readOnly: true
  });
  updateCodeMirror();
  codemirror.on('focus', () => codemirror.execCommand('selectAll'));
  let numRetries = 0;
  function omit(obj, props) {
    obj = { ...obj };
    props.forEach(p => { delete obj[p]; });
    return obj;
  }
  function addRetry(success, runtimeMS) {
    const el = retryTemplate.cloneNode(true);
    if (state.retries.length > 0) {
      state.retries[state.retries.length - 1].success = false;
      state.retries[state.retries.length - 1].select.disabled = true;
      state.retries[state.retries.length - 1].select.value = 'fails';
    }
    const retry = { success, runtimeMS, el };
    state.retries.push(retry);
    const select = el.querySelector('select');
    retry.select = select;
    select.value = success ? 'succeeds' : 'fails';
    const input = el.querySelector('input[type="number"]');
    const slider = el.querySelector('input[type="range"]');
    el.querySelector('.remove').addEventListener('click', () => removeRetry());
    input.value = runtimeMS;
    slider.value = input.value;
    input.addEventListener('change', function() {
      const val = input.value;
      if (!isNaN(val)) {
        slider.value = +val;
        retry.runtimeMS = +val;
        rerenderResult();
      }
    });
    select.addEventListener('change', function() {
      retry.success = select.value === 'succeeds';
      rerenderResult();
    });
    slider.addEventListener('change', function() {
      const val = slider.value;
      input.value = +val;
      retry.runtimeMS = +val;
      rerenderResult();
    });
    retriesListElement.appendChild(el);
    el.style.display = 'block';
    rerenderResult();
  }
  function removeRetry() {
    if (state.retries.length > 0) {
      const lastRetry = state.retries[state.retries.length - 1];
      retriesListElement.removeChild(lastRetry.el);
      state.retries.pop();
      state.retries[state.retries.length - 1].select.disabled = false;
      rerenderResult();
    }
  }
  scheduleTimeSlider.addEventListener('change', function() {
    const val = scheduleTimeSlider.value;
    scheduleTimeInput.value = +val;
    state.scheduleTime = +val;
    rerenderResult();
  });
  scheduleTimeInput.addEventListener('change', function() {
    const val = scheduleTimeInput.value;
    if (!isNaN(val)) {
      scheduleTimeSlider.value = +val;
      state.scheduleTime = +val;
      rerenderResult();
    }
  });
  const scenarios = document.querySelector('.scenarios');
  scenarios.addEventListener('change', function() {
    if (!scenarios.value) {
      return;
    }
    const values = JSON.parse(scenarios.value);
    const requestRuntimeMS = values.requestRuntimeMS;
    const successRate = values.successRate;
    const retries = [];
    const maxRetries = 20;
    clearRetries();
    for (let i = 0; i < maxRetries; ++i) {
      const success = Math.random() < successRate || i === maxRetries - 1;
      const runtimeMS = requestRuntimeMS +
        Math.round((Math.random() - 0.5) * (requestRuntimeMS / 2)); // +/- 50%
      addRetry(success, runtimeMS);
      if (success) {
        break;
      }
    }
    rerenderResult();
  });
  sliderProps.forEach(prop => {
    const input = document.querySelector(`#${prop}-input`);
    const slider = document.querySelector(`#${prop}-slider`);
    slider.value = state[prop];
    input.value = state[prop];
    input.addEventListener('change', function() {
      const val = input.value;
      if (!isNaN(val)) {
        slider.value = +val;
        state[prop] = +val;
        rerenderResult();
        updateCodeMirror();
      }
    });
    slider.addEventListener('change', () => {
      input.value = +slider.value;
      state[prop] = +slider.value;
      rerenderResult();
      updateCodeMirror();
    });
  });
  addRetry(true, 1);
  function clearRetries() {
    state.retries = [];
    retriesListElement.innerHTML = '';
  }
  function capitalizeFirstLetter(val) {
    return val[0].toUpperCase() + val.slice(1);
  }
  function updateCodeMirror() {
    const value = {
      scheduleToCloseTimeout: state.scheduleToCloseTimeout,
      startToCloseTimeout: state.startToCloseTimeout,
      scheduleToStartTimeout: state.scheduleToStartTimeout,
      retryPolicy: {
        backoffCoefficient: state.backoffCoefficient,
        initialInterval: state.initialInterval,
        maximumAttempts: state.maximumAttempts,
        maximumInterval: state.maximumInterval,
      }
    };
    if (value.retryPolicy.maximumAttempts === 0) {
      delete value.retryPolicy.maximumAttempts;
    }
    if (value.retryPolicy.maximumInterval === 0) {
      delete value.retryPolicy.maximumInterval;
    }
    if (value.scheduleToStartTimeout === 0) {
      delete value.scheduleToStartTimeout;
    }
    if (value.scheduleToCloseTimeout === 0) {
      delete value.scheduleToCloseTimeout;
    }
    if (state.language === 'typescript') {
      codemirror.setOption('mode', 'javascript');
      codemirror.setValue(JSON.stringify(value, null, '  '));
    } else if (state.language === 'go') {
      const val = [
        'workflow.ActivityOptions{', 
        ...Object.keys(value).filter(key => key !== 'retryPolicy').map(key => `\t${capitalizeFirstLetter(key)}: ${value[key]},`),
        '\tRetryPolicy: &temporal.RetryPolicy{',
        ...Object.keys(value.retryPolicy).map(key => `\t\t${capitalizeFirstLetter(key)}: ${value.retryPolicy[key]}`),
        '\t}',
        '}'
      ].join('\n');
      codemirror.setOption('mode', 'go');
      codemirror.setValue(val);
    }
  }
  const languageSelect = document.querySelector('.language-selector select');
  languageSelect.addEventListener('change', function() {
    state.language = languageSelect.value;
    updateCodeMirror();
  });
  function rerenderResult() {
    if (state.retries.length === 0) {
      document.querySelector('.result').innerHTML = '';
    }
    const res = calculateResult();
    if (res.success) {
      resultContainerElement.innerHTML = `<h2>Success after ${res.runtimeMS} ms</h2>`;
      resultContainerElement.classList.add('success');
      resultContainerElement.classList.remove('fail');
    } else {
      resultContainerElement.innerHTML = `<h2>Error after ${res.runtimeMS} ms: ${res.reason}</h2>`;
      resultContainerElement.classList.remove('success');
      resultContainerElement.classList.add('fail');
    }
  }
  function calculateResult() {
    let runtimeMS = 0;
    let retryIntervalMS = state.initialInterval;
    const {
      startToCloseTimeout,
      scheduleToCloseTimeout,
      scheduleToStartTimeout,
      scheduleTime,
      maximumInterval,
      maximumAttempts,
      backoffCoefficient
    } = state;
    if (scheduleToStartTimeout > 0 && scheduleTime >= scheduleToStartTimeout) {
      return {
        success: false,
        runtimeMS: scheduleToStartTimeout,
        reason: 'scheduleTime'
      };
    }
    for (let i = 0; i < state.retries.length; ++i) {
      runtimeMS = Math.min(runtimeMS + state.retries[i].runtimeMS, startToCloseTimeout);
      if (!state.retries[i].success) {
        if (maximumAttempts > 0 && i + 1 >= maximumAttempts) {
          return {
            success: false,
            runtimeMS,
            reason: 'maximumAttempts'
          };
        }
        runtimeMS = Math.min(runtimeMS + retryIntervalMS, startToCloseTimeout);
      }
      retryIntervalMS = maximumInterval > 0 ?
        Math.min(retryIntervalMS * backoffCoefficient, maximumInterval) :
        retryIntervalMS * backoffCoefficient;
      if (runtimeMS >= startToCloseTimeout) {
        return {
          success: false,
          runtimeMS,
          reason: 'startToCloseTimeout'
        };
      }
      if (scheduleToCloseTimeout > 0 &&
          scheduleTime + runtimeMS >= scheduleToCloseTimeout) {
        let total = scheduleTime + runtimeMS;
        return {
          success: false,
          runtimeMS: total,
          reason: 'scheduleToCloseTimeout'
        };
      }
    }
    if (!state.retries[state.retries.length - 1].success) {
      return {
        success: false,
        runtimeMS,
        reason: 'All retries failed'
      };
    }
    return {
      success: true,
      runtimeMS
    };
  }
</script>
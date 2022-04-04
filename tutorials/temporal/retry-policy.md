[`RetryPolicy`](https://typescript.temporal.io/api/classes/proto.coresdk.common.retrypolicy/) instances in Temporal allow you to define how Temporal retries Activities.
You can specify options like the number of times to retry before failing and how long to wait between retries.
Below are the supported options:

- `backoffCoefficient`: Temporal will multiply how long it waits between retries by this number after every failure
- `initialInterval`: The amount of time Temporal should wait to retry after the first failure
- `maximumAttempts`: The maximum number of times Temporal should retry before erroring out
- `maximumInterval`: The maximum amount of time Temporal will wait between retries
- `nonRetryableErrorTypes`: Array of strings containing the errors to skip retrying

Below is a tool that calculates whether an activity succeeds or fails for a given retry policy.

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

  .label-container {
    padding-bottom: 10px;
    padding-top: 10px;
  }

  .label-container label {
    float: left;
    max-width: 49%;
  }

  .label-container input {
    float: right;
    max-width: 49%;
  }

  .label-container::after {
    content: "";
    clear: both;
    display: table;
  }

  .slider, .runtime-slider {
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

  .runtime-slider {
    margin-top: 15px;
    margin-bottom: 15px;
    width: 75%;
  }

  .slider::-webkit-slider-thumb, .runtime-slider::-webkit-slider-thumb {
    height: 25px;
    width: 25px;
  }

  .slider::-moz-range-thumb, .runtime-slider::-moz-range-thumb {
    height: 25px;
    width: 25px;
  }
  .result {
    padding: 5px;
    margin:auto;
    width: 100%;
    text-align:center;
    border-radius: 4px;
    margin-top: 25px;
  }
  .success {
    background-color: #D4EDDC;
  }
  .fail {
    background-color: #f8d7da;
  }
</style>
<table>
  <tr>
    <td class="retry-container">
      <div class="retries-list">
        <h1>Retries</h1>
      </div>
      <button class="add-button" onclick="addRetry(true, 1)">+ Add</button>
    </td>
    <td class="retry-policy-container">
      <h1>Retry Policy (in ms)</h1>
      <div class="label-container">
        <label>StartToCloseTimeout</label>
        <input class="label-container-item" id="startToCloseTimeout-input" type="number">
      </div>
      <input type="range" class="slider" id="startToCloseTimeout-slider" min="0" max="100000">
      <div class="label-container">
        <label>backoffCoefficient</label>
        <input class="label-container-item" id="backoffCoefficient-input" type="number">
      </div>
      <input type="range" class="slider" id="backoffCoefficient-slider" min="1" max="10">
      <div class="label-container">
        <label>initialInterval</label>
        <input class="label-container-item" id="initialInterval-input" type="number">
      </div>
      <input type="range" class="slider" id="initialInterval-slider" min="1" max="10000">
      <div class="label-container">
        <label>maximumAttempts</label>
        <input class="label-container-item" id="maximumAttempts-input" type="number">
      </div>
      <input type="range" class="slider" id="maximumAttempts-slider" min="1" max="100">
      <div class="label-container">
        <label>maximumInterval</label>
        <input class="label-container-item" id="maximumInterval-input" type="number">
      </div>
      <input type="range" class="slider" id="maximumInterval-slider" min="1" max="100000">
    </td>
  </tr>
</table>
<div class="result">
</div>
<div class="retry" style="display: none">
  <select value="succeeds">
    <option value="fails">Fails after</option>
    <option value="succeeds">Succeeds after</option>
  </select>
  <input type="number" value="1" />
  ms
  <button class="remove">&times;</button>
  <input type="range" class="runtime-slider"/>
</div>
<script>
  const retryTemplate = document.querySelector('.retry');
  let numRetries = 0;
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
        slider.value = val;
        retry.runtimeMS = +val;
        rerenderResult();
      }
    });
    slider.addEventListener('change', function() {
      const val = slider.value;
      input.value = val;
      retry.runtimeMS = +val;
      rerenderResult();
    });
    select.addEventListener('change', function() {
      retry.success = select.value === 'succeeds';
      rerenderResult();
    });
    document.querySelector('.retries-list').appendChild(el);
    el.style.display = 'block';
    rerenderResult();
  }
  function removeRetry() {
    if (state.retries.length > 0) {
      const lastRetry = state.retries[state.retries.length - 1];
      document.querySelector('.retries-list').removeChild(lastRetry.el);
      state.retries.pop();
      state.retries[state.retries.length - 1].select.disabled = false;
      rerenderResult();
    }
  }
  function reflectChange(slider, newValue) {
    slider.value = newValue;
  }
  const sliderProps = [
    'startToCloseTimeout',
    'backoffCoefficient',
    'initialInterval',
    'maximumAttempts',
    'maximumInterval'
  ];
  const state = {
    retries: [],
    startToCloseTimeout: 10000,
    backoffCoefficient: 2,
    initialInterval: 100,
    maximumAttempts: 5,
    maximumInterval: 100000
  };
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
      }
    });
    slider.addEventListener('change', () => {
      input.value = +slider.value;
      state[prop] = +slider.value;
      rerenderResult();
    });
  });
  addRetry(true, 1);
  function rerenderResult() {
    if (state.retries.length === 0) {
      document.querySelector('.result').innerHTML = '';
    }
    const res = calculateResult();
    if (res.success) {
      document.querySelector('.result').innerHTML = `<h2>Success after ${res.runtimeMS} ms</h2>`;
      document.querySelector('.result').classList.add('success');
      document.querySelector('.result').classList.remove('fail');
      console.log('Hey')
    } else {
      document.querySelector('.result').innerHTML = `<h2>Error after ${res.runtimeMS} ms: ${res.reason}</h2>`;
      document.querySelector('.result').classList.remove('success');
      document.querySelector('.result').classList.add('fail');
    }
  }
  function calculateResult() {
    let runtimeMS = 0;
    let retryIntervalMS = state.initialInterval;
    const {
      startToCloseTimeout,
      maximumInterval,
      maximumAttempts,
      backoffCoefficient
    } = state;
    for (let i = 0; i < state.retries.length; ++i) {
      if (i >= maximumAttempts) {
        return {
          success: false,
          runtimeMS,
          reason: 'maximumAttempts'
        }
      }
      runtimeMS = Math.min(runtimeMS + state.retries[i].runtimeMS, startToCloseTimeout);
      if (!state.retries[i].success) {
        runtimeMS = Math.min(runtimeMS + retryIntervalMS, startToCloseTimeout);
      }
      retryIntervalMS = Math.min(retryIntervalMS * backoffCoefficient, maximumInterval);
      if (runtimeMS >= startToCloseTimeout) {
        return {
          success: false,
          runtimeMS,
          reason: 'startToCloseTimeout'
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

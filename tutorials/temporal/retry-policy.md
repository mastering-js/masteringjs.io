[`RetryPolicy`](https://typescript.temporal.io/api/classes/proto.coresdk.common.retrypolicy/) instances in Temporal allow you to define how Temporal retries Activities.
You can specify options like the number of times to retry before failing and how long to wait between retries.
Below are the supported options:

- `backoffCoefficient`: Temporal will multiply how long it waits between retries by this number after every failure
- `initialInterval`: The amount of time Temporal should wait to retry after the first failure
- `maximumAttempts`: The maximum number of times Temporal should retry before erroring out
- `maximumInterval`: The maximum amount of time Temporal will wait between retries
- `nonRetryableErrorTypes`: Array of strings containing the errors to skip retrying

Below is a tool that graphs the time between retries for a given RetryPolicy.

<style>
  #input {
    display: inline-block;
    width: 32%;
    height: 400px;
    vertical-align: top;
    padding-top: 25px;
  }

  #input .CodeMirror {
    border: 1px solid #ddd;
  }

  #chart-wrapper {
    display: inline-block; position: relative; height: 400px; width: 66%;
  }

  .error-marker {
    color: black;
    width: 10px !important;
    background-color: #ff0000;
  }

  .error-marker .error-message {
    display: none;
    position: absolute;
    background-color: #ddd;
    border: 1px solid #999;
    padding: 6px;
    width: 140px;
    left: 15px;
    top: -1em;
  }

  .error-marker:hover .error-message {
    display: block;
  }
</style>

<div id="input"></div>
<div id="chart-wrapper">
  <canvas id="chart"></canvas>
</div>
<script src="../../codemirror-5.62.2/lib/codemirror.js"></script>
<link rel="stylesheet" href="../../codemirror-5.62.2/lib/codemirror.css">
<script src="../../codemirror-5.62.2/mode/javascript/javascript.js"></script>
<script src="https://www.unpkg.com/dedent@0.7.0/dist/dedent.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>

<script>
  const input = CodeMirror(document.querySelector('#input'), {
    mode: 'javascript',
    lineNumbers: true,
    value: dedent(`
    {
      backoffCoefficient: 2,
      initialInterval: 100,
      maximumAttempts: 5
    }
    `),
    tabSize: 2,
    gutters: ['error']
  });

  input.on('changes', () => {
    let value;
    try {
      value = eval(`(${input.getValue()})`);
    } catch (err) {
      return;
    }

    updateChart(value);
  });

  const ctx = document.getElementById('chart').getContext('2d');
  const chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',

      // Configuration options go here
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
  });

  updateChart();

  function parseInput(str) {
    let val = null;
    input.clearGutter('error');
    try {
      val = eval(`(${input.getValue()})`);
    } catch (err) {
      input.setGutterMarker(0, 'error', makeMarker(err.message));
      return val;
    }

    if (val == null || typeof val !== 'object') {
      input.setGutterMarker(0, 'error', makeMarker('Must resolve to an object'));
      return null;
    }

    if (val.maximumAttempts !== undefined && typeof val.maximumAttempts !== 'number') {
      input.setGutterMarker(0, 'error', makeMarker('maximumAttempts must be number or undefined'));
      return null;
    }
    if (val.backupCoefficient !== undefined && typeof val.backupCoefficient !== 'number') {
      input.setGutterMarker(0, 'error', makeMarker('backupCoefficient must be number or undefined'));
      return null;
    }
    if (val.initialInterval !== undefined && typeof val.initialInterval !== 'number') {
      input.setGutterMarker(0, 'error', makeMarker('initialInterval must be number or undefined'));
      return null;
    }
    if (val.maximumInterval !== undefined && typeof val.maximumInterval !== 'number') {
      input.setGutterMarker(0, 'error', makeMarker('maximumInterval must be number or undefined'));
      return null;
    }

    return val;
  }

  function updateChart() {
    const obj = parseInput(input.getValue());
    if (obj == null) {
      return;
    }

    let maximumAttempts = Math.min(50, obj.maximumAttempts || 50);
    let backupCoefficient = obj.backupCoefficient || 2;
    let initialInterval = obj.initialInterval || 1000;
    let maximumInterval = obj.maximumInterval || Number.POSITIVE_INFINITY;

    const labels = [];
    const values = [];

    let interval = initialInterval;

    for (let i = 0; i < maximumAttempts; ++i) {
      labels.push(i + 1);
      values.push(interval);

      interval = Math.min(interval * backupCoefficient, maximumInterval);
    }

    chart.data.labels = labels;
    chart.data.datasets = [{
      label: 'Time Before Retry',
      backgroundColor: '#168a93',
      borderColor: '#168a93',
      data: values
    }];
    chart.update();
  }

  // Create an HTML element that CodeMirror is responsible for positioning
  // properly.
  function makeMarker(msg) {
    const marker = document.createElement('div');
    marker.classList.add('error-marker');
    marker.innerHTML = '&nbsp;';

    const error = document.createElement('div');
    error.innerHTML = msg;
    error.classList.add('error-message');
    marker.appendChild(error);

    return marker;
  }
</script>
Detecting what bar on a bar chart the user clicked is easy, but the API for doing so has changed several times between major ChartJS releases.
For ChartJS 4.x, you need to attach an `onclick` handler to the chart's `canvas` and use the [`getElementsForEventAtNode()` method](https://www.chartjs.org/docs/latest/developers/api.html#getelementsateventformode-e-mode-options-usefinalposition) as follows.
This method returns an object which contains an `index` property that tells you which index in your `labels` was clicked.

```javascript
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['A', 'B', 'C'],
    datasets: [{
      label: 'Easy as',
      data: [1, 2, 3],
    }],
  },
  options: {
    responsive: true
  }
});

// Make sure to attach `onclick` to the canvas, **not** the chart instance
canvas.onclick = (evt) => {
  const res = chart.getElementsAtEventForMode(
    evt,
    'nearest',
    { intersect: true },
    true
  );
  // If didn't click on a bar, `res` will be an empty array
  if (res.length === 0) {
    return;
  }
  // Alerts "You clicked on A" if you click the "A" chart
  alert('You clicked on ' + chart.data.labels[res[0].index]);
};
```

Below is a live example.
Click on "A" to see a `You clicked on A` alert.

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.2.0/chart.umd.js"></script>

<style>
  #chart-wrapper {
    display: inline-block; position: relative; width: 100%;
  }
</style>
<div id="chart-wrapper">
  <canvas id="chart"></canvas>
</div>
<script>
  const canvas = document.getElementById('chart');
  const ctx = canvas.getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['A', 'B', 'C'],
      datasets: [{
        label: 'Easy as',
        data: [1, 2, 3],
      }],
    },
    options: {
      responsive: true
    }
  });
  canvas.onclick = (evt) => {
    const res = chart.getElementsAtEventForMode(
      evt,
      'nearest',
      { intersect: true },
      true
    );
    // If didn't click on a bar, `res` will be an empty array
    if (res.length === 0) {
      return;
    }
    // Alerts "You clicked on A" if you click the "A" chart
    alert('You clicked on ' + chart.data.labels[res[0].index]);
  };
</script>

## In ChartJS 2 and 3

The only difference with ChartJS 2.x and 3.x is you need to use the `getElementAtEvent()` method, not `getElementsAtEventForMode()`.
The `getElementAtEvent()` method is slightly more concise.

```javascript
// The following only works with ChartJS 2.x or 3.x.
canvas.onclick = (evt) => {
  const res = chart.getElementAtEvent(evt);
  if (res.length === 0) {
    return;
  }
  alert('You clicked on ' + chart.data.labels[res[0]._index]);
};
```
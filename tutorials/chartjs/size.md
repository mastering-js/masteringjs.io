To set the chart size in ChartJS, we recommend using the `responsive` option, which makes the Chart fill its container.
You **must** wrap the chart `canvas` tag in a `div` in order for `responsive` to take effect.
You cannot set the `canvas` element size directly with `responsive`.

Below is a chart that fills its container, which happens to be the exact width of the text container for Mastering JS.

<style>
  #chart-wrapper {
    display: inline-block; position: relative; width: 100%;
  }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<div id="chart-wrapper">
  <canvas id="chart"></canvas>
</div>
<script>
  const ctx = document.getElementById('chart').getContext('2d');
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
</script>

Below is the HTML for the above chart.

```html
<style>
  #chart-wrapper {
    display: inline-block;
    position: relative;
    width: 100%;
  }
</style>
<div id="chart-wrapper">
  <canvas id="chart"></canvas>
</div>
```

Below is the JavaScript for the chart:

```javascript
const ctx = document.getElementById('chart').getContext('2d');
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
```
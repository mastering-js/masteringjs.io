To disable the tooltip menu that pops up when you hover over a chart element, you must disable it in the options object of your chart configuration.
The path is `options.plugins.tooltip.enabled` and because the default is `true`, you must set it to false.


```javascript
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
    data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Example Data',
      data: [12, 19, 3, 5, 2, 3]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false // <-- this option disables tooltips
      }
    }
  }
});
```

Below is a live example of a bar chart with tooltips disabled.

<style>
.chart-wrapper {
  display: inline-block;
  position: relative;
  width: 100%;
}
</style>

<div class="chart-wrapper">
  <canvas id="chart"></canvas>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>

<script>
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'bar',
    data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Example Data',
      data: [12, 19, 3, 5, 2, 3]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false // <-- disable tooltips
      }
    }
  }
});
</script>

For comparison, below is the same chart with tooltips **enabled**.

<div class="chart-wrapper">
  <canvas id="chart2"></canvas>
</div>

<script>
new Chart(document.getElementById('chart2').getContext('2d'), {
  // The type of chart we want to create
  type: 'bar',
    data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Example Data',
      data: [12, 19, 3, 5, 2, 3]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true
      }
    }
  }
});
</script>
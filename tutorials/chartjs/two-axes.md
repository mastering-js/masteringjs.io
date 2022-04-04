To add more axes to a chart, you must specify the `yAxisID` option in the `datas.datasets` property, and configure the corresponding axes in the `options.scales` property.
For example, the below chart has two Y axes.
Axis `A` displays page views, axis `B` displays revenue.
Page views is usually much larger than revenue, but the below chart renders side by side on the same chart.

```javascript
const ctx = document.getElementById('chart').getContext('2d');

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Friday', 'Saturday', 'Sunday', 'Monday'],
    datasets: [
      {
        yAxisID: 'A', // <-- the Y axis to use for this data set
        label: 'Page Views',
        data: [13500, 5700, 6300, 8200],
        borderWidth: 1,
        backgroundColor: 'blue',
        borderColor: 'blue'
      },
      {
        yAxisID: 'B', // <-- the Y axis to use for this data set
        label: 'Revenue',
        data: [11, 3.6, 7.3, 8.1],
        backgroundColor: 'green',
        borderColor: 'green'
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      A: {
        type: 'linear',
        position: 'left',
        ticks: { beginAtZero: true, color: 'blue' },
        // Hide grid lines, otherwise you have separate grid lines for the 2 y axes
        grid: { display: false }
      },
      B: {
        type: 'linear',
        position: 'right',
        ticks: { beginAtZero: true, color: 'green' },
        grid: { display: false }
      },
      x: { ticks: { beginAtZero: true } }
    }
  }
});
```

<style>
#chart-wrapper {
    display: inline-block; position: relative; height: 400px; width: 100%;
}

</style>

<div id="chart-wrapper">
  <canvas id="chart"></canvas>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>

<script>
const ctx = document.getElementById('chart').getContext('2d');

const chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',
  data: {
    labels: ['Friday', 'Saturday', 'Sunday', 'Monday'],
    datasets: [
      {
        yAxisID: 'A',
        label: 'Page Views',
        data: [13500, 5700, 6300, 8200],
        borderWidth: 1,
        backgroundColor: 'blue',
        borderColor: 'blue'
      },
      {
        yAxisID: 'B',
        label: 'Revenue',
        data: [11, 3.6, 7.3, 8.1],
        backgroundColor: 'green',
        borderColor: 'green'
      }
    ]
  },
  // Configuration options go here
  options: {
    responsive: true,
    scales: {
      A: {
        type: 'linear',
        position: 'left',
        ticks: { beginAtZero: true, color: 'blue' },
        grid: { display: false }
      },
      B: {
        type: 'linear',
        position: 'right',
        ticks: { beginAtZero: true, color: 'green' },
        grid: { display: false }
      },
      x: { ticks: { beginAtZero: true } }
    }
  }
});
</script>

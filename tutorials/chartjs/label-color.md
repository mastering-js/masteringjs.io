With ChartJS 3, you can change the color of the labels by setting the `scales.x.ticks.color` and `scales.y.ticks.color` options.
For example, below is how you can make the Y axis labels green and the X axis labels red.

Note that the below doesn't work in ChartJS 2.x, you need to use ChartJS 3.

```javascript
const ctx = document.getElementById('chart').getContext('2d');

const chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'bar',
    data: {
    labels: ['A', 'B', 'C', 'D', 'E', 'F'],
    datasets: [{
        label: 'Example Data',
        data: [12, 19, 3, 5, 2, 3],
    }]
  },
  // Configuration options go here
  options: {
    responsive: true,
    scales: {
      y: {
        ticks: { color: 'green', beginAtZero: true }
      },
      x: {
        ticks: { color: 'red', beginAtZero: true }
      }
    }
  }
});
```

Below is a live example.

<style>
#chart-wrapper {
    display: inline-block; position: relative; height: 400px; width: 66%;
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
  type: 'bar',
    data: {
    labels: ['A', 'B', 'C', 'D', 'E', 'F'],
    datasets: [{
        label: 'Example Data',
        data: [12, 19, 3, 5, 2, 3],
    }]
  },
  // Configuration options go here
  options: {
    responsive: true,
    scales: {
      y: {
        ticks: { color: 'green', beginAtZero: true }
      },
      x: {
        ticks: { color: 'red', beginAtZero: true }
      }
    }
  }
});
</script>

You can use any [color format supported by ChartJS](https://www.chartjs.org/docs/latest/general/colors.html), including hex codes.
For example, below is an alternative approach for setting the Y axis ticks to red and X axis ticks to green.

```javascript
options: {
  responsive: true,
  scales: {
    y: {
      ticks: { color: '#00ff00', beginAtZero: true }
    },
    x: {
      ticks: { color: '#ff0000', beginAtZero: true }
    }
  }
}
```
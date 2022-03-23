With ChartJS version 3.7.1, you can change the color of the labels by setting the `scales.x.ticks.color` and `scales.y.ticks.color` options.
This doesn't work in ChartJS 2.x, you need to use ChartJS 3.

```html
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
        labels: ["A", "B", "C", "D", "E", "F"],
        datasets: [{
            label: 'Example Data',
            data: [12, 19, 3, 5, 2, 3],
        }]
    },
      // Configuration options go here
      options: {
        responsive: true,
        scales: {
          y: { ticks: {color: 'green', beginAtZero: true}, grid: {borderColor: 'cyan'}},
          x: { ticks: {color: 'red', beginAtZero: true}, grid: {borderColor: 'indigo'}}
        }
      }
  });
</script>
```


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
        labels: ["A", "B", "C", "D", "E", "F"],
        datasets: [{
            label: 'Example Data',
            data: [12, 19, 3, 5, 2, 3],
        }]
    },
      // Configuration options go here
      options: {
        responsive: true,
        scales: {
          y: { ticks: {color: 'green', beginAtZero: true}, grid: {borderColor: 'cyan'}},
          x: { ticks: {color: 'red', beginAtZero: true}, grid: {borderColor: 'indigo'}}
        }
      }
  });
</script>
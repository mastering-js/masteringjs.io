To add more axes to a chart, you must specify the `yAxisID` or `xAxisID` for cartesian charts, or `rAxisID` for radial charts, option in the `data` property.
The value these options take are type `string` and you can use it in the options object to configure the styling for that axis you created.
The example below uses the `yAxisID` property.

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
      type: 'line',
       data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            yAxisID: 'A',
            label: 'Example Data',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },
        {
            yAxisID: 'B',
            label: 'Example Data',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
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
              ticks: {color: 'orange', beginAtZero: true},
              grid: {borderColor: 'green'}
          },
          B: {
              type: 'linear',
              position: 'right',
              ticks: {color: 'blue', beginAtZero: true},
              grid: {borderColor: 'green'}
          },
          x: { ticks: {color: 'grey', beginAtZero: true}, grid: {borderColor: 'orange'}}
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
      type: 'line',
       data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            yAxisID: 'A',
            label: 'Example Data',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },
        {
            yAxisID: 'B',
            label: 'Example Data',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
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
              ticks: {color: 'orange', beginAtZero: true},
              grid: {borderColor: 'green'}
          },
          B: {
              type: 'linear',
              position: 'right',
              ticks: {color: 'blue', beginAtZero: true},
              grid: {borderColor: 'green'}
          },
          x: { ticks: {color: 'grey', beginAtZero: true}, grid: {borderColor: 'orange'}}
        }
      }
  });
</script>

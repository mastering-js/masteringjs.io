With chartjs version 3.7.1, you can change the color of the labels.
In version 3, chartjs changed how to configure the x and y axis of the graph.
Instead of a array, it is now an object.
Do not use version 2 as there is a bug where the x-axis options point to the y-axis options and vice versa.

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
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
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
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
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
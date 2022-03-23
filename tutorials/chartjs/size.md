To set the chart size in chartJS, you should use the `responsive` option.
You must wrap the chart `canvas` tag in a `div` with the css property `position` set to `relative`.
By default, the option is enabled and set to true.
Resize the window to see how it affects the chart with and without `responsive` set.

<style>
  #chart-wrapper {
    display: inline-block; position: relative; height: 400px; width: 66%;
  }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<div id="chart-wrapper">
  <canvas id="chart"></canvas>
</div>
<script>
  const ctx = document.getElementById('chart').getContext('2d');
  const chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
      // Configuration options go here
      options: {
        responsive: true, // ← comment this out to see no change
      }
  });
</script>

```html
<style>
  #chart-wrapper {
    display: inline-block; position: relative; height: 400px; width: 66%;
  }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<div id="chart-wrapper">
  <canvas id="chart"></canvas>
</div>
<script>
  const ctx = document.getElementById('chart').getContext('2d');
  const chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
      // Configuration options go here
      options: {
        responsive: true, // ← comment this out to see no change
      }
  });
</script>
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<style>
  #chart-wrapper {
    display: inline-block; position: relative; height: 400px; width: 66%;
  }
</style>
<div id="chart-wrapper">
  <canvas id="Falsechart"></canvas>
</div>
<script>
  const badChart = document.getElementById('Falsechart').getContext('2d');
  const renderBadChart = new Chart(badChart, {
      // The type of chart we want to create
      type: 'bar',
      // Configuration options go here
      options: {
        responsive: false,
      }
  });
</script>

```html
<style>
  #chart-wrapper {
    display: inline-block; position: relative; height: 400px; width: 66%;
  }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<div id="chart-wrapper">
  <canvas id="chart"></canvas>
</div>
<script>
  const ctx = document.getElementById('chart').getContext('2d');
  const chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
      // Configuration options go here
      options: {
        responsive: false,
      }
  });
</script>
```
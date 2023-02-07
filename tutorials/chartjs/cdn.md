We typically import [Chart.js](https://www.chartjs.org/) from CDNs, because Chart.js is a fairly large and complex module.

To import Chart.js using [jsdelivr.net](https://www.jsdelivr.com/), use the following.
Keep in mind that `chart.umd.js` is minified.

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.2.0/dist/chart.umd.js"></script>
```

You can also use [Cloudflare](https://cdnjs.cloudflare.com/):

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.2.0/chart.umd.js"></script>
```

Or [unpkg](https://unpkg.com/):

```html
<script src="https://unpkg.com/chart.js@4.2.0/dist/chart.umd.js"></script>
```

For example, below is a bar chart using Chart.js from unpkg.

<style>
  #chart-wrapper {
    display: inline-block; position: relative; width: 100%;
  }
</style>
<script src="https://unpkg.com/chart.js@4.2.0/dist/chart.umd.js"></script>
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

## ChartJS 2

Below is how you can import Chart.js 2 using Cloudflare's CDN:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.js"></script>
```
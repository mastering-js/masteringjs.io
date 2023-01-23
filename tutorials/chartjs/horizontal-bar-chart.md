Making a bar chart horizontal in ChartJS is easy.
However, you need to do things a little differently in ChartJS 2 vs ChartJS 3+.

### ChartJS 3+

In ChartJS 3+, you should set the `indexAxis: 'y'` option as follows.

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
    indexAxis: 'y', // <-- here
    responsive: true
  }
});
```

<style>
  #chart-wrapper {
    display: inline-block; position: relative; width: 100%;
  }
</style>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.2.0/dist/chart.umd.js"></script>
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
      indexAxis: 'y', // <-- here
      responsive: true
    }
  });
</script>

### ChartJS 2

In ChartJS 2, just set the chart's `type` to `'horizontalBar'` instead of `'bar'` as follows.

```javascript
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'horizontalBar', // <-- instead of 'bar'
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
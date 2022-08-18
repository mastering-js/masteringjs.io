To remove line fill from your line charts in ChartJS, simply add the `fill: false` property to each of the objects in your `datasets` array.

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.2/chart.min.js" integrity="sha512-zjlf0U0eJmSo1Le4/zcZI51ks5SjuQXkU0yOdsOBubjSmio9iCUp8XPLkEAADZNBdR9crRy3cniZ65LF2w8sRA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

```javascript
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
    data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Example Data',
      fill: false, // <-- Set `fill: false` here
      data: [12, 19, 3, 5, 2, 3]
    }]
  },
  options: {
    responsive: true
  }
});
```

<canvas id="myChart" width="400" height="250"></canvas>
<script>
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',m
    data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Example Data',
      fill: false,
      data: [12, 19, 3, 5, 2, 3]
    }]
  },
  options: {
    responsive: true,
  }
});
</script>

### Changing the Fill Color

To change the fill color, set `fill: true` and set the `backgroundColor` option as follows.

```javascript
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
    data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Example Data',
      backgroundColor: '#ffd700',
      data: [12, 19, 3, 5, 2, 3]
    }]
  },
  options: {
    responsive: true
  }
});
```

<canvas id="myChart2" width="400" height="250"></canvas>
<script>
const ctx2 = document.getElementById('myChart2').getContext('2d');
const chart2 = new Chart(ctx2, {
  type: 'line',
    data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Example Data',
      fill: true, // Need to set `fill: true` to update the fill background color...
      backgroundColor: '#ffd700', // and change the background color
      data: [12, 19, 3, 5, 2, 3]
    }]
  },
  options: {
    responsive: true,
  }
});
</script>
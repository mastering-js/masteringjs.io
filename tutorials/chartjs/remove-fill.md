To remove line fill from your line charts in ChartJS, simply add the `fill: false` property to each of the objects in your `datasets` array.

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.2/chart.min.js" integrity="sha512-zjlf0U0eJmSo1Le4/zcZI51ks5SjuQXkU0yOdsOBubjSmio9iCUp8XPLkEAADZNBdR9crRy3cniZ65LF2w8sRA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<canvas id="myChart" width="400" height="400"></canvas>
<script>
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
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

```javascript
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
    data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Example Data',
      fill: false,
      data: [12, 19, 3, 5, 2, 3]
    }]
  },
  options: {
    responsive: true
  }
});
```

[Chart.js](https://www.chartjs.org/) is a great library for visualizing data and displaying it in your projects. To use it with your Vue projects,
there is an excellent wrapper called `vue-chartjs`. `vue-chartjs` helps you integrate Chart.js with Vue components.

You can install Chart.js and vue-chartjs from npm, or you can instead use it directly in the
browser via CDN. To use one of [Chart.js' chart types](https://www.chartjs.org/docs/latest/charts/), you should use vue-chartjs' `extends` property as shown below.

```javascript
<script src="https://unpkg.com/vue"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>
Vue.component("line-chart", {
  extends: VueChartJs.Line,
  mounted() {
    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 39, 10, 40, 39, 80, 40],
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
});
```

To create the chart, you must call `this.renderChart()` in the `mounted()` hook where
the parameters for `this.renderChart()`
are the data and any options you provide which you can pass in as props. Below is a live demonstration
of the code sample from above:

<div class="app">
{{message}}
<line-chart></line-chart>
</div>

<script src="https://unpkg.com/vue"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>
<script>
Vue.component('line-chart', {
extends: VueChartJs.Line,
mounted(){
  this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
});
var vm = new Vue({
  el: '.app',
  data: {
    message: 'Example'
  }
});

</script>

**Note:** You can use `vue-chartjs` in your single-file components but you must omit the `<template>` tag as the one in your `.vue` file so it doesn't conflict with the [template](/tutorials/vue/templates) that vue-chartjs uses.

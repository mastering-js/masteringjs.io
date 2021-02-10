Chart.js is a great library for visualizing data and displaying it in your projects. To use it with your Vuejs projects,
there is an excellent wrapper called `vue-chartjs`. You need both `chart.js` and `vue-chartjs` if you wish to use this
library in your Vuejs projects. If you do not wish to install the libraries, you can instead use it directly in the
browser via CDN. Because `vue-chartjs` is a wrapper of `chart.js`, every chart type is available for use when working
with these libraries. When you import one of these chart types from `vue-chartjs`, you need to extend it. You can do so
with the `extends` property as shown below

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
are the data and any options you provide which you can pass in as props. Below you will find a live demonstration
of the excerpt from above:

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

**Note:** You can use `vue-chartjs` in your single-file components but you must omit the `<template>` tag as the one in your `.vue` file
will be used instead of the one that you are extending from the library.

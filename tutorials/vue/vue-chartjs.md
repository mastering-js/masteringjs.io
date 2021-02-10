Chart.js is a great library for visualizing data and displaying it in your projects. To use it with your Vuejs projects,
there is an excellent wrapper called `vue-chartjs`. You need both `chart.js` and `vue-chartjs` if you wish to use this
library in your Vuejs projects. If you do not wish to install the libraries, you can instead use it directly in the
browser via CDN. Because `vue-chartjs` is a wrapper of `chart.js`, every chart type is available for use when working
with these libraries. When you import one of these chart types from `vue-chartjs`, you need to extend it. You can do so
with the `extends` property as shown below

```javascript
<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['chartdata', 'options'],
  mounted () {
    this.renderChart(this.chartdata, this.options);
  }
}
</script>
```

or the `mixins` property. If you choose to use the `mixins` property, you must enclose the import
with brackets like as follows.

```javascript
<script>
import { Line } from 'vue-chartjs'

export default {
  mixins: [Line],
  props: ['chartdata', 'options'],
  mounted () {
    this.renderChart(this.chartdata, this.options);
  }
}
</script>
```

<div id="content">
{{message}}
<line-chart></line-chart>
</div>

<script src="https://unpkg.com/vue@3.x"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>
<script>
const app = Vue.createApp({
    data() {
      return{
        message: 'Hello World'
      }
     }
  });
app.component('line-chart', {
extends: VueChartJs.Line,
data: () => ({
  chartdata:{
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
}),
mounted(){
  this.renderChart(this.chartdata, this.options);
  }
});
app.mount('#content');

</script>

To create the chart, you must call `this.renderChart()` in the `mounted()` hook where
the parameters for `this.renderChart()`
are the data and any options you provide which you can pass in as props. Below you will find a live demonstration
of the excerpts from above:

**Note:** You can use `vue-chartjs` in your single-file components but you must omit the `<template>` tag as the one in your `.vue` file
will be used instead of the one that you are extending from the library.

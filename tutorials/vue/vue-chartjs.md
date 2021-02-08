Chart.js is a great library for visualizing data and displaying it in your projects. To use it with your Vuejs projects,
there is an excellent wrapper called `vue-chartjs`. You need both `chart.js` and `vue-chartjs` if you wish to use this
library in your Vuejs projects. If you do not wish to install the libraries, you can instead use it directly in the
browser via CDN. Because `vue-chartjs` is a wrapper of `chart.js`, every chart type is available for use when working
with these libraries. When you import one of these chart types from `vue-chartjs`, you need to extend it. You can do so
with the `extends` property or the `mixins` property. If you choose to use the `mixins` property, you must enclose the import
with brackets. To create the chart, you must call `this.renderChart()` in the `mounted()` hook where the parameters for `this.renderChart()`
are the data and any options you provide which you can hardcode or pass in as props. If you hardcode it, the component becomes nonreusable
so we recommend using props whenever you can as there really is no downside.

```javascript
<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['chartdata', 'options'],
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
```

**Note:** You can use `vue-chartjs` in your single-file components but you must omit the `<template>` tag as the one in your `.vue` file
will be used instead of the one that you are extending from the library.

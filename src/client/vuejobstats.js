
var server = window.location.hostname === 'localhost' ?
  'http://localhost:7071' :
  'https://masteringjs-job-board.azurewebsites.net';

// loads Jobs
const app = new Vue({
  data() {
    return {
      jobDetails: null,
      loading: true,
      error: false,
    }
  },
  template: `
  <div>
  <div v-if="error">
  Make sure you append the jobId as follows: masteringjs.io/jobs/detail#jobId
  If the error still persists, contact Val@karpov.io
  </div>
  <div v-if="!loading">
  <line-chart :jobDetails="jobDetails"></line-chart>
  </div>
  </div>
  `,
  async mounted() {
    if (window.location.hash != null && window.location.hash.length > 1) {
      const jobId = window.location.hash.replace(/^#/, '');
      this.jobDetails = await axios.get(server+'/api/jobStats/'+jobId).then((res) => {return res.data.information});
      return this.loading = false;
    }
    return this.error = true;
  }
});

Vue.component('line-chart', {
  props: ['jobDetails'],
  extends: VueChartJs.Line,
  mounted() {
    this.renderChart({
      labels: this.jobDetails.numClicks.map(element => element.day),
      datasets: [{
        label: 'Number of Clicks a Day',
        backgroundColor: '#f87979',
        fill: false,
        data: this.jobDetails.numClicks.map(element => element.applyClicks)
      }, {
        label: 'Number of Views a Day',
        fill: false,
        backgroundColor: '#4dc9f6',
        data: this.jobDetails.numViews.map(element => element.views)
      }],
    }, {responsive: true, maintainAspectRatio: true, scales: { xAxes: [{ ticks: { autoSkip: false } }] }, scaleShowValues: true})
  }
})
app.$mount('#content');
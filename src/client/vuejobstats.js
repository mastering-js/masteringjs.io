
var server = window.location.hostname === 'localhost' ?
'https://masteringjs-job-board.azurewebsites.net' : //'http://localhost:7071' :
  'https://masteringjs-job-board.azurewebsites.net';

var search = new URLSearchParams(window.location.search.slice(1));

// loads Jobs
const app = new Vue({
  data() {
    return {
      job: null,
      jobDetails: null,
      loading: true,
      error: false,
    }
  },
  template: `
  <div>
    <div v-if="error">
      Make sure you append the jobId as follows: masteringjs.io/jobs/detail#jobId
      If the error still persists, contact val@karpov.io
    </div>
    <div v-if="!loading">
      <h1>{{job.title}} @ {{job.company}}</h1>
      <div class="row">
        <div class="col-4">
          <div class="stat">
            <div class="stat-header">
              Clicks (last 30 days)
            </div>
            <div class="tooltip">
              Clicks are the number of times someone viewed the description of your job posting.
              This means they clicked through on a Mastering JS job board ad to your job posting.
            </div>
            <div class="stat-data">
              {{jobDetails.totalViews}}
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="stat">
            <div class="stat-header">
              Applications (last 30 days)
            </div>
            <div class="tooltip">
              Applications are the number of times someone clicked "apply" on your job posting and was
              redirected to the <a :href="job.url">link you provided to apply for the role</a>.
            </div>
            <div class="stat-data">
              {{jobDetails.totalClicks}}
            </div>
          </div>
        </div>
      </div>
      <line-chart :jobDetails="jobDetails"></line-chart>
    </div>
  </div>
  `,
  async mounted() {
    if (search.has('jobId')) {
      const jobId = search.get('jobId');
      const res = await axios.get(server+'/api/jobStats/'+jobId);
      this.jobDetails = res.data.information;
      this.job = res.data.job;
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
        label: 'Applications/Day',
        backgroundColor: '#f87979',
        fill: false,
        data: this.jobDetails.numClicks.map(element => element.applyClicks)
      }, {
        label: 'Clicks/Day',
        fill: false,
        backgroundColor: '#4dc9f6',
        data: this.jobDetails.numViews.map(element => element.views)
      }],
    }, {
      responsive: true,
      maintainAspectRatio: false,
      scales: { xAxes: [{ ticks: { autoSkip: false } }] }, scaleShowValues: true
    });
  }
})
app.$mount('#content');

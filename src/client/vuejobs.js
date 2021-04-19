const server = 'https://masteringjs-job-board.azurewebsites.net';

// loads Jobs
Vue.createApp({
  data() {
    return {
      jobs: null
    }
  },
  template: `
    <div>
      <h1>Find Your Dream JavaScript Developer Job</h1>

      <div class="post">
        <div class="description">
          Hiring JavaScript developers? Reach <b>100,000+</b> JavaScript developers on one of the top JS tutorial sites.
          <span class="button">
            <a href="/post-a-job">Post a Job</a>
          </span>
        </div>
      </div>

      <h3>New JavaScript Jobs</h3>

      <div v-for="job in jobs">
        <div class="post job">
          <div v-if="job.logo" class="company-logo">
            <img v-bind:src="job.logo" />
          </div>
          <div class="description">
            <div>{{job.company}}</div>
            <a class="title" v-bind:href="'/jobs/' + job._id">{{job.title}}</a>
            <div>
              <div class="location">
                {{job.location}}
              </div>
            </div>
          </div>

          <div class="apply-button">
            Apply
          </div>
        </div>
      </div>
    </div>
  `,
  async mounted() {
    const res = await axios.get(server + '/api/listjobs');

    this.jobs = res.data.jobs;
  }
}).mount('#content');
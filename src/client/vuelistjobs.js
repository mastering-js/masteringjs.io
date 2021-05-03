
const server = "https://masteringjs-job-board.azurewebsites.net";

const app = new Vue({
    data() {
        return {
          jobs: null
        };
    },
    template: `
    <div id="jobs">
      <div v-for="job in jobs" class="job-listing">
        <a v-bind:href="'/jobs/' + job._id">
          <div v-if="job.logo" class="company-logo">
            <img v-bind:src="job.logo" />
          </div>
          <div class="description">
            <div class="company">{{job.company}}</div>
            <div class="title">{{job.title}}</div>
            <div class="location">{{job.location}}</div>
          </div>
        </a>
      </div>
      <div>
        <div class="button jobs-view-more">
          View more jobs!
        </div>
      </div>
    </div>
    `,
    async mounted() {
        const res = await axios.get(server + '/api/listjobs');
        this.jobs = res.data.jobs.splice(0,3);
    }
});
app.$mount('#jobs');
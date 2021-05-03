
const config = require('./config.json');

const app = new Vue({
    data() {
        return {
          jobs: null
        };
    },
    template: `
    <div id="jobs">
    <h1>Looking For <br/>Work?</h1>
    <hr />
    <div v-for="job in jobs">
    <div class="view">
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
      <button>Apply</button>
      </div>
    </div>
    <hr />
    </div>
    </div>
    `,
    async mounted() {
        const res = await axios.get(config.server + '/api/listjobs');
        this.jobs = res.data.jobs.splice(0,3);
    }
});
app.$mount('#jobs')
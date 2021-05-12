
//const server = "https://masteringjs-job-board.azurewebsites.net";
const server = "http://localhost:7071"
// adding mode history breaks the router
// const router = new VueRouter({routes: [{path: '/:id', name:'job-dropdown', component: {template: '<div>Hello {{$route.params.id}} + {{$route.params.description}}</div>'}}]});

// loads Jobs
const app = new Vue({
  data() {
    return {
      jobs: null,
      loading: true,
      description: null
    }
  },
  methods: {
    async loadJobDetails(j) {
      const res = await axios.get(server + '/api/views/' + j._id);
      this.description = res.data.job.description;
      j.isActive = !j.isActive;
    },
    async toggleDescription(j) {
      if (j.isActive == false) {
        this.loadJobDetails(j);
        window.location.hash = '#' + j._id;
      } else {
        j.isActive = !j.isActive;
        this.description = null;
        window.location.hash = '';
      }
    },
    async apply(id) {
      window.location.href = await axios.get(server+'/api/link/'+id).then((res) => {return res.data.job.url});
    }
  },
  watch: {
    $route() {
      this.jobs.map(job => Object.assign(job,{isActive:false}));
    }
  },
  template: `
    <div>
      <h1>Find Your Dream JavaScript Developer Job</h1>
      <div v-if="!loading">
      <div class="post">
        <div class="description">
          Hiring JavaScript developers? Reach <b>100,000+</b> JavaScript developers on one of the top JS tutorial sites.
          <span class="button">
            <a href="/jobs/create">Post a Job</a>
          </span>
        </div>
      </div>

      <h3>New JavaScript Jobs</h3>
      <div v-for="job in jobs" v-bind:id="'job-' + job._id">
        <div class="post job">
          <div v-if="job.logo" class="company-logo">
            <img v-bind:src="job.logo" />
          </div>
          <div class="description">
            <div>{{job.company}}</div>
            <div @click="toggleDescription(job)" class="title">{{job.title}}</div>
            <div>
              <div class="location">
                {{job.location}}
              </div>
            </div>
          </div>
          <div v-if="job.isActive">
            <div v-html="description"></div>
          </div>
          <div class="apply-button" @click="apply(job._id)">
            Apply
          </div>
        </div>
      </div>
      </div>
      <div v-else>Loading...</div>
    </div>
  `,
  async mounted() {
    const res = await axios.get(server + '/api/listjobs');

    this.jobs = res.data.jobs.map(obj => Object.assign(obj, {isActive: false}));
    
    if (window.location.hash != null && window.location.hash.length > 1) {
      const jobId = window.location.hash.replace(/^#/, '');
      const j = res.data.jobs.find(job => job._id === jobId);
      if (j != null) {
        this.loadJobDetails(j);
      }
    }

    this.loading = !this.loading;
  }
});
app.$mount('#content');
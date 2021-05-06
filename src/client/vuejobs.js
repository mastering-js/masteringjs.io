
const server = "https://masteringjs-job-board.azurewebsites.net";
// adding mode history breaks the router
const router = new VueRouter({routes: [{path: '/:id', name:'job-dropdown', component: {template: '<h1>Hello {{$route.params.id}} {{$route.params.description}}</h1>'}}]});

// loads Jobs
const app = new Vue({
  data() {
    return {
      jobs: null,
      path: this.$route.path,
      loading: true
    }
  },
  methods: {
    toggleDescription(j) {
      j.isActive = !j.isActive;
      if(j.isActive == false && this.path === this.$route.path) {
        this.$router.push({path: '/'});
      } else {
        this.path = this.$route.path;
      }
    }
  },
  watch: {
    $route() {
      this.jobs.map(job => Object.assign(job,{isActive:false}));
    }
  },
  router,
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
      <div v-for="job in jobs">
        <div class="post job">
          <div v-if="job.logo" class="company-logo">
            <img v-bind:src="job.logo" />
          </div>
          <div class="description">
            <div>{{job.company}}</div>
            <router-link :to="{name:'job-dropdown', params: {id:job._id, description: job.description}}" @click.native="toggleDescription(job)" class="title">{{job.title}}</router-link>
            <div>
              <div class="location">
                {{job.location}}
              </div>
            </div>
          </div>
          <div v-show="job.isActive">
          <router-view></router-view>
          </div>
          <div class="apply-button">
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
    // could probably put this bottom statement in the object.assign method

    if (this.$route.path != '/') {
      console.log('Hello there');
      Array.from(this.jobs).forEach((job) => {
        if(job._id === this.$route.params.id) {
          console.log('hi');
          job.isActive = true;
        }
      });
    }
    this.loading = !this.loading;
  }
});
app.$mount('#content');
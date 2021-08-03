var server = window.location.hostname === 'localhost' ?
  'http://localhost:7071' :
  'https://masteringjs-job-board.azurewebsites.net';

// loads Jobs
const app = new Vue({
  data() {
    return {
      jobs: null,
      loading: true
    }
  },
  methods: {
    async loadJobDetails(j) {
      j.status = 'LOADING';
      const res = await axios.get(server + '/api/views/' + j._id);
      if (j.status !== 'LOADING') {
        return;
      }
      j.description = res.data.job.description;
      j.status = 'LOADED';
    },
    async toggleDescription(j, ev) {
      ev.preventDefault();

      if (j.status === 'DEFAULT') {
        window.location.hash = '#' + j._id;
        this.loadJobDetails(j);
      } else {
        j.status = 'DEFAULT';
        j.description = null;
        window.location.hash = '';
      }
    },
    async apply(id) {
      window.location.href = await axios.get(server+'/api/link/'+id).then((res) => {return res.data.job.url});
    }
  },
  template: `
    <div>Hello World</div>
  `,
  async mounted() {
    const res = await axios.get(server + '/api/listjobs');

    this.jobs = res.data.jobs.map(obj => Object.assign(obj, {
      status: 'DEFAULT',
      description: null
    }));
    
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
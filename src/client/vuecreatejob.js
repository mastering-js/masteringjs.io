// loads Jobs

const server = 'https://masteringjs-job-board.azurewebsites.net';

Vue.createApp({
  data: () => ({
    company: '',
    logo: null,
    title: '',
    location: 'Anywhere'
  }),
  methods: {
    async postJob() {
      await axios.post(server + '/api/createjob', {
        company: this.company,
        title: this.title,
        location: this.location
      });
      console.log('Done');
    }
  },
  template: `
    <div>
      <h1>Hire JavaScript Developers</h1>
      <form action="" @submit.prevent="postJob()">
        <div>
          <label>Company Name</label>
          <input type="text" v-model="company" />
        </div>
        <div>
          <label>Position</label>
          <input type="text" v-model="title" />
        </div>
        <div>
          <label>Location</label>
          <input type="text" v-model="location" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  `,
}).mount('#content');
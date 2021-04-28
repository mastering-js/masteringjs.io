
// loads Jobs
const server = 'https://masteringjs-job-board.azurewebsites.net';
const payment = 'http://localhost:7071/api/stripeCheckout';

const router = new VueRouter({routes: [{path: '/test', component: {template: '<h1>Hello</h1>'}}]})

const app = new Vue({
  data: () => ({
    company: null,
    logo: null,
    title: null,
    location: 'Anywhere',
    sticky: false,
    description: null,
    url: null,
    instructions: null,
    email: null,
    feedback: null,
    invoiceAddress: null,
    invoiceNotes: null,
    tags: [],
    addtool: '',
    removetool: '',
    error: false
  }),
  router,
  methods: {
    async postJob() {
      if (!this.company || !this.logo || !this.title || !this.location || !this.description || 
        !this.url || !this.instructions || !this.email || !this.feedback || !this.invoiceAddress || 
        !this.invoiceNotes || !this.tags) {
          return this.error = true;
        }
        else {
          this.error = false;
        }
      const formData = new FormData();
      formData.append('logo', this.logo);
      const headers = {'Content-Type': 'multipart/form-data'};
      await axios.post(server + '/api/createjob', {
        company: this.company,
        title: this.title,
        location: this.location,
        email: this.email,
        tags: this.tags,
        sticky: this.sticky,
        description: this.description,
        url: this.url,
        instructions: this.instructions,
        feedback: this.feedback,
        invoiceAddress: this.invoiceAddress,
        invoiceNotes: this.invoiceNotes,
        logo: formData
      }, {headers});
      console.log('Done');
    },
    addTool() {
      this.tags.push(this.addtool);
      this.addtool = '';
    },
    removeTool() {
      this.tags = this.tags.filter(el => el != this.removetool);
      console.log(this.tags);
    },
    assignImage() {
      this.logo = this.$refs.file.files[0];
    },
    async checkout() {
      var stripe = Stripe(

        'pk_test_51IkuAqIFSwo5WpGWudAKEeemrymI6EmICEAgkgvlq4Bo5jJ1uuMRlrBRw9kvHH7boANqjE7Y6Mb7lQmsXRQoZo3x00Ek1L6d8A'
        );
        await axios.post(payment, {}).then(function(response) {
          return response.data;
        }).then(function(session){
          return stripe.redirectToCheckout({sessionId:session});
        }).then(function(result) {
          if(result.error) {
            alert(result.error.message);
          }
        }).catch(function(error) {
          console.error('Error', error);
        });
    }
  },
  template: `
    <div>
      <h1>Hire JavaScript Developers</h1>
      <h2> All fields are required </h2>
      <h3 v-if="error">You are missing fields </h3>
      <form action="" @submit.prevent="postJob()">
        <div>
          <label> Company Name </label>
          <input type="text" v-model="company" />
        </div>
        <div>
          <label> Position </label>
          <input type="text" v-model="title" />
        </div>
        <div>
          <label> Location </label>
          <input type="text" v-model="location" />
        </div>
        <div>
          <label>Sticky your post for 30 days? Email masteringjs after 30 days to extend.</label>
          <input type="checkbox" v-model="sticky" />
        </div>
        <div>
          <div><label>Description</label></div>
          <textarea v-model="description">Enter Text Here</textarea>
        </div>
          <form action="" @submit.prevent="addTool()">
            <div v-for="tag in tags" :key="tag">{{tag}}</div>
            <div>
              <label> Add Framework </label>
              <input type = "text" v-model="addtool"/>
              <button type = "submit">Submit</button>
            </div>
            <div>
              <label> Remove Framework </label>
              <input type="text" v-model="removetool"/>
              <button @click="removeTool()">Remove entry</button>
            </div>
          </form>
        <div>
          <div><label> Company Image </label></div>
          <input type="file" @change="assignImage" ref = "file"/>
        </div>
        <div>
          <label> Apply URL </label>
          <input type="url" v-model="url"/>
        </div>
        <div>
          <div><label> How To Apply </label></div>
          <textarea v-model="instructions">To Apply</textarea>
        </div>
        <div>
          <label> Company Email </label>
          <input type="email" v-model="email"/>
        </div>
        <div>
          <div><label> Feedback </label></div>
          <textarea v-model="feedback">Type here</textarea>
        </div>
        <div>
          <label> Invoice Address </label>
          <input type="text" v-model="invoiceAddress" />
        </div>
        <div>
          <label> Invoice Notes </label>
          <input type="text" v-model="invoiceNotes" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button id="checkout-button" @click = "checkout()">Here</button>
    </div>
  `,
});
app.$mount('#content');

// loads Jobs
const server = "http://localhost:7071";
const payment = server+'/api/stripeCheckout';

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
    tags: 'like,this',
    displayImage: true,
    previewImage: null
  }),
  updated() {
    console.log(new Date(), 'State Change:', this.$data);
  },
  mounted() {
    window.$saveState = () => {
      window.localStorage.setItem('__state', JSON.stringify(this.$data));
    };
    window.$loadState = () => {
      const saved = JSON.parse(window.localStorage.getItem('__state'));
      if (!saved) {
        throw new Error('No saved data!');
      }
      Object.assign(this.$data, saved);
    };
    window.$clearState = () => {
      window.localStorage.setItem('__state', '');
    };
  },
  methods: {
    async postJob() {
      this.tags = this.tags.split(",");
      const formData = new FormData();
      formData.append('logo', this.logo);
      const headers = {'Content-Type': 'multipart/form-data'};
     let clientid = await axios.post(server + '/api/createJob', {
        company: this.company,
        title: this.title,
        location: this.location,
        email: this.email,
        tags: this.tags,
        sticky: this.sticky,
        description: marked(this.description),
        url: this.url,
        instructions: this.instructions,
        feedback: this.feedback,
        invoiceAddress: this.invoiceAddress,
        invoiceNotes: this.invoiceNotes,
        // logo: formData
      }, {headers}).then((response) => {return response.data.job._id});
      console.log('Done');
      var stripe = Stripe('pk_test_51IkuAqIFSwo5WpGWudAKEeemrymI6EmICEAgkgvlq4Bo5jJ1uuMRlrBRw9kvHH7boANqjE7Y6Mb7lQmsXRQoZo3x00Ek1L6d8A');
      await axios.post(payment, {sticky:this.sticky, clientReferenceId: clientid}).then(function(response) {
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
    },
    assignImage() {
      if (this.$refs.file.files[0].name.includes(".png") || this.$refs.file.files[0].name.includes(".jpg")) {
        this.logo = this.$refs.file.files[0];
        this.previewImage = URL.createObjectURL(this.logo);
        this.displayImage = true;
      } else {
        this.displayImage = false;
      }
      
    },
  },
  computed: {
    md() {
      if(this.description == null) return;
      return marked(this.description);
    }
  },
  template: `
    <div>
      <h1>Hire JavaScript Developers</h1>
      <form action="" @submit.prevent="postJob()">
        <div>
          <label> Company Name </label>
          <input type="text" v-model="company" required />
        </div>
        <div>
          <label> Position </label>
          <input type="text" v-model="title" required/>
        </div>
        <div>
          <label> Location </label>
          <input type="text" v-model="location" required/>
        </div>
        <div>
          <label>Sticky your post for 30 days? Email masteringjs after 30 days to extend.</label>
          <input type="checkbox" v-model="sticky" />
        </div>
        <div>
          <div><label>Description</label></div>
          <textarea v-model="description" required>Enter Text Here</textarea>
        </div>
         <div>
        <div><label> Technical Skills(Comma separated values, no spaces) </label></div>
        <input type="text" v-model="tags" required />
         </div>
        <div>
          <div><label> Company Image </label></div>
          <h3 v-if="!displayImage">That file type is not supported</h3>
          <input type="file" @change="assignImage" ref = "file" required/>
        </div>
        <div>
          <label> Apply URL </label>
          <input type="url" v-model="url" required/>
        </div>
        <div>
          <div><label> How To Apply </label></div>
          <textarea v-model="instructions" required>To Apply</textarea>
        </div>
        <div>
          <label> Company Email </label>
          <input type="email" v-model="email" required/>
        </div>
        <div>
          <div><label> Feedback </label></div>
          <textarea v-model="feedback" required>Type here</textarea>
        </div>
        <div>
          <label> Invoice Address </label>
          <input type="text" v-model="invoiceAddress" />
        </div>
        <div>
          <label> Invoice Notes </label>
          <input type="text" v-model="invoiceNotes" />
        </div>
        <div>
        <h1>{{title}}</h1>
        <h2>{{company}}</h2>
        <img :src="previewImage" style="width:50%"/>
        <h3>{{location}}</h3>
        <div v-html="md"></div>
        <h3>{{tags}}</h3>
        <h3>Click here to apply: {{url}}</h3>
        <h3>To apply: {{instructions}}</h3>
        <h3>Email here if any questions: {{email}}</h3>
        <h3>{{feedback}}</h3>
        <h3>Invoice Address: {{invoiceAddress}}</h3>
        <h3>Notes: {{invoiceNotes}}</h3>
        </div>
        <button id="checkout-button" type="submit">Submit</button>
      </form>
    </div>
  `,
});
app.$mount('#content');
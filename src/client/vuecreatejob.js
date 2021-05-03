
// loads Jobs
const config = require('./config.json');
const payment = 'http://localhost:7071/api/stripeCheckout';

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
    error: false,
    preview: false,
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
      if (this.tags.length == 0) {
          return this.error = true;
        }
        else {
          this.error = false;
        }
      const formData = new FormData();
      formData.append('logo', this.logo);
      const headers = {'Content-Type': 'multipart/form-data'};
      await axios.post(config.server + '/api/createjob', {
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
        // logo: formData
      }, {headers});
      console.log('Done');
    },
    addTool() {
      if (this.addTool == '') return;
      this.tags.push(this.addtool);
      this.addtool = '';
    },
    removeTool() {
      this.tags = this.tags.filter(el => el != this.removetool);
      console.log(this.tags);
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
    async checkout() {
      var stripe = Stripe(

        'pk_test_51IkuAqIFSwo5WpGWudAKEeemrymI6EmICEAgkgvlq4Bo5jJ1uuMRlrBRw9kvHH7boANqjE7Y6Mb7lQmsXRQoZo3x00Ek1L6d8A'
        );
        await axios.post(payment, {sticky:this.sticky}).then(function(response) {
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
    showPreview() {
      this.preview = !this.preview;
    }
  },
  template: `
    <div>
      <h1>Hire JavaScript Developers</h1>
      <form v-if="!preview" action="" @submit.prevent="postJob()">
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
          <form action="" @submit.prevent="addTool()">
          <div v-if="error" style="border-style:solid;border-color: red;">
          Frameworks:
          </div>
          <div v-else>Frameworks:</div>
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
        <button type="submit">Submit</button>
        <button @click="showPreview()">Preview</button>
      </form>
      <div v-else>
      <h1>{{title}}</h1>
      <h2>{{company}}</h2>
      <img :src="previewImage" style="width:50%"/>
      <h3>{{location}}</h3>
      <h3>{{Description}}</h3>
      <h3>{{tags}}</h3>
      <h3>Click here to apply: {{url}}</h3>
      <h3>To apply: {{instructions}}</h3>
      <h3>Email here if any questions: {{email}}</h3>
      <h3>{{feedback}}</h3>
      <h3>Invoice Address: {{invoiceAddress}}</h3>
      <h3>Notes: {{invoiceNotes}}</h3>
      <button @click = "showPreview()">Fix Errors</button>
      <button id="checkout-button" @click = "checkout()">Checkout</button>
      </div>
    </div>
  `,
});
app.$mount('#content');
const server = "https://masteringjs-job-board.azurewebsites.net";
const payment = server + "/api/stripeCheckout";
var stripe = Stripe(
  "pk_test_51IkuAqIFSwo5WpGWudAKEeemrymI6EmICEAgkgvlq4Bo5jJ1uuMRlrBRw9kvHH7boANqjE7Y6Mb7lQmsXRQoZo3x00Ek1L6d8A"
);

const app = new Vue({
  data: () => ({
    company: null,
    logo: null,
    title: null,
    location: "Anywhere",
    sticky: false,
    description: null,
    url: null,
    instructions: null,
    email: null,
    feedback: null,
    invoiceAddress: null,
    invoiceNotes: null,
    tags: "like,this",
    displayImage: false,
    loading: false,
    price: 60,
  }),
  updated() {
    console.log(new Date(), "State Change:", this.$data);
  },
  created() {
    window.addEventListener("keydown", this.shortcut);
  },
  destroyed() {
    window.removeEventListener("keydown", this.shortcut);
  },
  mounted() {
    window.$saveState = () => {
      window.localStorage.setItem("__state", JSON.stringify(this.$data));
    };
    window.$loadState = () => {
      const saved = JSON.parse(window.localStorage.getItem("__state"));
      if (!saved) {
        throw new Error("No saved data!");
      }
      Object.assign(this.$data, saved);
    };
    window.$clearState = () => {
      window.localStorage.setItem("__state", "");
    };
  },
  methods: {
    postJob() {
      this.loading = true;
      const tags = this.tags.split(",");
      axios
        .post(server + "/api/createJob", {
          company: this.company,
          logo: this.logo,
          title: this.title,
          location: this.location,
          email: this.email,
          tags: tags,
          sticky: this.sticky,
          description: marked(this.description),
          url: this.url,
          instructions: this.instructions,
          feedback: this.feedback,
          invoiceAddress: this.invoiceAddress,
          invoiceNotes: this.invoiceNotes,
        })
        .then(function (response) {
          return stripe.redirectToCheckout({ sessionId: response.data.id });
        })
        .then(function (result) {
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function (error) {
          console.error("Error", error);
        });
    },
    shortcut(event) {
      if (event.key === "s" && event.ctrlKey) {
        event.preventDefault();
        window.$saveState();
      }
      if (event.key === "o" && event.ctrlKey) {
        event.preventDefault();
        window.$loadState();
      }
      if (event.key === "e" && event.ctrlKey) {
        event.preventDefault();
        window.$clearState();
      }
    },
  },
  computed: {
    md() {
      if (this.description == null) return;
      return marked(this.description);
    },
    logoWithPlaceholder() {
      if (this.logo) {
        this.displayImage = true;
        return this.logo;
      }
      this.displayImage = false;
      return "/assets/logo.svg";
    },
    companyWithPlaceholder() {
      if (this.company) {
        return this.company;
      }
      return "Placeholder, LLC";
    },
    titleWithPlaceholder() {
      if (this.title) {
        return this.title;
      }
      return "Software Engineer 3.14";
    },
  },
  watch: {
    sticky: function () {
      if (this.sticky) {
        return (this.price = 90);
      } else {
        this.price = 60;
      }
    },
  },
  template: `
    <div class="create-job-main">
      <div class="header">
        <h1>Hire JavaScript Developers</h1>
      </div>
      <div class="create-job">
        <form action="" @submit.prevent="postJob()" id="jobpost">
          <div class="job-details-panel">
            <div class="job-details-panel-header">Let's Start</div>
            <div class="subs">
              <label> Company Name* </label>
              <div>
                <input type="text" v-model="company" required placeholder="Placeholder, LLC" />
                <br />
                <small><small>Please put in the titles like Inc.</small></small>
              </div>
            </div>
            <div class="subs">
              <label> Job Title* </label>
              <div>
                <input type="text" v-model="title" required placeholder="Software Engineer 3.14" />
                <br />
                <small><small>Please put in the job title only, not a sentence. Also if you are posting multiple
                roles, you will need to make a separate post for each one.</small></small>
              </div>
            </div>
            <div class = "subs">
              <label> Location* </label>
              <input type="text" v-model="location" required />
              <br />
              <small><small>If this is a remote job, leave the location as "Anywhere". Otherwise, only put in a location,
              not a timezone.</small></small>
            </div>
          </div>
          <div class="job-details-panel">
            <div class="job-details-panel-header">Customize</div>
            <div>
              <label>Sticky your post for 30 days? Email masteringjs after 30 days to extend. ($30)</label>
              <div>
                <input type="checkbox" v-model="sticky" />
                <br />
                <small><small>Being the first job will increase your chances of finding a candidate</small></small>
              </div>
            </div>
          </div>
          <div class="job-details-panel">
            <div class="job-details-panel-header">Job Details</div>
            <div class="subs">
              <div><label>Description*</label></div>
              <textarea v-model="description" required>Enter Text Here</textarea>
              <br />
              <small><small>This does support markdown if you want to format the job description.</small></small>
            </div>
            <div class="subs">
              <label> Technical Skills (Comma separated values, no spaces) </label>
              <div>
              <input type="text" v-model="tags" required />
              <br />
              <small><small>Input frameworks and other technical skills you would like the candidate to have.</small></small>
              </div>
            </div>
            <div class="subs">
              <label>Company Logo URL*</label>
              <input type="url" v-model="logo" required/>
              <br />
              <small><small>Make sure the image you are providing in the url won't be taken down, otherwise
              your post will have no photo.</small></small>
            </div>
            <div v-if = "displayImage" class = "company-logo">
            <img v-bind:src="logoWithPlaceholder" />
            </div>
            <div class="subs">
              <label>Apply URL*</label>
              <input type="url" v-model="url" required/>
              <br />
              <small><small>If the link you are providing is to a form, you will receive more applicants due to the
              simplicity and structure.</small></small>
            </div>
            <div class="subs">
              <div><label> How To Apply </label></div>
              <textarea v-model="instructions" required>To Apply</textarea>
              <br />
              <small><small>Detail here what the candidates should do when applying through the link you provided if it is not
              straightforward.</small></small>
            </div>
          </div>
          <div class="job-details-panel">
            <div class="job-details-panel-header">Company</div>
            <div class="subs">
              <label> Company Email* </label>
              <input type="email" v-model="email" required/>
              <small><small>Make sure this email is accessible by you! We use this to send the invoice and edit link. 
              We can not and do not manually resend it!</small></small>
            </div>
            <div class="subs">
              <div><label> Feedback </label></div>
              <textarea v-model="feedback">Type here</textarea>
              <br />
              <small><small>This isn't part of the job post. If you have any feature requests or general 
              feedback about posting a job, leave it here. 
              </small></small>
            </div>
            <div class="subs">
              <label> Invoice Address </label>
              <input type="text" v-model="invoiceAddress" />
            </div>
            <div class="subs">
              <label> Invoice Notes </label>
              <input type="text" v-model="invoiceNotes" />
            </div>
          </div>
          <div class="job-details-panel">
            <div class="job-details-panel-header">Preview</div>
            <div class="post job">
              <div class="company-logo">
                <img v-bind:src="logoWithPlaceholder" />
              </div>
              <div class="description">
                <div>{{companyWithPlaceholder}}</div>
                <a class="title">{{titleWithPlaceholder}}</a>
                <div>
                  <div class="location">
                    {{location}}
                  </div>
                </div>
              </div>
              <div>
              </div>
              <div class="apply-button">
                Apply
              </div>
            </div>
          </div>
          
        </form>
      </div>
      <div class="checkout">
        <div class="copy">
          Mastering JS is <b>the go-to microtutorials site for pragmatic JavaScript developers</b>.

          <div class="benefit">
            <img class="icon" src="/assets/jobs/graph.svg" />
            <div>
              Reach JavaScript developers on our tutorials: over <b>300k</b> page views per month
            </div>
          </div>
          <div class="benefit">
            <img class="icon" src="/assets/jobs/mailbox.svg" />
            <div>
              Reach <b>1000</b> developers on our <a href="https://www.getrevue.co/profile/masteringjs">newsletter</a>
            </div>
          </div>
          <div class="benefit">
            <img class="icon" src="/assets/jobs/stats.svg" />
            <div>
              Get statistics on page views and applicants for your job ad
            </div>
          </div>

          <div class="benefit">
            <img src="/assets/jobs/semrush-1.png">
            <div class="small">SEO data from <a href="https://semrush.com">Semrush</a></div>
          </div>

          <div class="benefit">
            <img class="icon" src="/assets/jobs/lock.svg" />
            <div>
              Secure payment with Stripe
            </div>
          </div>
        </div>
        <div class="cart">
          <button id="checkout-button" class="button" type="submit" form="jobpost">Post Job - $\{{price}}</button>
        </div>
      </div>

      <div class="fixed-preview">
            <div class="job-details-panel">
              <div class="post job">
                <div class="company-logo">
                  <img v-bind:src="logoWithPlaceholder" />
                </div>
                <div class="description">
                  <div>{{companyWithPlaceholder}}</div>
                  <a class="title">{{titleWithPlaceholder}}</a>
                  <div>
                    <div class="location">
                      {{location}}
                    </div>
                  </div>
                </div>
                <div>
                </div>
                <div class="apply-button">
                  Apply
                </div>
              </div>
            </div>
          </div>
    </div>
  `,
});
app.$mount("#content");

To validate an email input in Vue, you should bind the input's value to a variable using [`v-model`](/tutorials/vue/v-model) and use one of the methods for [email validation in vanilla JavaScript](/tutorials/fundamentals/email-validation).
For example, the following example validates whether the input is valid whenever the value of the input changes using a relatively simple regular expression.

```javascript
Vue.createApp({
  data: () => ({ email: 'john@gmail.com' }),
  computed: {
    isValidEmail() {
      return /^[^@]+@\w+(\.\w+)+\w$/.test(this.email);
    }
  },
  template: `
  <div>
    <div>
      <input v-model="email" />
    </div>
    <div>
      Email is {{isValidEmail ? 'valid' : 'invalid'}}
    </div>
  </div>
  `
}).mount('#example');
```

Below is a live example.

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="example" style="padding: 10px; border: 1px solid #ddd"></div>
<script>
  Vue.createApp({
    data: () => ({ email: 'john@gmail.com' }),
    computed: {
      isValidEmail() {
        return /^[^@]+@\w+(\.\w+)+\w$/.test(this.email);
      }
    },
    template: `
    <div>
      <div>
        <input v-model="email" />
      </div>
      <div>
        Email is {{isValidEmail ? 'valid' : 'invalid'}}
      </div>
    </div>
    `
  }).mount('#example');
</script>

## Validating Email on Button Click

The previous example validates the email immediately whenever the input changes.
This isn't necessarily the right way to go for a good user experience.
For example, if the `input` were empty by default, the user would see that the email was invalid immediately.

A common approach is to delay validating the email until the user clicks a button.
For example, suppose you have a registration form that asks the user to enter their email and password.
You can instead validate the email when the user submits the form.

```javascript
Vue.createApp({
  data: () => ({ email: '', password: '', errors: null }),
  methods: {
    async submitForm() {
      const errors = {};
      if (!this.email) {
        errors.email = 'Email is required';
      } else if (!/^[^@]+@\w+(\.\w+)+\w$/.test(this.email)) {
        errors.email = 'Invalid email';
      }

      if (Object.keys(errors).length > 0) {
        this.errors = errors;
        return;
      } else {
        this.errors = null;
      }

      // Handle submitting form
    }
  },
  template: `
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <input v-model="email" placeholder="email" />
        <div v-if="errors && errors.email">
          {{errors.email}}
        </div>
      </div>
      <div>
        <input type="password" v-model="password" />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
  `
}).mount('#example2');
```

Below is a live example.

<div id="example2" style="padding: 10px; border: 1px solid #ddd"></div>
<script>
  Vue.createApp({
    data: () => ({ email: '', password: '', errors: null }),
    methods: {
      async submitForm() {
        const errors = {};
        if (!this.email) {
          errors.email = 'Email is required';
        } else if (!/^[^@]+@\w+(\.\w+)+\w$/.test(this.email)) {
          errors.email = 'Invalid email';
        }
        if (Object.keys(errors).length > 0) {
          this.errors = errors;
          return;
        } else {
          this.errors = null;
        }
        // Handle submitting form
      }
    },
    template: `
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <input v-model="email" placeholder="email" />
          <div v-if="errors && errors.email">
            {{errors.email}}
          </div>
        </div>
        <div>
          <input type="password" v-model="password" />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
    `
  }).mount('#example2');
</script>
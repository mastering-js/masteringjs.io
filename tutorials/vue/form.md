[Vue's `v-model` directive](https://masteringjs.io/tutorials/vue/v-model)
binds the value of an HTML `input` tag to a JavaScript variable. That
makes it ideal for building a form.

For example, suppose you're building a login form that you want to
submit with a [HTTP POST request using Axios](/tutorials/axios/post).
Here's how that looks:

```javascript
[require:Vue.*form.*login form with axios$]
```

Basic Form Validation
---------------------

[Computed properties](/tutorials/vue/computed) are a neat way to handle
form validation in Vue. You can define a `emailError` property that
Vue then updates whenever the `email` changes. You can then disable
the "Submit" button whenever there's an `emailError`:

```javascript
const app = new Vue({
  data: () => ({ email: '', password: '' }),
  computed: {
    emailError: function() {
      if (this.email.length === 0) {
        return 'Email is required';
      }
      if (!this.email.includes('@')) {
        return 'Email must contain "@"';
      }
      return null;
    }
  },
  methods: {
    submit: async function() {
      await axios.post('http://httpbin.org/post', {
        email: this.email,
        password: this.password
      });
    }
  },
  template: `
    <div>
      <input
        type="text"
        v-model="email"
        placeholder="Email">
      <input
        type="password"
        v-model="password"
        placeholder="Password">
      <button v-on:click="submit()" v-bind:disabled="emailError">
        Submit
      </button>
      <div>
        {{emailError}}
      </div>
    </div>
  `
});
```

Computed properties can rely on other computed properties, so you
can define a separate `isFormValid` computed property that relies
on computed properties for other fields:

```javascript
const app = new Vue({
  data: () => ({ email: '', password: '' }),
  computed: {
    emailError: function() {
      if (this.email.length === 0) {
        return 'Email is required';
      }
      if (!this.email.includes('@')) {
        return 'Email must contain "@"';
      }
      return null;
    },
    passwordError: function() {
      if (this.password.length === 0) {
        return 'Password is required';
      }
      return null;
    },
    isFormValid: function() {
      return this.emailError == null && this.passwordError == null;
    }
  },
  methods: {
    submit: async function() {
      await axios.post('http://httpbin.org/post', {
        email: this.email,
        password: this.password
      });
    }
  },
  template: `
    <div>
      <input
        type="text"
        v-model="email"
        placeholder="Email">
      <input
        type="password"
        v-model="password"
        placeholder="Password">
      <button v-on:click="submit()" v-bind:disabled="!isFormValid">
        Submit
      </button>
    </div>
  `
});
```
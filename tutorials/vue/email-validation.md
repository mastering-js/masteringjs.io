To check if an email is syntactically correct, you can use a regular expression and check it against the entered string.

```javascript
  const { createApp } = Vue;
  createApp({
    data() {
      return {
        email: '',
        message: ''
      }
    },
    methods: {
      async verifyEmail() {
       if (this.email.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi)) {
        this.message = 'Valid email';
       }
       else {
        this.message = 'not a valid email';
       }
      }
    },
    template: `
    <div>
      <div>
        <input v-model="email" />
      </div>
      <div>
        <button @click="verifyEmail()">Click To Verify</button>
      </div>
      <div>
        {{message}}
      </div>
    </div>
    `
  }).mount('#example')
```

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<div id="example"></div>
<script>
  const { createApp } = Vue;
  createApp({
    data() {
      return {
        email: '',
        message: ''
      }
    },
    methods: {
      async verifyEmail() {
       if (this.email.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi)) {
        this.message = 'Valid email';
       }
       else {
        this.message = 'not a valid email';
       }
      }
    },
    template: `
    <div>
      <div>
        <input v-model="email" />
      </div>
      <div>
        <button @click="verifyEmail()">Click To Verify</button>
      </div>
      <div>
        {{message}}
      </div>
    </div>
    `
  }).mount('#example')
</script>

## Using Mailgun

To check if an email actually exists, you can use the [mailgun api](https://documentation.mailgun.com/en/latest/api-email-validation.html#single-verification).
However, know that if you do not have a paid account it will return an error stating you are not authorized to access this part of the api.
If the email does not exist, the return object will have a `reason` array and contain an entry.
If the email exists, the `reason` array will be empty.

```javascript
const { createApp } = Vue;
  createApp({
    data() {
      return {
        email: '',
        message: ''
      }
    },
    methods: {
      async verifyEmail() {
        const verify = await axios("https://api.mailgun.net/v4/address/validate", {method: "POST", params:{ address: this.email }, auth: {
          username: 'api',
          password: '' // your api private key
        }}).then((res) => {return res.data}).catch(err => { return err.response.data.message });
        this.message = verify;
      }
    },
    template: `
    <div>
      <div>
        <input v-model="email" />
      </div>
      <div>
        <button @click="verifyEmail()">Click To Verify</button>
      </div>
      <div>
        {{message}}
      </div>
    </div>
    `
  }).mount('#app')
```

<div id="app"></div>

<script>

  createApp({
    data() {
      return {
        email: '',
        message: ''
      }
    },
    methods: {
      async verifyEmail() {
        const verify = await axios("https://api.mailgun.net/v4/address/validate", {method: "POST", params:{ address: this.email }, auth: {
          username: 'api',
          password: 'f39bb232dbb6c20e1e6fff7e37c0fdce-4dd50799-6ce4cbcb'
        }}).then((res) => {return res.data}).catch(err => { return err.response.data.message });
        this.message = verify;
      }
    },
    template: `
    <div>
      <div>
        <input v-model="email" />
      </div>
      <div>
        <button @click="verifyEmail()">Click To Verify</button>
      </div>
      <div>
        {{message}}
      </div>
    </div>
    `
  }).mount('#app')
</script>

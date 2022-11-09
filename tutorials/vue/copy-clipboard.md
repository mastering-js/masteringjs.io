To copy text from an `input` or `textarea` in Vue, you should write a method to call the element's `select()` and `setSelectionRange()` methods using a [Vue ref](/tutorials/vue/refs).

```javascript
Vue.createApp({
  data: () => ({ message: '' }),
  methods: {
    copyText() {
      const element = this.$refs.message;
      element.select();
      element.setSelectionRange(0, 99999);
      document.execCommand('copy');
    }
  },
  template: `
  <div>
    <div>
      <input id="example" v-model="message" ref="message" />
    </div>
    <button @click="copyText()">Click to Copy</button>
    <div>
      <h3>Paste here</h3>
      <div>
        <textarea></textarea>
      </div>
    </div>
  </div>
  `
}).mount('#app');
```

Below is a live example.

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app" style="padding: 10px; border: 1px solid #ddd"></div>

<script>
Vue.createApp({
  data: () => ({ message: 'test message' }),
  methods: {
    copyText() {
      const element = this.$refs.message;
      element.select();
      element.setSelectionRange(0, 99999);
      document.execCommand('copy');
    }
  },
  template: `
  <div>
    <div>
      <input id="example" v-model="message" ref="message" />
    </div>
    <button @click="copyText()">Click to Copy</button>
    <div>
      <h3>Paste here</h3>
      <div>
        <textarea></textarea>
      </div>
    </div>
  </div>
  `
}).mount('#app');
</script>

## Copying non-input fields

To copy text from an element that isn't a `textarea` or `input`, you should create a fake textarea using the [`document.createElement()` function](/tutorials/fundamentals/create-element).
Once you've created a fake `textarea`, you can set the `textarea` content to the value you want to copy use the previous approach.
Then remove the `textarea` once the text is copied.

```javascript
Vue.createApp({
  data: () => ({ message: '' }),
  methods: {
    copyTextNoInput() {
      const storage = document.createElement('textarea');
      storage.value = this.$refs.message.innerHTML;
      this.$refs.reference.appendChild(storage);
      storage.select();
      storage.setSelectionRange(0, 99999);
      document.execCommand('copy');
      this.$refs.reference.removeChild(storage);
    }
  },
  template: `
  <div>
    <div ref="message">This is text that you wish to copy</div>
    <button @click="copyTextNoInput()">Click to Copy</button>
    <div>
      <h3>Paste here</h3>
      <div>
      <textarea></textarea>
      </div>
    </div>
  </div>
  `
}).mount('#app2');
```

<div id="app2" style="padding: 10px; border: 1px solid #ddd"></div>

<script>
  Vue.createApp({
    data: () => ({ message: '' }),
    methods: {
      copyTextNoInput() {
        const storage = document.createElement('textarea');
        storage.value = this.$refs.message.innerHTML;
        this.$el.appendChild(storage);
        storage.select();
        storage.setSelectionRange(0, 99999);
        document.execCommand('copy');
        this.$el.removeChild(storage);
      }
    },
    template: `
    <div>
      <div ref="message">This is text that you wish to copy</div>
      <button @click="copyTextNoInput()">Click to Copy</button>
      <div>
        <h3>Paste here</h3>
        <div>
        <textarea></textarea>
        </div>
      </div>
    </div>
    `
  }).mount('#app2');
</script>
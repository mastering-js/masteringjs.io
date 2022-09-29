To copy text to the clipboard from an input field in Vue, do the following:


```javascript
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: ''
      }
    },
    methods: {
        copyText() {
            const element = document.querySelector('#example');
            element.select();
            element.setSelectionRange(0, 99999);
            document.execCommand('copy');
        }
    },
    template: `
    <div>
        <div>
            <input id="example" v-model="message" />
        </div>
        <button @click="copyText()">Click Me!</button>
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

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app"></div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: ''
      }
    },
    methods: {
        copyText() {
            const element = document.querySelector('#example');
            element.select();
            element.setSelectionRange(0, 99999);
            document.execCommand('copy');
        }
    },
    template: `
    <div>
        <div>
            <input id="example" v-model="message" />
        </div>
        <button @click="copyText()">Click Me!</button>
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

To copy text from a non-input field, do the following:

```javascript

  createApp({
    data() {
      return {
        message: ''
      }
    },
    methods: {
        copyTextNoInput() {
            const storage = document.createElement('textarea');
            storage.value = document.querySelector('#example1').innerHTML;
            this.$refs.reference.appendChild(storage);
            storage.select();
            storage.setSelectionRange(0, 99999);
            document.execCommand('copy');
            this.$refs.reference.removeChild(storage);
        }
    },
    template: `
    <div>
        <div id="example1">This is text that you wish to copy</div>
        <button @click="copyTextNoInput()">Click Me!</button>
        <div ref="reference">
            <h3>Paste here</h3>
            <div>
            <textarea></textarea>
            </div>
        </div>
    </div>
    `
  }).mount('#app2');
```

<div id="app2"></div>

<script>
  createApp({
    data() {
      return {
        message: ''
      }
    },
    methods: {
        copyTextNoInput() {
            const storage = document.createElement('textarea');
            storage.value = document.querySelector('#example1').innerHTML;
            this.$refs.reference.appendChild(storage);
            storage.select();
            storage.setSelectionRange(0, 99999);
            document.execCommand('copy');
            this.$refs.reference.removeChild(storage);
        }
    },
    template: `
    <div>
        <div id="example1">This is text that you wish to copy</div>
        <button @click="copyTextNoInput()">Click Me!</button>
        <div ref="reference">
            <h3>Paste here</h3>
            <div>
            <textarea></textarea>
            </div>
        </div>
    </div>
    `
  }).mount('#app2');
</script>
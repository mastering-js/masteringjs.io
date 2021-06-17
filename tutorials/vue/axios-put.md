With a few lines of code, you can easily make an [`axios.put()`](/tutorials/axios/put) request with Vue:

```html
<div id = "content"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script>
  const app = new Vue({
    data: () => ({result: null}),
    template: `
    <div>
      <button @click="makeRequest">Make Request</button>
      <div>Result is: {{result}}</div>
    </div>
    `,
    methods: {
      async makeRequest() {
        const res = await axios.put('https://httpbin.org/put', {hello:'world'});
        this.result = res.status;
      }
    }
  });
  app.$mount("#content");
</script>
```

You should use `axios.put()` calls in Vue methods, or in a [watcher](/tutorials/vue/watch). Do **not** [make HTTP requests in computed properties](/tutorials/vue/watch-vs-computed)!

<div id = "content"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script>
  const app = new Vue({
    data: () => ({result: null}),
    template: `
    <div>
    <button @click="makeRequest">Make Request</button>
    <div>Result is: {{result}}</div>
    </div>
    `,
    methods: {
      async makeRequest() {
        const res = await axios.put('https://httpbin.org/put', {hello:'world'});
        this.result = res.status;
      }
    }
  });
  app.$mount("#content");
</script>

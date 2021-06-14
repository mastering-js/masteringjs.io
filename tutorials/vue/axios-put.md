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
      makeRequest() {
        axios.put('https://httpbin.org/put', {hello:'world'}).
          then((res) => { this.result = res.status; });
      }
    }
  });
  app.$mount("#content");
</script>
```

You should use `axios.put()` calls in either the methods property or the [mounted hook](/tutorials/vue/mounted).

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
      makeRequest() {
        axios.put('https://httpbin.org/put', {hello:'world'}).
          then((res) => { this.result = res.status; });
      }
    }
  });
  app.$mount("#content");
</script>

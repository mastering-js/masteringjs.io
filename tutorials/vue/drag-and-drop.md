To be able to drag and drop file upload with vue, you
must utilize the
[html drag and drop api](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API).

```html
<div id="content"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script>
  const app = new Vue({
    data: () => ({ File: null, result: null }),
    template: `
      <div style="border-style:solid" @dragover.prevent @drop.prevent>
        <div @drop="uploadFile">
          <input type="file" @change="uploadFile"/>
        </div>
      </div>
    `,
    methods: {
      uploadFile(e) {
        this.File = e.target.files[0];
      },
    },
  });
  app.$mount("#content");
</script>
```

<div id="content"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script>
  const app = new Vue({
    data: () => ({ File: []}),
    template: `
      <div style="border-style:solid;" @dragover.prevent @drop.prevent>
      <input type="file" multiple @change="uploadFile"/>
        <div @drop="dragFile" style="background-color:green;">
        Or drag the file here
        <div v-if="File.length">
        <li v-for="file in File" :key="file">
        {{file[0]['name']}}
        </li>
        </div>
        </div>
      </div>
    `,
    methods: {
      uploadFile(e) {
        this.File = e.target.files;
      },
      dragFile(e) {
        this.File.push(e.dataTransfer.files);
      }
  }
  });
  app.$mount("#content");
</script>

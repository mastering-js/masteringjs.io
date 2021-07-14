You can use the [HTML drag and drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) to be able to drag and drop files with [Vue](/vue).
To successfully use the drag and drop feature, you must call `preventDefault` on `dragEnter` and `dragOver` because their default behavior does not allow elements to be dropped.
You can also prevent the default behavior for `drop` on the parent so you do not accidentally open the file
in the browser if you miss the drop zone as shown below:

```html
<div id="content"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script>
  const app = new Vue({
    data: () => ({ File: []}),
    template: `
    <div style="border-style:solid;" @dragover.prevent @drop.prevent>
      <input type="file" multiple @change="uploadFile"/>
      <div @drop="dragFile" style="background-color:green;margin-bottom:10px;padding:10px;">
        Or drag the file here
        <div v-if="File.length">
          <ul v-for="file in File" :key="file">
            <li>{{file.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    `,
    methods: {
      uploadFile(e) {
        this.File = e.target.files;
      },
      dragFile(e) {
        this.File = e.dataTransfer.files;
      }
  }
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
        <div @drop="dragFile" style="background-color:green;margin-bottom:10px;padding:10px;">
        Or drag the file here
        <div v-if="File.length">
        <ul v-for="file in File" :key="file">
        <li>{{file.name}}</li>
        </ul>
        </div>
        </div>
      </div>
    `,
    methods: {
      uploadFile(e) {
        this.File = e.target.files;
      },
      dragFile(e) {
        this.File = e.dataTransfer.files;
      }
  }
  });
  app.$mount("#content");
</script>

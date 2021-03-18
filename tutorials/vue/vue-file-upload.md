Using Vue 2 with Axios, you can upload files easily with a few clicks.
Using the `<input>` tag and specifying the type to file, the browser will
allow you to select the file to upload from your computer. To prepare
the file to be sent, we recommend using the `FormData` class
to make the process nice and easy. An example can be seen below:

<div id = "content"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script>
   const app = new Vue({
      data: () => ({Images: null, Result: null}),
      template: `
        <div style = "border-style:solid">
          <input type = "file" @change="uploadFile" ref="file"/>
          <button @click="submitFile">Upload!</button>
          <div>Response Status is: {{Result}}</div>
        </div>
      `,
      methods: {
        uploadFile() {
          this.Images = this.$refs.file.files[0];
        },
        submitFile() {
          const formData = new FormData();
          formData.append('file', this.Images);
          axios.post('https://httpbin.org/post', formData,
          {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
            this.Result = res.status;
          });
        }
      }
    });
    app.$mount("#content");
</script>

```javascript
[require:Vue vue-file-upload]
```

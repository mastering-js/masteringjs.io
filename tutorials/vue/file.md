Using Vue's [`ref` property](/tutorials/vue/refs), you can easily read files
from `<input>`. By specifying input type to `file` and
giving the `<input>` tag a `ref` property, you can pull
the file into your methods and manipulate it as you deem
fit. Here is the code to preview the selected image:

```javascript
const app = new Vue({
  data: () => ({ example: null, image: false, preview: null }),
  template: `
    <div style="border-style:solid">
      <input type="file" ref="file" @change="readFile()" />
      <div v-if="Image">
        <img :src="preview" />
      </div>
    </div>
  `,
  methods: {
    readFile() {
      this.example = this.$refs.file.files[0];
      if (
        this.example.name.includes(".png") ||
        this.example.name.includes(".jpg")
      ) {
        this.image = true;
        this.preview = URL.createObjectURL(this.example);
      } else {
        this.image = false;
      }
    }
  }
});
```

Here is a live demonstration:

<div id="content"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script>
  const app = new Vue({
    data: () => ({ example: null, Image: false, preview: null }),
    template: `
      <div style="border-style:solid">
        <input type="file" ref="file" @change='readFile()'/>
        <div v-if="Image">
        <img :src="preview" />
        </div>
      </div>
    `,
    methods: {
      readFile() {
        this.example = this.$refs.file.files[0];
        if (this.example.name.includes(".png") || this.example.name.includes(".jpg")) {
          this.Image = true;
          this.preview = URL.createObjectURL(this.example);
        } else {
          this.Image = false;
        }
      },
    },
  });
  app.$mount("#content");
</script>

## File Reader

Using [JavaScript's `FileReader` class](https://developer.mozilla.org/en-US/docs/Web/API/FileReader), you can read the
file and display it on the page.

```javascript
const example = new Vue({
  data: () => ({ file: null, content: null }),
  template: `
    <div style="border-style:solid">
      <input type="file" ref="doc" @change="readFile()" />
      <div>{{content}}</div>
    </div>
  `,
  methods: {
    readFile() {
      this.file = this.$refs.doc.files[0];
      const reader = new FileReader();
      if (this.file.name.includes(".txt")) {
        reader.onload = (res) => {
          this.content = res.target.result;
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(this.file);
      } else {
        this.content = "check the console for file output";
        reader.onload = (res) => {
          console.log(res.target.result);
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(this.file);
      }
    }
  }
});
```

Here is a live demonstration that will display the contents
of a `.txt` file and print to the console the output for other
types of files:

<div id="example"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script>
  const example = new Vue({
    data: () => ({ file: null, content: null }),
    template: `
      <div style="border-style:solid">
        <input type="file" ref="doc" @change='readFile()'/>
        <div>{{content}}</div>
      </div>
    `,
    methods: {
      readFile() {
        this.file = this.$refs.doc.files[0];
        const reader = new FileReader();
        if(this.file.name.includes(".txt")) {
            reader.onload = res => {
                this.content = res.target.result;
            }
            reader.onerror = err => console.log(err);
            reader.readAsText(this.file);
        } 
        else {
            this.content = "check the console for file output";
            reader.onload = res => {
            console.log(res.target.result);
            }
            reader.onerror = err => console.log(err);
            reader.readAsText(this.file);
        }
      },
    },
  });
  example.$mount("#example");
</script>

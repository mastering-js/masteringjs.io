Firebase's easy setup allows you to start uploading files, with vue,
to a server in a matter of minutes. You can `npm install firebase` or
download the cdn which firebase lists in the project settings. The `firebase-storage`
cdn is not listed for some reason but you will need it to upload files. If you want to
disable authentication, you will need to change in the storage rules

```s
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

To

```s
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != true;
    }
  }
}
```

Once that's done,
you can modify the code from [this article](/tutorials/vue/file-upload) as follows:

```html
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.3/firebase-storage.js"></script>
<script>
  const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
<div id="content"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script>
  const app = new Vue({
    data: () => ({ File: null, value: null, preview: null, isPic: false }),
    template: `
      <div style="border-style:solid">
        <input type="file" @change="getFile()"/>
        <button @click="submitFile">Upload!</button>
        <div v-if="!isPic">
        {{preview}}
        </div>
        <div v-else>
        <img :src="preview" style="width:75%"/>
        </div>
      </div>
    `,
    methods: {
      getFile() {
        this.File = event.target.files[0];
        this.preview = null;
        this.isPic = false;
        if (
          this.File.name.includes(".png") ||
          this.File.name.includes(".jpg")
        ) {
          this.isPic = true;
        }
      },
      submitFile() {
        const storage = firebase.storage().ref().child(`${this.File.name}`);
        const storageRef = storage.put(this.File);
        this.storage = storage;
        setTimeout(() => {
          storage.getDownloadURL().then((res) => (this.preview = res));
        }, 3000);
      },
    },
  });
  app.$mount("#content");
</script>
```

Here is a live demo that will display the url when the file is uploaded
and display a preview if it is an image:

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.3/firebase-storage.js"></script>
<script>
     const firebaseConfig = {
            apiKey: "AIzaSyAseEryg87hCu1janzc_UbyYnvTFSfr9tg",
            authDomain: "vue-file-upload-3e41e.firebaseapp.com",
            projectId: "vue-file-upload-3e41e",
            storageBucket: "vue-file-upload-3e41e.appspot.com",
            messagingSenderId: "253059500227",
            appId: "1:253059500227:web:3a14f9084cf4dcb283fa76",
            measurementId: "G-V9YYTBQ6BX"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
</script>
<div id = "content"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script>
  const app = new Vue({
    data: () => ({File: null, value: null, preview: null, isPic: false}),
    template: `
      <div style="border-style:solid">
        <input type="file" @change="getFile()"/>
        <button @click="submitFile">Upload!</button>
        <div v-if="!isPic">
        {{preview}}
        </div>
        <div v-else>
        <img :src="preview" style="width:75%"/>
        </div>
      </div>
    `,
    methods: {
      getFile() {
        this.File = event.target.files[0];
        this.preview = null;
        this.isPic = false;
        if(this.File.name.includes(".png") || this.File.name.includes(".jpg") ) {
            this.isPic = true;
        }
        if(this.storage) {
            this.storage.delete();
        }
      },
      submitFile() {
          const storage = firebase.storage().ref().child(`${this.File.name}`);
          const storageRef = storage.put(this.File);
          this.storage = storage;
          setTimeout(() => {
              storage.getDownloadURL().then((res) => this.preview = res);
          }, 3000);
      }
    },
    mounted() {
      const listRef = firebase.storage.ref();
      listRef.listAll().then((listResults) => {
        const entries = listResults.items.map((item) => {
          return item.delete();
        });
        Promise.all(entries);
      });
    }
  });
app.$mount("#content");
</script>

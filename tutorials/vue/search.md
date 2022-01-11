To create a functioning search bar component, do the following:

<style>
.search-container {
  position: relative;
  display: flex;
  height: 80px;
  border-radius: var(--border-radius);
  padding-left: 10px;
  margin-bottom: 20px;
  background-color: white;
}

.search {
  display: inline-flex;
  flex: 1 1 300px;
  cursor: text;
  position: relative;
  border-radius: 24px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left:20px;
  padding-right:20px;
  margin-right: 10px;
  width: 100%;
}

.searchTerm {
  outline: none;
  color: #9DBFAF;
  width: 100%;
  padding: .5rem .5rem .5rem 0;
  flex: 1;
  background-color: var(--text-background-grey)
}

.searchTerm:focus{
  color: var(--medium-purple);
}
</style>
<div id = "content"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script>
  const app = new Vue({
    data: function() {
      return {
        searchQuery: '',
        result: ''
      }
    },
    methods: {
      search: async function() {
        const res = await fetch(`https://httpbin.org/get?keyword=${this.searchQuery}`).then((res) => {return res.json()});
        this.result = Object.values(res.args).find((element) => element.toLowerCase() == this.searchQuery.toLowerCase());
      },
    },
    template: `
    <div>
    <div class="search-container">
      <div class="search">
        <input v-model="searchQuery" v-on:keyup.enter="search" type="text" class="searchTerm" placeholder="What are you looking for?" />
      </div>
    </div>
     {{result}}
    </div>
    `
  });
  app.$mount("#content");
</script>

```css
.search-container {
  position: relative;
  display: flex;
  height: 80px;
  border-radius: var(--border-radius);
  padding-left: 10px;
  margin-bottom: 20px;
  background-color: white;
}

.search {
  display: inline-flex;
  flex: 1 1 300px;
  cursor: text;
  position: relative;
  border-radius: 24px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left:20px;
  padding-right:20px;
  margin-right: 10px;
  width: 100%;
}

.searchTerm {
  outline: none;
  color: #9DBFAF;
  width: 100%;
  padding: .5rem .5rem .5rem 0;
  flex: 1;
  background-color: var(--text-background-grey)
}

.searchTerm:focus{
  color: var(--medium-purple);
}
```

```javascript
Vue.component('search', {
    data: function() {
      return {
        searchQuery: '',
      }
    },
    methods: {
       search: async function() {
        const res = await fetch(`https://httpbin.org/get?keyword=${this.searchQuery}`).then((res) => {return res.json()});
        this.result = Object.values(res.args).find((element) => element.toLowerCase() == this.searchQuery.toLowerCase());
      },
    },
    template: `
    <div>
    <div class="search-container">
      <div class="search">
        <input v-model="searchQuery" v-on:keyup.enter="search" type="text" class="searchTerm" placeholder="What are you looking for?" />
      </div>
    </div>
     {{result}}
    </div>
    `
});
```


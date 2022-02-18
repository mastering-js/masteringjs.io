The `nextTick()` function allows you to execute code after you have changed some data and Vue has updated the virutal DOM, but before Vue renders the changes to the page.
The neat thing is that it does this before the browser has rendered the changes on the page.
`setTimeout()` is an alternative to `nextTick()`.
However, the flaw was that the browser would render first and therefore any data that was to be changed because of `setTimeout()` would show and then the browser would show the changed data.
Open the console to see this simple demonstration in action:


```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<div id="content"></div>
```

```javascript
const app = new Vue({
  template: `<h1 ref="message">Hello</h1>`,
  mounted: async function() {
   this.$refs.message = 'Me First!';
   this.$nextTick(() => {
       this.$refs.message = 'No, I am first.';
   });
  }
})
app.$mount('#content');
```

<div id="content"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script>
  const app = new Vue({
  data: function() {
      return {
          text: 'Hello'
      }
  },
  template: `<h1 ref="message">{{text}}</h1>`,
  mounted: async function() {
   console.log('outside nextTick', this.$refs.message.innerText)
   this.text = 'Me First!';
   this.$nextTick(() => {
       console.log('Inside nextTick', this.$refs.message.innerText);
       this.text = 'No, I am first.';
   });
  }
});
  app.$mount("#content");
</script>
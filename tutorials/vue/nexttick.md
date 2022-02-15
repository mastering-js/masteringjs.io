The `nextTick()` function allows you to execute code after you have changed some data, and the virtual DOM has been updated by VueJS because of these data changes.
The neat thing is that it does this before the browser has rendered the changes on the page.
An approach before `nextTick()` was to use `setTimeout()`.
However, the flaw was that the browser would render first and therefore any data that was to be changed because of `setTimeout()` would show and then the browser would show the changed data.
A simple demonstration:


```html
<div id="content"></div>
```

```javascript
new Vue({
  template: `<h1>Hello, {{messsage}}</h1>`,
  data: function() {
      return {
          message: ''
      }
  },
  mounted: async function() {
   this.message = 'Me First!';
   this.$nextTick(() => {
       this.message = 'No, I am first.';
   });
  }
}).$mount('#content');
```
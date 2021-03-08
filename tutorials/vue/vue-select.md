In HTML, the `<select>` tag lets you create a dropdown that
lets the user select one of several options. The easiest way
to tie Vue state to the value of a `<select>` tag is using
`v-model`. Below is an example:

<script src="https://unpkg.com/vue@next"></script>
<div style = "outline-style: solid" id="example">
  <select v-model="selected">
    <option disabled value="">Please Select</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span style="padding-left:5%">Your Choice is: {{selected}}</span>
</div>
<script>
Vue.createApp({
  data() {
    return {
      selected: ''
    };
  }
}).mount('#example');
</script>
</script>

```html
<script src="https://unpkg.com/vue@next"></script>
<div style = "outline-style: solid" id="example">
  <select v-model="selected">
    <option disabled value="">Please Select</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span style="padding-left:5%">Your Choice is: {{selected}}</span>
</div>
<script>
Vue.createApp({
  data() {
    return {
      selected: ''
    };
  }
}).mount('#example');
</script>
```

**Note:** On iOS, if the initial value of your `v-model` does not match any of the
options, it will cause the `<select>` tag to be rendered in a "unselected" state. This will
cause the user to not be able to select the first item as any browser running on iOS will not
fire a change event in this case. Therefore, we recommend using a disabled option with an empty
value as the first element to avoid this problem.

# Getting `v-for` Involved
With `v-for`, you can display every value in an array.
Below is an example:

<div style = "outline-style: solid" id="demo">
<select v-model="selected">
<option disabled value="">Please Select</option>
<option v-for="option in options" :value="option">{{option}}</option>
</select>
<span style="padding-left:5%">Your Choice is: {{selected}}</span>
</div>
<script>
Vue.createApp({
  data() {
    return {
      selected: '',
      options: [
        'A',
        'B',
        'C'
      ]
    };
  }
}).mount('#demo');
</script>

```html
<script src="https://unpkg.com/vue@next"></script>
<div style = "outline-style: solid" id="demo">
<select v-model="selected">
<option disabled value="">Please Select</option>
<option v-for="option in options" :value="option">{{option}}</option>
</select>
<span style="padding-left:5%">Your Choice is: {{selected}}</span>
</div>
<script>
Vue.createApp({
  data() {
    return {
      selected: '',
      options: [
        'A',
        'B',
        'C'
      ]
    };
  }
}).mount('#demo');
</script>
```

In HTML, the `<select>` tag lets you create a dropdown that
lets the user select one of several options. The easiest way
to tie Vue state to the value of a `<select>` tag is using
`v-model`. Below is an example:

<script src="https://unpkg.com/vue@next"></script>
<div style = "outline-style: solid" id="example">
<select v-model="selected">

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

**Note:** You should use a disable option with your `<select>` tags, otherwise
it will put the `<select>` element in an unselected state preventing the user
from selecting the first option.
iOS does not fire a change event in this case which is why it is recommended.

# Getting `v-for` Involved
With `v-for`, you can have vue print all the options available to the user
and all you need to provide is the information in the data object:

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
If you want to avoid having to use `v-model` with your `<select>` tags,
you can use Vue's `v-on:change` directive, or just the shorthand `@change`. This functions
similarly to the `v-model` directive. In every option tag, you must use the `value`
property to store the value that the option contains. From there, `@change` can
handle the rest as shown below:

<div id = "content"></div>
<script src="https://unpkg.com/vue@next"></script>
<script>
Vue.createApp({
    data() {
        return {
            selected: ''
        };
    },
    methods: {
        switchSelect(event) {
            this.selected = event.target.value;
        }
    },
    template: `
    <div>
        <p>Your choice is: {{selected}}</p>
        <select @change="switchSelect($event)">
        <option value = "">Choose</option>
        <option value = "A">A</option>
        <option value = "B">B</option>
        <option value = "C">C</option>
        </select>
    </div>
    `
}).mount('#content');
</script>

Here is the code if you want to mess around with it to practice:

```html
<div id = "content"></div>
<script src="https://unpkg.com/vue@next"></script>
<script>
Vue.createApp({
    data() {
        return {
            selected: ''
        };
    },
    methods: {
        switchSelect(event) {
            this.selected = event.target.value;
        }
    },
    template: `
    <div>
        <p>Your choice is: {{selected}}</p>
        <select @change="switchSelect($event)">
        <option value = "">Choose</option>
        <option value = "A">A</option>
        <option value = "B">B</option>
        <option value = "C">C</option>
        </select>
    </div>
    `
}).mount('#content');
</script>
```

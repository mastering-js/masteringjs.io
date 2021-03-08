Vue makes it very easy to use tables in your projects because of its list rendering functionality.
With a few lines of HTML and a `v-for` loop, you can create a table with one row for every element in an array.
For vue to print each row of the table, you must put the `v-for` in the `<tr>` tag of the table. From there,
you add the data elements from the array you will be looping over in each `<td>` tag as shown below:

<script src="https://unpkg.com/vue@next"></script>
<div id="example">
<table class="table">
    <thead>
        <tr>
            <th scope="col">Country</th>
            <th scope="col">Value</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="name in info" :key="name.Country">
            <td>{{name.Country}}</td>
            <td>{{name.Value}}</td>
        </tr>
    </tbody>
</table>
</div>
<script>
Vue.createApp({
    data(){
        return {
            info: [
                {Country: "United States", Value: "12394"},
                {Country: "Russia",Value: "6148"},
                {Country: "Germany (FRG)",Value: "1653"},
                {Country: "France",Value: "2162"},
                {Country: "United Kingdom",Value: "1214"},
                {Country: "China",Value: "1131"},
                {Country: "Spain",Value: "814"},
                {Country: "Netherlands",Value: "1167"},
                {Country: "Italy",Value: "660"},
                {Country: "Israel",Value: "1263"}
            ]
        }
    }
}).mount('#example');
</script>

```html
<script src="https://unpkg.com/vue@next"></script>
<div id="example">
<table class="table">
    <thead>
        <tr>
            <th scope="col">Country</th>
            <th scope="col">Value</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="name in info" :key="name.Country">
            <td>{{name.Country}}</td>
            <td>{{name.Value}}</td>
        </tr>
    </tbody>
</table>
</div>
<script>
Vue.createApp({
    data(){
        return {
            info: [
                {Country: "United States", Value: "12394"},
                {Country: "Russia",Value: "6148"},
                {Country: "Germany (FRG)",Value: "1653"},
                {Country: "France",Value: "2162"},
                {Country: "United Kingdom",Value: "1214"},
                {Country: "China",Value: "1131"},
                {Country: "Spain",Value: "814"},
                {Country: "Netherlands",Value: "1167"},
                {Country: "Italy",Value: "660"},
                {Country: "Israel",Value: "1263"}
            ]
        }
    }
}).mount('#example');
</script>
```

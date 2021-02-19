[D3.js](https://d3js.org/) is a great library for visualizing data and displaying it in your projects.
This library gives you the building blocks to make cool charts in projects.

Here is an example of using `D3.js` in Vue2 to create a bar graph.
Below is the code:

```html
<script src="https://d3js.org/d3.v6.js"></script>
<script src="https://unpkg.com/vue"></script>
<div class = "app">
  <bargraph></bargraph>
</div>
<script type = "text/javascript">
const info = [
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
];

Vue.component('bargraph', {
  mounted() {
    this.retrieveGraph();
  },
  methods: {
    retrieveGraph: function() {
      let margin = ({top: 30, right: 30, bottom: 70, left: 60});
      let width = 460 - margin.left - margin.right;
      let height = 400 - margin.top - margin.bottom;
      const svg = d3.select(this.$refs.example).
        append("svg").
        attr("width", width + margin.left + margin.right).
        attr("height", height + margin.top + margin.bottom).
        append("g").
        attr("transform", `translate( ${margin.left} , ${margin.top} )`);
      // Add X axis
      const x = d3.scaleBand().
        range([ 0, width ]).
        domain(info.map(function(d) { return d.Country; })).
        padding(0.2);
      svg.append("g").
        attr("transform", "translate(0," + height + ")").
        call(d3.axisBottom(x)).
        selectAll("text").
        attr("transform", "translate(-10,0)rotate(-45)").
        style("text-anchor", "end");
      // Add Y axis
      const y = d3.scaleLinear().
        domain([0, 13000]).
        range([ height, 0]);
      svg.append("g").call(d3.axisLeft(y));
      // Bars
      svg.selectAll("mybar").
        data(info).
        enter().
        append("rect").
        attr("x", function(d) { return x(d.Country); }).
        attr("y", function(d) { return y(d.Value); }).
        attr("width", x.bandwidth()).
        attr("height", function(d) { return height - y(d.Value); }).
        attr("fill", "#69b3a2");
    }
  },
  template: '<div ref="example"></div>'
});
const vm = new Vue({
  el: '.app'
});
```

Note that the template uses [Vue refs](/tutorials/vue/refs) rather than referencing the element by id. Here's a live example of the above code.

<script src="https://d3js.org/d3.v6.js"></script>
<script src="https://unpkg.com/vue"></script>
<div class = "app">
<bargraph></bargraph>
</div>
<script type = "text/javascript">
let info = [{Country: "United States", Value: "12394"},
            {Country: "Russia",Value: "6148"},
            {Country: "Germany (FRG)",Value: "1653"},
            {Country: "France",Value: "2162"},
            {Country: "United Kingdom",Value: "1214"},
            {Country: "China",Value: "1131"},
            {Country: "Spain",Value: "814"},
            {Country: "Netherlands",Value: "1167"},
            {Country: "Italy",Value: "660"},
            {Country: "Israel",Value: "1263"}];
Vue.component('bargraph', {
    mounted() {
        this.retrieveGraph();
    },
    methods: {
        retrieveGraph: function() {
            let margin = ({top: 30, right: 30, bottom: 70, left: 60});
            let width = 460 - margin.left - margin.right;
            let height = 400 - margin.top - margin.bottom;
            var svg = d3.select(this.$refs.example)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
            // Add X axis
            var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(info.map(function(d) { return d.Country; }))
            .padding(0.2);
            svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");
            // Add Y axis
            var y = d3.scaleLinear()
            .domain([0, 13000])
            .range([ height, 0]);
            svg.append("g")
            .call(d3.axisLeft(y));
            // Bars
            svg.selectAll("mybar")
            .data(info)
            .enter()
            .append("rect")
                .attr("x", function(d) { return x(d.Country); })
                .attr("y", function(d) { return y(d.Value); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(d.Value); })
                .attr("fill", "#69b3a2");
        }
    },
    template: `<div ref = "example"></div>`
});
var vm = new Vue({
  el: '.app'
});
</script>

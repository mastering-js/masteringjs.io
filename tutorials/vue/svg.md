[SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) is a vector graphic format. SVGs have two neat features that
make them great for web apps:

1. Because SVGs are vector-based, you can scale an SVG to any size without losing quality and without changing the file size. Your SVG will look just as good at 1000x1000 as it would at 100x100, with the same file size.
2. `.svg` files are text files that look a lot like HTML. And you can embed SVGs directly in your HTML, no need for `img` tags.

For example, below is an SVG version of the yin and yang symbol from [Wikimedia commons](https://commons.wikimedia.org/wiki/File:Yin_yang.svg).

```html
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-40 -40 80 80">
  <circle r="39"/>
  <path d="M0,38a38,38 0 0 1 0,-76a19,19 0 0 1 0,38a19,19 0 0 0 0,38" fill="#fff"/>
  <circle cy="19" r="5" fill="#fff"/>
  <circle cy="-19" r="5"/>
</svg>
```

Here's what it looks like in the browser:

<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-40 -40 80 80">
  <circle r="39"/>
  <path d="M0,38a38,38 0 0 1 0,-76a19,19 0 0 1 0,38a19,19 0 0 0 0,38" fill="#fff"/>
  <circle cy="19" r="5" fill="#fff"/>
  <circle cy="-19" r="5"/>
</svg>

Controlling an SVG From Vue
---------------------------

Because `svg` is a valid HTML tag, you can control SVG images using Vue. For example, the below script has checkboxes
that let you get rid of the yin (black) or yang (white) side of the symbol:

```javascript
const app = new Vue({
  data: () => ({
    yin: true,
    yang: true
  }),
  template: `
    <div>
      <div>
        <div>
          <input type="checkbox" v-model="yin"> Yin
        </div>
        <div>
          <input type="checkbox" v-model="yang"> Yang
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-40 -40 80 80">
        <circle r="39" v-if="yin"/>
        <circle r="39" v-if="yang && !yin" fill="#fff" />
        <path d="M0,38a38,38 0 0 1 0,-76a19,19 0 0 1 0,38a19,19 0 0 0 0,38" fill="#fff" v-if="yang" />
        <circle v-if="yang" cy="19" r="5" fill="#fff"/>
        <circle v-if="yin" cy="-19" r="5"/>
      </svg>
    </div>
  `
}).$mount('#content');
```

Below is a live example of the above Vue instance:

<div style="background-color: #ddd; padding: 1em">
  <div id="yinyang"></div>
</div>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script>
const app = new Vue({
  data: () => ({
    yin: true,
    yang: true
  }),
  template: `
    <div>
      <div>
        <div>
          <input type="checkbox" v-model="yin"> Yin
        </div>
        <div>
          <input type="checkbox" v-model="yang"> Yang
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-40 -40 80 80">
        <circle r="39" v-if="yin"/>
        <circle r="39" v-if="yang && !yin" fill="#fff" />
        <path d="M0,38a38,38 0 0 1 0,-76a19,19 0 0 1 0,38a19,19 0 0 0 0,38" fill="#fff" v-if="yang" />
        <circle v-if="yang" cy="19" r="5" fill="#fff"/>
        <circle v-if="yin" cy="-19" r="5"/>
      </svg>
    </div>
  `
}).$mount('#yinyang');
</script>

Bar Charts
----

One neat application of SVGs is lightweight graphs and charts. For many applications, building your own charts from
raw SVGs is a bit too complex, but you may see hand-built SVG visualizations in certain specialized use cases.

For example, below is how you can use Vue to draw a basic line chart representing the closing price of Apple stock
from August 17 2020 to August 21 2020.

```javascript
const app = new Vue({
  data: () => ({
    points: [
      { date: '2020-08-17', price: 114.61 },
      { date: '2020-08-19', price: 115.56 },
      { date: '2020-08-20', price: 115.71 },
      { date: '2020-08-21', price: 118.28 },
      { date: '2020-08-22', price: 124.37 },
    ]
  }),
  computed: {
    pointsAsPolyline: function() {
      return this.points.map((p, i) => `${i * 20} ${p.price}`).join(' ');
    }
  },
  template: `
  <div>
    <svg viewBox="0 0 500 100">
      <polyline
        fill="none"
        stroke="#0074d9"
        stroke-width="3"
        v-bind:points="pointsAsPolyline"/>
    </svg>
  </div>
  `
});
```

<div style="background-color: #ddd; padding: 1em">
  <div id="chart"></div>
</div>
<script>
new Vue({
  data: () => ({
    points: [
      { date: '2020-08-17', price: 114.61 },
      { date: '2020-08-19', price: 115.56 },
      { date: '2020-08-20', price: 115.71 },
      { date: '2020-08-21', price: 118.28 },
      { date: '2020-08-22', price: 124.37 },
    ]
  }),
  computed: {
    pointsAsPolyline: function() {
      return this.points.map((p, i) => `${i * 40},${(130 - p.price) * 3}`).join(' ');
    }
  },
  template: `
  <div>
    <svg viewBox="0 0 160 50" style="width: 320px; height: 100px; border-left: 1px dashed #232323; border-bottom: 1px dashed #232323">
      <polyline
        fill="none"
        stroke="#0074d9"
        stroke-width="3"
        v-bind:points="pointsAsPolyline"/>
    </svg>
  </div>
  `
}).$mount('#chart');
</script>
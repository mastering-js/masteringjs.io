To fix the "elements in iteration expect to have 'v-bind:key' error" in Vue, you need to set a unique `v-bind:key`, or `:key` for short, on the `v-for` element.

```javascript
<div v-for="item in items" v-bind:key="item.id">
  <li>{{item}}</li>
</div>
```

## Using the Array Index as the Key
You can also use the array index as the key if you are only appending to the end of the list, however, anything else can create issues as the individual items may not be tracked properly.

```javascript
<div v-for="(item, index) in items" v-bind:key="index">
  <li>{{item}}</li>
</div>
```

In the example below, the second list is incorrect as the internal and prop values do not match.

```javascript
<div id="content"></div>
<script src="https://unpkg.com/vue@2"></script>
<script>
    Vue.component("item", {
    props: ["value"],
    data() {
        return {
        internalValue: this.value
        }
    },
    template: `<li>Internal: {{internalValue}} Prop: {{value}}</li>`
    });
  const app = new Vue({
    data: () => ({ items: [1,2,3,4,5] }),
    template: `
      <div>
        <ul>
            <item v-for="i in items" :value="i" :key="i"></item>
        </ul>
        <button @click="addValue">Add value to middle</button>
        <ul>
            <item v-for="(i, index) in items" :value="i" :key="index"></item>
        </ul>
      </div>
    `,
    methods: {
        addValue() {
            this.items.splice(this.items.length / 2, 0, this.items.length + 1)
        }
    }
  });
  app.$mount("#content");
</script>
```

<div id="content"></div>
<script src="https://unpkg.com/vue@2"></script>
<script>
    Vue.component("item", {
    props: ["value"],
    data() {
        return {
        internalValue: this.value
        }
    },
    template: `<li>Internal: {{internalValue}} Prop: {{value}}</li>`
    });
  const app = new Vue({
    data: () => ({ items: [1,2,3,4,5] }),
    template: `
      <div>
        <ul>
            <item v-for="i in items" :value="i" :key="i"></item>
        </ul>
        <button @click="addValue">Add value to middle</button>
        <ul>
            <item v-for="(i, index) in items" :value="i" :key="index"></item>
        </ul>
      </div>
    `,
    methods: {
        addValue() {
            this.items.splice(this.items.length / 2, 0, this.items.length + 1)
        }
    }
  });
  app.$mount("#content");
</script>
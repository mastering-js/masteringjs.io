// loads Jobs

Vue.createApp({
    data () {
        return {
            name: null,
            position: null,
            tag: null,
            sticky: false
        }
    },
    methods: {
        postJob() {
            console.log('submitted');
            console.log(this.name);
            console.log(this.position);
            console.log(this.tag);
            console.log(this.sticky);
            // window.location.reload();
        }
    },
    template: `
    <div>
    <div>Hello There</div>
    <form action = "" @submit.prevent="postJob()">
    <div>
    <label style = "display:block;">Company Name</label>
    <input style = "display:block;" type="text" v-model="name"/>
    </div>
    <div>
    <label style = "display:block;">Position</label>
    <input style = "display:block;" type="text" v-model="position" />
    </div>
    <div>
    <label style = "display:block;">Tag</label>
    <select v-model="tag">
    <option disabled value="">Please Select</option>
    </select>
    </div>
    <div>
    <label style = "display:block;">Customize Your Post</label>
    <input type="checkbox" checked disabled/> $30 to post
    </div>
    <div>
    <input type="checkbox" v-model="sticky"/> $30 to sticky post on frontpage for a month.
    </div>
    <input type="submit"/>
    </form>
    </div>
    `,
}).mount('#content');
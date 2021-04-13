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
    template: `
    <div>Hello There</div>
    <form>
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
    <input active type="checkbox" /> $30 to post
    </div>
    <div>
    <input type="checkbox" v-model="sticky"/> $30 to sticky post on frontpage for a month.
    </div>
    </div>
    </form>
    `,
}).mount('#content');
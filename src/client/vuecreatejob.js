// loads Jobs

Vue.createApp({
    data () {
        return {
            jobs: null
        }
    },
    template: `
    <div>Hello There</div>
    <form>
    <label>Company Name</label>
    <input type="text" />
    <label>Position</label>
    <input type="text" />
    </form>
    `,
}).mount('#content');
Vue.createApp({
    data () {
        return {
            jobs: null
        }
    },
    methods: {
        signIn() {

        }
    },
    template: `
    <div>Hello There</div>
    <form>
    <label>Email</label>
    <input type="text" />
    <label>Password</label>
    <input type="text" />
    </form>
    <a href = "/jobs/signup">Don't have an account? Then sign up today!</a>
    <a href = "/jobs"> Or go back and look at jobs</a>
    `,
}).mount('#content');
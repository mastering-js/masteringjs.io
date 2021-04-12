Vue.createApp({
    data () {
        return {
            jobs: null
        }
    },
    methods: {
        signUp() {

        }
    },
    template: `
    <div>Hello There</div>
    <form>
    <label>Email</label>
    <input type="text" />
    <label>Password</label>
    <input type="text" />
    <label>Confirm Password</label>
    <input type="text" />
    </form>
    <a href = "/jobs/signin"> Sign in if you already have an account!</a>
    <a href = "/jobs"> Or go back and look at jobs</a>
    `
}).mount('#content');
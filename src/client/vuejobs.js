// loads Jobs
Vue.createApp({
    data () {
        return {
            jobs: null
        }
    },
    template: `
    <div>Hello There</div>
    <a href = "/jobs/signup">Sign up Today!</a>
    <a href = "/jobs/signin"> Or sign in if you already have an account</a>
    `,
    created() {
        //fetch request goes here
    }
}).mount('#content');
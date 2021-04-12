Vue.createApp({
    data () {
        return {
            jobs: null
        }
    },
    template: `
    <div>Hello There</div>
    <a href = "/jobs/signup">Sign up Today!</a>
    <a href = "/jobs"> Or go back and look at jobs</a>
    `,
    created() {
        //fetch request goes here
    }
}).mount('#content');
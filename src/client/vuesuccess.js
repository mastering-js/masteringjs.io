const server = 'https://masteringjs-job-board.azurewebsites.net';

// loads Jobs
const app = new Vue({
  template: `
    <div>
        <h1>Thanks for Posting a Job!</h1>
        <h2> Give the server a few minutes to post your job on the board</h2>
    </div>
  `,
});
app.$mount('#content');
'use strict';

module.exports = () => `
  <link rel="stylesheet" href="/assets/request-invite.css" />
  <div class="request-invite">
    <h1><i>Mastering Mongoose</i> Sample Apps</h1>
    <div class="description">
      Enter your GitHub username to get access.
    </div>
    <form id="github-username">
      <label for="username">GitHub Username</label>
      <input type="text" id="username">
      <div>
        <button class="button" type="submit">Request Invite</button>
      </div>
      <div id="result">
      </div>
    </form>
  </div>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script type="application/javascript">
    document.querySelector('#github-username').addEventListener('submit', function(ev) {
      ev.preventDefault();
      var username = document.querySelector('#username').value;
      document.querySelector('#github-username button').disabled = true;
      axios.post('https://meanit-aristotle.app.mongoosecloud.io/api/sendMongooseInvite', { username: username }).
        then(function(res) {
          document.querySelector('#result').innerHTML = 'Invitation sent. Check your GitHub email address.';
        }).
        catch(function(err) {
          var message = err.response.data && err.response.data.message ? err.response.data.message : err.message;
          document.querySelector('#result').innerHTML = 'Error occurred: ' + message;
          document.querySelector('#github-username button').disabled = false;
        });
    });
  </script>
`;
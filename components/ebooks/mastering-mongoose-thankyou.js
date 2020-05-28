'use strict';

module.exports = () => `
  <link rel="stylesheet" href="/assets/request-invite.css" />
  <div class="request-invite">
    <h1>Thanks for Buying <i>Mastering Mongoose</i>!</h1>
    <div class="description">
      We've emailed a copy of <i>Mastering Mongoose</i> to your PayPal email.
    </div>
    <div class="description">
      You can also download a copy from this page as a <a href="https://masteringmongoose.com/mastering-mongoose-9f1f5affc1375620.pdf">PDF</a>
      or <a href="https://masteringmongoose.com/mastering-mongoose-9f1f5affc1375620.epub">ePub</a>,
      or view the <a href="https://masteringmongoose.com/9f1f5affc1375620">online version</a>.
    </div>
    <div class="description">
      You can also request an invite to the sample apps GitHub
      repo <a href="/request-invite">here</a>.
    </div>
    <div>
      <img src="https://mastering-mongoose.netlify.app/images/mastering-mongoose.jpg" style="width: 50%">
    </div>
  </div>
`;
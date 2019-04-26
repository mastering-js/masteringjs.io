'use strict';

const list = require('./list');
const nav = require('./nav');

module.exports = ({ posts }) => `
<html>
  <head>
    <title>Mastering JavaScript</title>

    <link rel="stylesheet" href="/assets/style.css" />
    <link rel="stylesheet" href="/assets/home.css" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Inconsolata:400,700" rel="stylesheet">
  </head>

  <body>
    ${nav()}
    <div class="home">
      <div class="hero">
        <div class="copy">
          <div class="intro">
            Full Stack JavaScript, Explained.
          </div>
          <div class="cta">
            Join our mailing list and get new tutorials delivered
            to your inbox every week.
          </div>
          <div class="button" >
            <a href="https://www.getrevue.co/profile/masteringjs">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <h1>Latest Tutorials</h1>
      ${list({ posts })}
    </div>
  </body>
</html>
`;